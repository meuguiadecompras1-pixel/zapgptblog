import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory("");
      setImage("");
    } catch (error: any) {
      toast({
        title: "Erro ao criar post",
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
        <CardTitle>Criar Novo Post</CardTitle>
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
            <Label htmlFor="image">URL da Imagem</Label>
            <Input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              placeholder="https://..."
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Criando..." : "Criar Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
