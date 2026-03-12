import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot, Server, LogOut, ChevronRight, Eye, Languages, Megaphone, Gavel,
  Settings, Shield, Users, Hash, Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmberParticles from "@/components/EmberParticles";

const mockServers = [
  { id: "1", name: "Last Shelter - Estado 999", icon: "🏰", members: 1234, online: 342 },
  { id: "2", name: "FPS Competitivo BR", icon: "🔫", members: 567, online: 89 },
  { id: "3", name: "Survival World", icon: "🌍", members: 890, online: 201 },
];

const languages = [
  { key: "pt", label: "Português", flag: "🇧🇷" },
  { key: "en", label: "Inglês", flag: "🇺🇸" },
  { key: "es", label: "Espanhol", flag: "🇪🇸" },
  { key: "ru", label: "Russo", flag: "🇷🇺" },
];

type Tab = "overview" | "translation" | "announcements" | "moderation";

const sidebarItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Visão Geral", icon: <Eye className="h-4 w-4" /> },
  { key: "translation", label: "Tradução", icon: <Languages className="h-4 w-4" /> },
  { key: "announcements", label: "Anúncios", icon: <Megaphone className="h-4 w-4" /> },
  { key: "moderation", label: "Moderação", icon: <Gavel className="h-4 w-4" /> },
];

const Dashboard = () => {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [roleIds, setRoleIds] = useState<Record<string, string>>({});
  const [welcomeChannelId, setWelcomeChannelId] = useState("");
  const [announcementChannelId, setAnnouncementChannelId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const server = mockServers.find((s) => s.id === selectedServer);

  // Server selection screen
  if (!selectedServer) {
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

        <div className="relative z-20 container mx-auto px-4 py-16 max-w-2xl">
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
                className="card-apocalyptic bg-background/60 backdrop-blur-md w-full p-5 flex items-center justify-between group hover:border-primary/30 transition-all duration-300 cursor-pointer"
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
    <div className="min-h-screen bg-background relative flex flex-col">
      <EmberParticles />

      {/* Header */}
      <header className="relative z-30 border-b border-border/50 bg-background/60 backdrop-blur-xl flex-shrink-0">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-display text-xs font-bold tracking-wider text-foreground hidden sm:inline">ELLIE</span>
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <div className="flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{server?.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSelectedServer(null)} className="text-muted-foreground hover:text-foreground text-xs">
              Trocar Servidor
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative z-20 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } fixed lg:relative z-30 lg:z-auto w-56 h-[calc(100vh-3.5rem)] bg-background/70 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 flex-shrink-0 flex flex-col`}
        >
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-display tracking-widest">
              <Shield className="h-3.5 w-3.5 text-primary" />
              PAINEL TÁTICO
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-display tracking-wider transition-all duration-200 ${
                  activeTab === item.key
                    ? "bg-primary/10 text-primary border border-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
                }`}
              >
                {item.icon}
                {item.label.toUpperCase()}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border/30">
            <div className="text-[10px] text-muted-foreground/50 font-mono">
              ELLIE v2.4.1 // SISTEMA ONLINE
            </div>
          </div>
        </aside>

        {/* Overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              <h2 className="font-display text-xl font-bold tracking-wider mb-6 text-foreground">
                VISÃO <span className="text-gradient-ember">GERAL</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <StatCard icon={<Users className="h-5 w-5" />} label="Membros" value={server?.members.toString() || "0"} />
                <StatCard icon={<Eye className="h-5 w-5" />} label="Online Agora" value={server?.online.toString() || "0"} />
                <StatCard icon={<Languages className="h-5 w-5" />} label="Idiomas Ativos" value="4" />
              </div>

              <h3 className="font-display text-sm font-semibold tracking-wider text-muted-foreground mb-4">
                SEUS SERVIDORES
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mockServers.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedServer(s.id)}
                    className={`card-apocalyptic bg-background/60 backdrop-blur-md p-5 text-left hover:border-primary/30 transition-all ${
                      s.id === selectedServer ? "border-primary/40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="font-display text-xs font-semibold tracking-wide text-foreground">{s.name}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{s.members} membros</span>
                      <span className="text-primary">{s.online} online</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Translation */}
          {activeTab === "translation" && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
                  CONFIGURAR <span className="text-gradient-ember">TRADUÇÃO</span>
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                Cole o ID do cargo (Role ID) do Discord correspondente a cada idioma.
              </p>

              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6 md:p-8 space-y-5">
                {languages.map((lang) => (
                  <div key={lang.key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 w-36 flex-shrink-0">
                      <span className="text-lg">{lang.flag}</span>
                      <Label className="text-sm text-foreground font-medium">{lang.label}</Label>
                    </div>
                    <Input
                      placeholder="Ex: 123456789012345678"
                      value={roleIds[lang.key] || ""}
                      onChange={(e) => setRoleIds((prev) => ({ ...prev, [lang.key]: e.target.value }))}
                      className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm"
                    />
                  </div>
                ))}

                <Button className="glow-button bg-primary text-primary-foreground font-display tracking-wider mt-4 gap-2">
                  SALVAR CONFIGURAÇÕES
                </Button>
              </div>
            </div>
          )}

          {/* Announcements */}
          {activeTab === "announcements" && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
                  CONFIGURAR <span className="text-gradient-ember">ANÚNCIOS</span>
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                Defina os canais onde o bot enviará mensagens automáticas.
              </p>

              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6 md:p-8 space-y-6">
                <div>
                  <Label className="text-sm text-foreground font-medium mb-2 flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-primary" />
                    Canal de Bem-vindo (Channel ID)
                  </Label>
                  <Input
                    placeholder="Ex: 987654321098765432"
                    value={welcomeChannelId}
                    onChange={(e) => setWelcomeChannelId(e.target.value)}
                    className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm max-w-md"
                  />
                </div>

                <div>
                  <Label className="text-sm text-foreground font-medium mb-2 flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-primary" />
                    Canal de Comunicados (Channel ID)
                  </Label>
                  <Input
                    placeholder="Ex: 987654321098765432"
                    value={announcementChannelId}
                    onChange={(e) => setAnnouncementChannelId(e.target.value)}
                    className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm max-w-md"
                  />
                </div>

                <Button className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2">
                  SALVAR CONFIGURAÇÕES
                </Button>
              </div>
            </div>
          )}

          {/* Moderation */}
          {activeTab === "moderation" && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Gavel className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
                  <span className="text-gradient-ember">MODERAÇÃO</span>
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                Configure as ferramentas de moderação automática do servidor.
              </p>

              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Anti-Spam", desc: "Detecta e remove mensagens repetitivas automaticamente.", active: true },
                    { label: "Anti-Link", desc: "Bloqueia links não autorizados em canais protegidos.", active: false },
                    { label: "Auto-Warn", desc: "Adverte automaticamente usuários que violam regras.", active: true },
                    { label: "Log de Ações", desc: "Registra todas as ações de moderação em um canal.", active: false },
                  ].map((mod) => (
                    <div key={mod.label} className="rounded-lg border border-border/50 bg-muted/20 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display text-xs font-semibold tracking-wider text-foreground">
                          {mod.label.toUpperCase()}
                        </span>
                        <span className={`text-[10px] font-display tracking-wider px-2 py-0.5 rounded-full ${
                          mod.active
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : "bg-muted text-muted-foreground border border-border/50"
                        }`}>
                          {mod.active ? "ATIVO" : "INATIVO"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-5">
    <div className="flex items-center gap-3 mb-2 text-primary">{icon}</div>
    <p className="font-display text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground font-display tracking-wider">{label.toUpperCase()}</p>
  </div>
);

export default Dashboard;
