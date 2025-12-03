import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
}

interface PostFormProps {
  editingPost?: Post | null;
  onCancelEdit?: () => void;
  onPostSaved?: () => void;
}

const PostForm = ({ editingPost, onCancelEdit, onPostSaved }: PostFormProps) => {
  const [title, setTitle] = useState(editingPost?.title || "");
  const [excerpt, setExcerpt] = useState(editingPost?.excerpt || "");
  const [content, setContent] = useState(editingPost?.content || "");
  const [category, setCategory] = useState(editingPost?.category || "");
  const [image, setImage] = useState(editingPost?.image || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem válida.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      setImage(publicUrl);
      toast({
        title: "Imagem enviada com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      if (editingPost) {
        const { error } = await supabase
          .from("posts_public")
          .update({
            title,
            slug,
            excerpt,
            content,
            category,
            image,
          })
          .eq("id", editingPost.id);

        if (error) throw error;

        toast({
          title: "Post atualizado com sucesso!",
        });
      } else {
        const { error } = await supabase.from("posts_public").insert({
          title,
          slug,
          excerpt,
          content,
          category,
          image,
          date: new Date().toISOString(),
        });

        if (error) throw error;

        toast({
          title: "Post criado com sucesso!",
          description: "O post foi publicado.",
        });
      }

      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory("");
      setImage("");
      onPostSaved?.();
      onCancelEdit?.();
    } catch (error: any) {
      toast({
        title: editingPost ? "Erro ao atualizar post" : "Erro ao criar post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingPost ? "Editar Post" : "Criar Novo Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="Ex: Automação, Delivery, Marketing"
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem</Label>
            <div className="flex flex-col gap-3">
              {image && (
                <div className="relative w-full max-w-xs">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md border border-border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => setImage("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Enviando..." : "Upload de Imagem"}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">ou</span>
                <Input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Cole a URL da imagem..."
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading
                ? editingPost
                  ? "Salvando..."
                  : "Criando..."
                : editingPost
                ? "Salvar Alterações"
                : "Criar Post"}
            </Button>
            {editingPost && (
              <Button type="button" variant="outline" onClick={onCancelEdit}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
