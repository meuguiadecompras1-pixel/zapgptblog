import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts_public_view")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar posts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este post?")) return;

    try {
      const { error } = await supabase.from("posts_public").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Post deletado com sucesso!",
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Erro ao deletar post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <p>Carregando posts...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts Publicados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">Nenhum post encontrado.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex items-start justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{post.category}</span>
                    <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostList;
