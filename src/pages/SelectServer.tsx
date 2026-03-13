import { Link } from "react-router-dom";
import { Bot, LogOut, Server, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmberParticles from "@/components/EmberParticles";

const mockServers = [
  { id: "1", name: "Last Shelter - Estado 999", icon: "🏰", members: 1234, online: 342 },
  { id: "2", name: "FPS Competitivo BR", icon: "🔫", members: 567, online: 89 },
  { id: "3", name: "Survival World", icon: "🌍", members: 890, online: 201 },
  { id: "4", name: "Strategy Alliance", icon: "⚔️", members: 2100, online: 410 },
];

const SelectServer = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <EmberParticles />

      <header className="relative z-20 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <Bot className="h-7 w-7 text-primary" />
            <span className="font-display text-base font-bold tracking-wider text-foreground">
              ELLIE <span className="text-gradient-ember">SURVIVOR</span>
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </Link>
        </div>
      </header>

      <div className="relative z-20 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wide mb-3 text-foreground">
            SELECIONE UM <span className="text-gradient-ember">SERVIDOR</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Escolha o servidor que deseja configurar.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {mockServers.map((s) => (
            <Link
              key={s.id}
              to={`/dashboard?server=${s.id}`}
              className="card-apocalyptic bg-background/60 backdrop-blur-md p-6 flex items-center justify-between group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-muted/60 flex items-center justify-center text-3xl border border-border/40">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">
                    {s.name}
                  </h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Server className="h-3 w-3" /> {s.members} membros
                    </span>
                    <span className="text-xs text-primary">{s.online} online</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="glow-button bg-primary text-primary-foreground font-display text-[10px] tracking-widest px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  CONFIGURAR
                </span>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectServer;
