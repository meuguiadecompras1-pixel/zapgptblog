import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary hover:text-primary/90 transition-colors">
              ZapGpt.Blog
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Robô de Atendimento para WhatsApp
            </p>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Início</Link>
            </Button>
            <Button variant="ghost" size="sm">Automação</Button>
            <Button variant="ghost" size="sm">Delivery</Button>
            <Button variant="ghost" size="sm">Marketing</Button>
            <Button variant="ghost" size="sm">Tecnologia</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
