import { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Server, Settings, Languages, Megaphone, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockServers = [
  { id: "1", name: "Last Shelter - Estado 999", icon: "🏰", members: 1234 },
  { id: "2", name: "FPS Competitivo BR", icon: "🔫", members: 567 },
  { id: "3", name: "Survival World", icon: "🌍", members: 890 },
];

const languages = [
  { key: "pt", label: "Português", flag: "🇧🇷" },
  { key: "en", label: "Inglês", flag: "🇺🇸" },
  { key: "es", label: "Espanhol", flag: "🇪🇸" },
  { key: "ru", label: "Russo", flag: "🇷🇺" },
  { key: "zh", label: "Chinês", flag: "🇨🇳" },
  { key: "ar", label: "Árabe", flag: "🇸🇦" },
];

const Dashboard = () => {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"translation" | "announcements">("translation");
  const [roleIds, setRoleIds] = useState<Record<string, string>>({});
  const [channelId, setChannelId] = useState("");

  const server = mockServers.find((s) => s.id === selectedServer);

  if (!selectedServer) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
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

        {/* Server Selection */}
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl font-bold tracking-wide mb-3 text-foreground">
              SELECIONE UM <span className="text-gradient-ember">SERVIDOR</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Escolha o servidor que deseja configurar.
            </p>
          </div>

          <div className="space-y-3">
            {mockServers.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedServer(s.id)}
                className="card-apocalyptic w-full p-5 flex items-center justify-between group hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                    {s.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">
                      {s.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{s.members} membros</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-display text-sm font-bold tracking-wider text-foreground">ELLIE</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{server?.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedServer(null)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Trocar Servidor
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("translation")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-display text-xs tracking-wider transition-all duration-300 ${
              activeTab === "translation"
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            }`}
          >
            <Languages className="h-4 w-4" />
            TRADUÇÃO
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-display text-xs tracking-wider transition-all duration-300 ${
              activeTab === "announcements"
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            }`}
          >
            <Megaphone className="h-4 w-4" />
            ANÚNCIOS
          </button>
        </div>

        {/* Translation Tab */}
        {activeTab === "translation" && (
          <div className="card-apocalyptic p-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-semibold tracking-wide text-foreground">
                Configurar Tradução
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Cole o ID do cargo (Role ID) do Discord correspondente a cada idioma. Membros com esse cargo terão suas mensagens traduzidas automaticamente.
            </p>

            <div className="space-y-5">
              {languages.map((lang) => (
                <div key={lang.key} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-36 flex-shrink-0">
                    <span className="text-lg">{lang.flag}</span>
                    <Label className="text-sm text-foreground font-medium">{lang.label}</Label>
                  </div>
                  <Input
                    placeholder="Ex: 123456789012345678"
                    value={roleIds[lang.key] || ""}
                    onChange={(e) =>
                      setRoleIds((prev) => ({ ...prev, [lang.key]: e.target.value }))
                    }
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/50"
                  />
                </div>
              ))}
            </div>

            <Button className="glow-button bg-primary text-primary-foreground font-display tracking-wider mt-8 gap-2">
              SALVAR CONFIGURAÇÕES
            </Button>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="card-apocalyptic p-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-semibold tracking-wide text-foreground">
                Configurar Anúncios
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Defina o ID do canal onde o bot enviará os embeds de anúncios.
            </p>

            <div className="space-y-5">
              <div>
                <Label className="text-sm text-foreground font-medium mb-2 block">
                  Canal de Anúncios (Channel ID)
                </Label>
                <Input
                  placeholder="Ex: 987654321098765432"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/50 max-w-md"
                />
              </div>
            </div>

            <Button className="glow-button bg-primary text-primary-foreground font-display tracking-wider mt-8 gap-2">
              SALVAR CONFIGURAÇÕES
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
