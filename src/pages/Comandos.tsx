import { useState, useMemo } from "react";
import { Search, Shield, Wrench, Gamepad2, Gavel, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberParticles from "@/components/EmberParticles";

interface Command {
  name: string;
  description: string;
  usage: string;
}

interface Category {
  key: string;
  label: string;
  icon: React.ReactNode;
  commands: Command[];
}

const categories: Category[] = [
  {
    key: "admin",
    label: "Administração",
    icon: <Shield className="h-5 w-5" />,
    commands: [
      { name: "/config", description: "Abre o painel de configuração do servidor.", usage: "/config" },
      { name: "/setlang", description: "Define o idioma padrão do servidor.", usage: "/setlang [idioma]" },
      { name: "/setwelcome", description: "Define o canal de boas-vindas.", usage: "/setwelcome #canal" },
      { name: "/autorole", description: "Configura o cargo automático para novos membros.", usage: "/autorole @cargo" },
    ],
  },
  {
    key: "utils",
    label: "Utilitários",
    icon: <Wrench className="h-5 w-5" />,
    commands: [
      { name: "/translate", description: "Traduz uma mensagem para o idioma selecionado.", usage: "/translate [idioma] [texto]" },
      { name: "/serverinfo", description: "Mostra informações detalhadas do servidor.", usage: "/serverinfo" },
      { name: "/userinfo", description: "Exibe informações de um usuário.", usage: "/userinfo @usuário" },
      { name: "/avatar", description: "Mostra o avatar de um usuário em alta resolução.", usage: "/avatar @usuário" },
    ],
  },
  {
    key: "fun",
    label: "Diversão",
    icon: <Gamepad2 className="h-5 w-5" />,
    commands: [
      { name: "/roll", description: "Rola um dado com o número de lados especificado.", usage: "/roll [lados]" },
      { name: "/meme", description: "Envia um meme aleatório no chat.", usage: "/meme" },
      { name: "/8ball", description: "A bola mágica responde sua pergunta.", usage: "/8ball [pergunta]" },
      { name: "/rank", description: "Mostra seu nível e XP no servidor.", usage: "/rank" },
    ],
  },
  {
    key: "mod",
    label: "Moderação",
    icon: <Gavel className="h-5 w-5" />,
    commands: [
      { name: "/ban", description: "Bane um usuário do servidor.", usage: "/ban @usuário [motivo]" },
      { name: "/kick", description: "Expulsa um usuário do servidor.", usage: "/kick @usuário [motivo]" },
      { name: "/mute", description: "Silencia um usuário por tempo determinado.", usage: "/mute @usuário [tempo]" },
      { name: "/warn", description: "Adiciona uma advertência ao usuário.", usage: "/warn @usuário [motivo]" },
      { name: "/clear", description: "Limpa mensagens do canal.", usage: "/clear [quantidade]" },
    ],
  },
];

const Comandos = () => {
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.key, true]))
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        commands: cat.commands.filter(
          (cmd) =>
            cmd.name.toLowerCase().includes(q) ||
            cmd.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.commands.length > 0);
  }, [search]);

  const toggle = (key: string) =>
    setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <EmberParticles />
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-wider mb-4 text-foreground text-center">
            LISTA DE <span className="text-gradient-ember">COMANDOS</span>
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Todos os comandos disponíveis na Ellie Survivor.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comando..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/50"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {filtered.map((cat) => (
              <div key={cat.key} className="card-apocalyptic bg-background/60 backdrop-blur-md border-border/50">
                <button
                  onClick={() => toggle(cat.key)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">{cat.icon}</span>
                    <span className="font-display text-sm font-semibold tracking-wider text-foreground">
                      {cat.label.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({cat.commands.length})
                    </span>
                  </div>
                  {openCategories[cat.key] ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {openCategories[cat.key] && (
                  <div className="px-5 pb-5 grid gap-3 sm:grid-cols-2">
                    {cat.commands.map((cmd) => (
                      <div
                        key={cmd.name}
                        className="rounded-lg border border-border/50 bg-muted/30 p-4 hover:border-primary/30 transition-colors"
                      >
                        <code className="text-primary font-mono text-sm font-semibold">
                          {cmd.name}
                        </code>
                        <p className="text-xs text-muted-foreground mt-1">
                          {cmd.description}
                        </p>
                        <p className="text-xs text-foreground/50 mt-2 font-mono">
                          {cmd.usage}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-12">
                Nenhum comando encontrado para "{search}".
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Comandos;
