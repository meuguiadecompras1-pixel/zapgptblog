import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import LatestNews from "@/components/LatestNews";
import { posts } from "@/data/posts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LatestNews />
      
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-2 text-center">
            Tecnologia, inovação e o mundo dos negócios
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Descubra as últimas tendências em automação, marketing digital e tecnologia 
            para revolucionar seu negócio
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
