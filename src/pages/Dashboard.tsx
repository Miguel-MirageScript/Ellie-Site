import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Bot, Server, LogOut, Eye, Languages, Megaphone, Gavel,
  Shield, Users, Hash, Menu, Plus, Trash2, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmberParticles from "@/components/EmberParticles";

const mockServers: Record<string, { name: string; icon: string; members: number; online: number }> = {
  "1": { name: "Last Shelter - Estado 999", icon: "🏰", members: 1234, online: 342 },
  "2": { name: "FPS Competitivo BR", icon: "🔫", members: 567, online: 89 },
  "3": { name: "Survival World", icon: "🌍", members: 890, online: 201 },
  "4": { name: "Strategy Alliance", icon: "⚔️", members: 2100, online: 410 },
};

const availableLanguages = [
  { key: "pt", label: "Português", flag: "🇧🇷" },
  { key: "en", label: "Inglês", flag: "🇺🇸" },
  { key: "es", label: "Espanhol", flag: "🇪🇸" },
  { key: "ru", label: "Russo", flag: "🇷🇺" },
  { key: "fr", label: "Francês", flag: "🇫🇷" },
  { key: "de", label: "Alemão", flag: "🇩🇪" },
  { key: "zh", label: "Chinês", flag: "🇨🇳" },
  { key: "ja", label: "Japonês", flag: "🇯🇵" },
];

type Tab = "overview" | "translation" | "announcements" | "moderation";

const sidebarItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Visão Geral", icon: <Eye className="h-4 w-4" /> },
  { key: "translation", label: "Sistema de Tradução", icon: <Languages className="h-4 w-4" /> },
  { key: "announcements", label: "Anúncios", icon: <Megaphone className="h-4 w-4" /> },
  { key: "moderation", label: "Moderação", icon: <Gavel className="h-4 w-4" /> },
];

