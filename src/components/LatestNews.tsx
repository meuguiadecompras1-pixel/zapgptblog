import { Badge } from "@/components/ui/badge";

const LatestNews = () => {
  const news = [
    "Nova atualização do WhatsApp Business API disponível",
    "Delivery cresce 45% no Brasil em 2025",
    "Automação reduz custos em até 70% para restaurantes",
    "Marketing digital: tendências para food service"
  ];

  return (
    <div className="bg-secondary border-y border-border py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <Badge variant="default" className="shrink-0 bg-primary text-primary-foreground">
            ÚLTIMAS NOTÍCIAS
          </Badge>
          <div className="overflow-hidden">
            <div className="flex gap-8 animate-scroll whitespace-nowrap">
              {[...news, ...news].map((item, index) => (
                <span key={index} className="text-sm text-foreground">
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
