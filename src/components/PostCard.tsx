import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border">
      <Link to={`/post/${post.slug}`}>
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {post.category}
            </Badge>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </time>
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h2 className="font-serif font-bold text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link to={`/post/${post.slug}`}>
            Ler mais →
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;
