import { Bot } from "lucide-react";

const Footer = () => (
  <footer className="relative z-20 border-t border-border/50 py-12 bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <span className="font-display text-sm font-bold tracking-wider text-foreground">
          ELLIE SURVIVOR
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ellie Survivor Bot. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
