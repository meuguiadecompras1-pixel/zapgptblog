

# Auditoria de Arquitetura: ZapGpt.Blog

---

## 1. Persistência de Conteúdo

**Tabela:** `posts_public` (com view pública `posts_public_view`)

**Schema inferido das operações no código:**

```text
┌──────────────────────────────────────────────────┐
│ posts_public                                     │
├──────────┬───────────┬───────────────────────────┤
│ Coluna   │ Tipo      │ Notas                     │
├──────────┼───────────┼───────────────────────────┤
│ id       │ uuid (PK) │ Identificador único       │
│ title    │ text      │ Título do post            │
│ slug     │ text      │ URL-friendly, gerado auto │
│ excerpt  │ text      │ Resumo curto              │
│ content  │ text      │ Corpo do post             │
│ category │ text      │ Ex: Automação, Delivery   │
│ image    │ text      │ URL pública da imagem     │
│ date     │ text/ts   │ Data de publicação (ISO)  │
│ api_key  │ text      │ Oculta pela view          │
└──────────┴───────────┴───────────────────────────┘
```

**Formato do conteúdo:** O campo `content` armazena **Markdown puro** (texto plano com sintaxe Markdown). Na renderização, `Post.tsx` usa `<ReactMarkdown>` para converter para HTML no cliente.

**View pública:** `posts_public_view` expõe todas as colunas exceto `api_key`. Todas as queries de leitura (Index, Post, PostList) usam a view; operações de escrita (insert/update/delete) usam a tabela `posts_public` diretamente.

---

## 2. Gestão de Ativos (Mídia)

**Bucket:** `post-images` no Supabase Storage.

**Fluxo de upload** (em `PostForm.tsx`):
1. Usuário seleciona arquivo via `<input type="file">`
2. Validação client-side: `file.type.startsWith("image/")`
3. Upload para `post-images/posts/{timestamp}-{random}.{ext}` via `supabase.storage.from("post-images").upload()`
4. URL pública obtida via `supabase.storage.from("post-images").getPublicUrl()`
5. URL armazenada no campo `image` (text) do registro do post

**Alternativa:** O formulário também aceita URL externa colada manualmente — nesse caso, nenhum upload ocorre, apenas o campo `image` recebe a URL.

**Observação:** Os 3 posts estáticos em `src/data/posts.ts` usam imagens locais importadas (`src/assets/*.jpg`). Esses posts existem apenas como fallback/legado e não são servidos ao usuário final (todas as queries apontam para Supabase).

---

## 3. Fluxo de Escrita (Postagem)

**Não há Server Action nem API Route.** O projeto é 100% client-side (Vite + React SPA). A escrita ocorre diretamente do browser via `supabase-js`.

**Fluxo em `PostForm.tsx → handleSubmit()`:**

```text
1. Gera slug a partir do título (normalize → lowercase → strip diacríticos → kebab-case)
2. Se editingPost existe → supabase.from("posts_public").update({...}).eq("id", id)
3. Se novo post         → supabase.from("posts_public").insert({...})
4. Limpa formulário e dispara callbacks
```

**Validações existentes:**
- Campos `title`, `excerpt`, `content`, `category` são `required` no HTML
- Validação de tipo MIME no upload de imagem (`image/*`)
- Slug gerado automaticamente (sem validação de unicidade no client)
- **Não há** validação server-side além do RLS (api_key para inserts externos, autenticação para admin)

---

## 4. Interface de Automação (Payload para inserção externa)

Para inserir posts via Python, n8n ou qualquer cliente HTTP externo:

**Destino:** Tabela `posts_public` via Supabase REST API

**Endpoint:**
```
POST https://drzzgyefpjgqfqrltpkv.supabase.co/rest/v1/posts_public
```

**Headers obrigatórios:**
```text
apikey: sb_publishable_99rf4swFASyL11GbCSZz0Q_WkGsGjbm
Authorization: Bearer sb_publishable_99rf4swFASyL11GbCSZz0Q_WkGsGjbm
Content-Type: application/json
Prefer: return=minimal
```

**Payload (JSON) — campos obrigatórios:**
```json
{
  "title": "Título do Post",
  "slug": "titulo-do-post",
  "excerpt": "Resumo curto do post...",
  "content": "# Conteúdo em Markdown\n\nTexto completo...",
  "category": "Automação",
  "image": "https://url-da-imagem.com/img.jpg",
  "date": "2026-02-26T00:00:00Z",
  "api_key": "CHAVE_CONFIGURADA_NO_RLS"
}
```

**Notas críticas:**
- O campo `api_key` é exigido pela policy RLS de insert. Sem ele, a inserção será rejeitada com erro 403. O valor deve corresponder ao que foi configurado na policy `INSERT` da tabela.
- O `slug` deve ser **único** — é a chave usada nas URLs (`/post/{slug}`).
- O `content` deve ser **Markdown válido** para renderização correta.
- O `image` pode ser qualquer URL pública acessível (não precisa estar no bucket).
- O `date` deve ser ISO 8601 para ordenação correta.

---

## Resumo de Riscos / Observações

- **Sem validação server-side de slug único** — inserts duplicados podem causar conflito na exibição.
- **api_key no RLS** — se a chave vazar, qualquer pessoa pode inserir posts. Considerar migrar para autenticação via service_role ou edge function.
- **Sem migrations versionadas** — o diretório `supabase/migrations/` está vazio. A estrutura do banco foi criada manualmente.

