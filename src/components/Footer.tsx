import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif font-bold text-xl text-primary mb-4">ZapGpt.Blog</h3>
            <p className="text-muted-foreground text-sm">
              Tecnologia, inovação e o mundo dos negócios. 
              Seu portal de informações sobre automação e marketing digital.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/?categoria=Automação" className="hover:text-primary transition-colors">Automação</a></li>
              <li><a href="/?categoria=Delivery" className="hover:text-primary transition-colors">Delivery</a></li>
              <li><a href="/?categoria=Marketing%20Digital" className="hover:text-primary transition-colors">Marketing Digital</a></li>
              <li><a href="/?categoria=Tecnologia" className="hover:text-primary transition-colors">Tecnologia</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Receba as últimas novidades direto no seu email
            </p>
            <Button variant="default" className="w-full">
              Assinar Newsletter
            </Button>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ZapGpt.Blog. Todos os direitos reservados.
          </p>
          
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
              <a href="https://www.facebook.com/profile.php?id=61583961360857" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
              <a href="https://www.instagram.com/zapgptshop/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
              <a href="https://www.tiktok.com/@zapgptshop" target="_blank" rel="noopener noreferrer">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
              <a href="https://www.linkedin.com/in/zapgpt-shop-afiliado-85a1ab392" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
              <a href="https://www.threads.com/@zapgptshop" target="_blank" rel="noopener noreferrer">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 3.998a8.189 8.189 0 0 0-8.29 8.181 8.189 8.189 0 0 0 8.29 8.181 8.189 8.189 0 0 0 8.29-8.181 8.189 8.189 0 0 0-8.29-8.181zm0 14.727a6.54 6.54 0 0 1-6.635-6.546 6.54 6.54 0 0 1 6.635-6.546 6.54 6.54 0 0 1 6.636 6.546 6.54 6.54 0 0 1-6.636 6.546z"/>
                  <path d="M16.803 9.018c-.193-1.256-1.146-2.231-2.358-2.473-.903-.18-1.862-.14-2.725.123-.574.175-1.086.488-1.465.906-.38.418-.624.935-.707 1.488-.083.554-.007 1.12.228 1.644.235.523.608.97 1.077 1.285.47.315 1.02.493 1.591.516.571.023 1.142-.105 1.657-.372.515-.267.948-.662 1.256-1.146.307-.484.475-1.04.486-1.61.011-.57-.138-1.132-.425-1.636-.287-.504-.7-.913-1.2-1.186-.5-.273-1.066-.404-1.638-.38-.572.024-1.131.194-1.62.494-.489.3-.884.725-1.146 1.234-.262.509-.383 1.08-.351 1.655.032.575.205 1.13.504 1.608.299.478.721.866 1.224 1.124.503.258 1.067.38 1.633.354.566-.026 1.116-.194 1.594-.489.478-.295.868-.717 1.131-1.224.263-.507.391-1.074.371-1.643-.02-.569-.186-1.123-.482-1.605-.296-.482-.712-.873-1.207-1.135-.495-.262-1.048-.387-1.603-.363-.555.024-1.096.186-1.57.47-.474.284-.865.693-1.134 1.186-.269.493-.408 1.05-.402 1.614.006.564.156 1.114.437 1.598.281.484.682.883 1.163 1.158.481.275 1.021.415 1.566.406.545-.009 1.078-.162 1.544-.445.466-.283.85-.689 1.113-1.178.263-.489.394-1.042.38-1.603-.014-.561-.166-1.107-.441-1.585-.275-.478-.668-.866-1.141-1.126-.473-.26-1.004-.386-1.54-.365-.536.021-1.06.178-1.519.456-.459.278-.838.674-1.098 1.149-.26.475-.393 1.01-.386 1.55.007.54.153 1.07.424 1.537.271.467.656.85 1.117 1.112.461.262.98.396 1.506.389.526-.007 1.038-.152 1.485-.422.447-.27.816-.657 1.07-1.123.254-.466.383-.991.374-1.524-.009-.533-.15-1.05-.408-1.501-.258-.451-.627-.82-1.07-1.071-.443-.251-.943-.375-1.45-.359-.507.016-.998.159-1.424.417-.426.258-.78.627-1.025 1.071-.245.444-.373.948-.372 1.461.001.513.133 1.015.381 1.457.248.442.604.808 1.033 1.063.429.255.915.389 1.412.389z"/>
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
