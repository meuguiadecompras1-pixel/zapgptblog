import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import LatestNews from "@/components/LatestNews";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/post";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("categoria") || "";

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from('posts_public_view')
        .select('*')
        .order('date', { ascending: false });
      
      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Post[];
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LatestNews />
      
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-2 text-center">
            {categoryFilter || "Tecnologia, inovação e o mundo dos negócios"}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            {categoryFilter 
              ? `Artigos sobre ${categoryFilter.toLowerCase()}`
              : "Descubra as últimas tendências em automação, marketing digital e tecnologia para revolucionar seu negócio"
            }
          </p>
        </section>

        <section>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : posts?.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum post encontrado nesta categoria.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
