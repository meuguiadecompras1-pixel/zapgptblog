import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
          <Button asChild>
            <Link to="/">Voltar para Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const otherPosts = posts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Home
          </Link>
        </Button>

        <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground">
          {post.category}
        </Badge>

        <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>ZapGpt.Blog</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl mb-8 aspect-video">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-invert max-w-none mb-12">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="font-serif font-bold text-3xl md:text-4xl mb-6 mt-8 text-foreground">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-serif font-bold text-2xl md:text-3xl mb-4 mt-8 text-foreground">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-serif font-semibold text-xl md:text-2xl mb-3 mt-6 text-foreground">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-foreground/90">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground/90">{children}</ol>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-primary">{children}</strong>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="border-t border-border pt-8">
          <h3 className="font-serif font-bold text-2xl mb-6">Leia também</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPosts.map((otherPost) => (
              <Link 
                key={otherPost.slug}
                to={`/post/${otherPost.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl aspect-video mb-3">
                  <img 
                    src={otherPost.image} 
                    alt={otherPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {otherPost.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default Post;
