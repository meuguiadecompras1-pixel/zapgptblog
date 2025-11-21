import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Button variant="ghost" size="sm" asChild onClick={() => setOpen(false)}>
        <Link to="/">Início</Link>
      </Button>
      <Button variant="ghost" size="sm" asChild onClick={() => setOpen(false)}>
        <a href="https://zapgpt.shop" target="_blank" rel="noopener noreferrer">Loja</a>
      </Button>
      <Button variant="ghost" size="sm" asChild onClick={() => setOpen(false)}>
        <Link to="/admin">Admin</Link>
      </Button>
    </>
  );

  return (
    <header className="border-b border-border bg-card/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary hover:text-primary/90 transition-colors">
              ZapGpt.Blog
            </h1>
            <p className="text-xs text-muted-foreground hidden md:block">
              Robô de Atendimento para WhatsApp
            </p>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2">
            <NavLinks />
          </nav>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                <h2 className="font-serif font-bold text-xl text-primary mb-4">Menu</h2>
                <nav className="flex flex-col gap-2">
                  <NavLinks />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
