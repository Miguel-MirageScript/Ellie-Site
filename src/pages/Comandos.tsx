import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberParticles from "@/components/EmberParticles";
import { useLang } from "@/i18n/LanguageContext";

interface Command {
  name: string;
  description: string;
  usage: string;
}

interface Category {
  key: string;
  labelKey: string;
  icon: string;
  commands: Command[];
}

const categories: Category[] = [
  {
    key: "admin",
    labelKey: "commands.cat.admin",
    icon: "mdi:shield-crown",
    commands: [
      { name: "/config", description: "Abre o painel de configuração do abrigo.", usage: "/config" },
      { name: "/setlang", description: "Define o idioma padrão da aliança.", usage: "/setlang [idioma]" },
      { name: "/setwelcome", description: "Define o canal de boas-vindas para novos sobreviventes.", usage: "/setwelcome #canal" },
      { name: "/autorole", description: "Configura o cargo automático para novos recrutas.", usage: "/autorole @cargo" },
    ],
  },
  {
    key: "utils",
    labelKey: "commands.cat.utils",
    icon: "mdi:radar",
    commands: [
      { name: "/translate", description: "Traduz uma mensagem para o idioma selecionado.", usage: "/translate [idioma] [texto]" },
      { name: "/serverinfo", description: "Mostra informações detalhadas do abrigo.", usage: "/serverinfo" },
      { name: "/userinfo", description: "Exibe a ficha tática de um sobrevivente.", usage: "/userinfo @usuário" },
      { name: "/avatar", description: "Mostra o avatar de um sobrevivente em alta resolução.", usage: "/avatar @usuário" },
    ],
  },
  {
    key: "fun",
    labelKey: "commands.cat.fun",
    icon: "mdi:dice-d20",
    commands: [
      { name: "/roll", description: "Rola um dado com o número de lados especificado.", usage: "/roll [lados]" },
      { name: "/meme", description: "Envia um meme aleatório no chat.", usage: "/meme" },
      { name: "/8ball", description: "A bola mágica responde sua pergunta.", usage: "/8ball [pergunta]" },
      { name: "/rank", description: "Mostra seu nível e XP no abrigo.", usage: "/rank" },
    ],
  },
  {
    key: "mod",
    labelKey: "commands.cat.mod",
    icon: "mdi:hazard-lights",
    commands: [
      { name: "/ban", description: "Bane um usuário do abrigo.", usage: "/ban @usuário [motivo]" },
      { name: "/kick", description: "Expulsa um sobrevivente do abrigo.", usage: "/kick @usuário [motivo]" },
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
  const { t } = useLang();

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
            {t("commands.title1")} <span className="text-gradient-ember">{t("commands.title2")}</span>
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            {t("commands.subtitle")}
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-12">
            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("commands.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted/60 backdrop-blur-sm border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/50"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {filtered.map((cat) => (
              <div key={cat.key} className="card-apocalyptic bg-background/60 backdrop-blur-md border-border/50">
                <button
                  onClick={() => toggle(cat.key)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/5 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Icon icon={cat.icon} className="h-5 w-5 text-primary" />
                    <span className="font-display text-sm font-semibold tracking-wider text-foreground">
                      {t(cat.labelKey).toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({cat.commands.length})
                    </span>
                  </div>
                  <Icon
                    icon="mdi:chevron-down"
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${openCategories[cat.key] ? "rotate-180" : ""}`}
                  />
                </button>

                {openCategories[cat.key] && (
                  <div className="px-5 pb-5 grid gap-3 sm:grid-cols-2">
                    {cat.commands.map((cmd) => (
                      <div
                        key={cmd.name}
                        className="rounded-lg border border-border/50 bg-muted/30 p-4 hover:border-primary/40 hover:bg-muted/50 transition-all duration-300"
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
                {t("commands.empty")} "{search}"
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