interface LanguageEntry {
  key: string;
  label: string;
  flag: string;
  roleId: string;
}

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const serverId = searchParams.get("server") || "1";
  const server = mockServers[serverId];

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Translation state
  const [addedLanguages, setAddedLanguages] = useState<LanguageEntry[]>([
    { key: "pt", label: "Português", flag: "🇧🇷", roleId: "110023456789012345" },
    { key: "en", label: "Inglês", flag: "🇺🇸", roleId: "220034567890123456" },
  ]);
  const [selectedLang, setSelectedLang] = useState("");
  const [langRoleId, setLangRoleId] = useState("");

  // Announcements state
  const [logChannelId, setLogChannelId] = useState("");
  const [welcomeChannelId, setWelcomeChannelId] = useState("");

  // Moderation toggles
  const [autoFilter, setAutoFilter] = useState(true);
  const [autoMod, setAutoMod] = useState(false);

  const handleAddLanguage = () => {
    if (!selectedLang || !langRoleId) return;
    const lang = availableLanguages.find((l) => l.key === selectedLang);
    if (!lang || addedLanguages.some((l) => l.key === selectedLang)) return;
    setAddedLanguages((prev) => [...prev, { ...lang, roleId: langRoleId }]);
    setSelectedLang("");
    setLangRoleId("");
  };

  const handleRemoveLanguage = (key: string) => {
    setAddedLanguages((prev) => prev.filter((l) => l.key !== key));
  };

  const remainingLanguages = availableLanguages.filter(
    (l) => !addedLanguages.some((a) => a.key === l.key)
  );

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <EmberParticles />

      {/* Header */}
      <header className="relative z-30 border-b border-border/50 bg-background/60 backdrop-blur-xl flex-shrink-0">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hover:text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-display text-xs font-bold tracking-wider text-foreground hidden sm:inline">
                ELLIE
              </span>
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <div className="flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{server?.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/select-server">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                Trocar Servidor
              </Button>
            </Link>
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

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/60 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* ───── OVERVIEW ───── */}
          {activeTab === "overview" && (
            <div>
              <h2 className="font-display text-xl font-bold tracking-wider mb-6 text-foreground">
                VISÃO <span className="text-gradient-ember">GERAL</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <StatCard icon={<Users className="h-5 w-5" />} label="Membros" value={server?.members.toString() || "0"} />
                <StatCard icon={<Eye className="h-5 w-5" />} label="Online Agora" value={server?.online.toString() || "0"} />
                <StatCard icon={<Languages className="h-5 w-5" />} label="Idiomas Ativos" value={addedLanguages.length.toString()} />
              </div>

              <h3 className="font-display text-sm font-semibold tracking-wider text-muted-foreground mb-4">
                SERVIDORES DISPONÍVEIS
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(mockServers).map(([id, s]) => (
                  <Link
                    key={id}
                    to={`/dashboard?server=${id}`}
                    className={`card-apocalyptic bg-background/60 backdrop-blur-md p-5 text-left hover:border-primary/30 transition-all ${
                      id === serverId ? "border-primary/40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="font-display text-xs font-semibold tracking-wide text-foreground">
                        {s.name}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{s.members} membros</span>
                      <span className="text-primary">{s.online} online</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ───── TRANSLATION SYSTEM ───── */}
          {activeTab === "translation" && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
                  SISTEMA DE <span className="text-gradient-ember">TRADUÇÃO</span>
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                Selecione o idioma e cole o Role ID correspondente no Discord.
              </p>

              {/* Add language form */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6 md:p-8 mb-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5">
                  ADICIONAR IDIOMA
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select value={selectedLang} onValueChange={setSelectedLang}>
                    <SelectTrigger className="sm:w-52 bg-muted/50 border-border/60 text-foreground backdrop-blur-sm">
                      <SelectValue placeholder="Selecionar idioma" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {remainingLanguages.map((lang) => (
                        <SelectItem key={lang.key} value={lang.key}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span> {lang.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Role ID (ex: 123456789012345678)"
                    value={langRoleId}
                    onChange={(e) => setLangRoleId(e.target.value)}
                    className="flex-1 bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm"
                  />

                  <Button
                    onClick={handleAddLanguage}
                    disabled={!selectedLang || !langRoleId}
                    className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    ADICIONAR
                  </Button>
                </div>
              </div>

              {/* Languages table */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md overflow-hidden">
                <div className="p-5 border-b border-border/30">
                  <h3 className="font-display text-xs tracking-widest text-muted-foreground">
                    IDIOMAS CONFIGURADOS ({addedLanguages.length})
                  </h3>
                </div>
                {addedLanguages.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    Nenhum idioma adicionado ainda.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30 hover:bg-transparent">
                        <TableHead className="text-muted-foreground font-display text-[10px] tracking-widest">
                          IDIOMA
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display text-[10px] tracking-widest">
                          ROLE ID
                        </TableHead>
                        <TableHead className="text-muted-foreground font-display text-[10px] tracking-widest w-16">
                          AÇÃO
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {addedLanguages.map((lang) => (
                        <TableRow key={lang.key} className="border-border/20 hover:bg-muted/20">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{lang.flag}</span>
                              <span className="text-sm font-medium text-foreground">{lang.label}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs font-mono text-primary/80 bg-muted/40 px-2 py-1 rounded">
                              {lang.roleId}
                            </code>
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => handleRemoveLanguage(lang.key)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          )}

          {/* ───── ANNOUNCEMENTS & MODERATION ───── */}
          {activeTab === "announcements" && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Megaphone className="h-5 w-5 text-primary" />
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
                    Canal de Log (Channel ID)
                  </Label>
                  <Input
                    placeholder="Ex: 987654321098765432"
                    value={logChannelId}
                    onChange={(e) => setLogChannelId(e.target.value)}
                    className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm max-w-md"
                  />
                </div>

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

                <Button className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2">
                  SALVAR CONFIGURAÇÕES
                </Button>
              </div>
            </div>
          )}

          {/* ───── MODERATION ───── */}
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

              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6 md:p-8 space-y-6">
                {/* Moderation channel inputs */}
                <div>
                  <Label className="text-sm text-foreground font-medium mb-2 flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-primary" />
                    Canal de Log de Moderação (Channel ID)
                  </Label>
                  <Input
                    placeholder="Ex: 987654321098765432"
                    className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm max-w-md"
                  />
                </div>

                {/* Toggle switches */}
                <div className="section-divider my-6" />

                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-4">
                  OPÇÕES DE AUTO-MODERAÇÃO
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div>
                      <span className="font-display text-xs font-semibold tracking-wider text-foreground block">
                        FILTRO AUTOMÁTICO
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Filtra palavrões e conteúdo impróprio automaticamente.
                      </span>
                    </div>
                    <Switch checked={autoFilter} onCheckedChange={setAutoFilter} />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div>
                      <span className="font-display text-xs font-semibold tracking-wider text-foreground block">
                        AUTO-MODERAÇÃO
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Detecta spam, flood e links suspeitos em tempo real.
                      </span>
                    </div>
                    <Switch checked={autoMod} onCheckedChange={setAutoMod} />
                  </div>
                </div>

                <Button className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 mt-4">
                  SALVAR CONFIGURAÇÕES
                </Button>
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
