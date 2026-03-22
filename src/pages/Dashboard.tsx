import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bot, Server, LogOut, Eye, Globe, Megaphone, Shield,
  Users, Hash, Menu, Plus, Trash2, Clock, Crosshair,
  Zap, AlertTriangle, MessageSquare, Send, Flag,
  Swords, Target, Timer, Skull, ChevronRight, Save, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmberParticles from "@/components/EmberParticles";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

/* ──────────────────── MOCK DATA ──────────────────── */

const moduleStatuses = [
  { name: "Sistema de Tradução", active: true },
  { name: "Last Shelter Intelligence", active: true },
  { name: "Comunicação Global", active: true },
  { name: "Moderação Tática", active: false },
  { name: "Alertas de Eventos", active: true },
];

const timeZoneData = [
  { zone: "Américas", pct: 55, color: "hsl(30 95% 50%)" },
  { zone: "Europa", pct: 28, color: "hsl(25 100% 55%)" },
  { zone: "Ásia", pct: 17, color: "hsl(0 0% 50%)" },
];

const cozDays = [
  { day: "Dia 1 — Build", points: "500K", active: true },
  { day: "Dia 2 — Research", points: "400K", active: false },
  { day: "Dia 3 — Train", points: "600K", active: true },
  { day: "Dia 4 — Kill Event", points: "1M", active: true },
];

const gameTimers = [
  { event: "Ataque Zumbi", time: "02:45:12", icon: <Skull className="h-4 w-4" /> },
  { event: "Bunker", time: "08:15:30", icon: <Target className="h-4 w-4" /> },
  { event: "Doomsday Reset", time: "1d 04:22:00", icon: <Timer className="h-4 w-4" /> },
  { event: "Próximo CoZ", time: "3d 12:00:00", icon: <Swords className="h-4 w-4" /> },
];

const reactionFlagsDefault = [
  { emoji: "🇧🇷", lang: "Português", active: true },
  { emoji: "🇺🇸", lang: "Inglês", active: true },
  { emoji: "🇪🇸", lang: "Espanhol", active: true },
  { emoji: "🇷🇺", lang: "Russo", active: false },
  { emoji: "🇫🇷", lang: "Francês", active: false },
  { emoji: "🇩🇪", lang: "Alemão", active: false },
  { emoji: "🇨🇳", lang: "Chinês", active: false },
  { emoji: "🇯🇵", lang: "Japonês", active: false },
];

const channels = [
  { id: "general", name: "#geral" },
  { id: "announcements", name: "#anúncios" },
  { id: "alliance", name: "#aliança" },
  { id: "war-room", name: "#sala-de-guerra" },
];

const autoRoles = [
  { id: "member", name: "Membro" },
  { id: "recruit", name: "Recruta" },
  { id: "visitor", name: "Visitante" },
];

const SERVER_ID = "servidor_teste_999";

/* ──────────────────── TYPES ──────────────────── */

type Tab = "overview" | "lss" | "communication" | "moderation";

const sidebarItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Visão Geral", icon: <Eye className="h-4 w-4" /> },
  { key: "lss", label: "LSS Intelligence", icon: <Crosshair className="h-4 w-4" /> },
  { key: "communication", label: "Comunicação", icon: <Globe className="h-4 w-4" /> },
  { key: "moderation", label: "Moderação", icon: <Shield className="h-4 w-4" /> },
];

/* ──────────────────── COMPONENT ──────────────────── */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // --- DADOS REAIS DO SERVIDOR (RADAR) ---
  const [serverName, setServerName] = useState("Carregando...");
  const [serverIcon, setServerIcon] = useState("🏰");
  const [memberCount, setMemberCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);

  // LSS State
  const [cozChestReminder, setCozChestReminder] = useState(true);
  const [killEventAlert, setKillEventAlert] = useState(true);
  const [doomsdayTargets, setDoomsdayTargets] = useState("Setor 7, Setor 12");
  const [safeZone, setSafeZone] = useState("Base Alpha");

  // Communication State
  const [reactionTranslations, setReactionTranslations] = useState(
    reactionFlagsDefault.map((f) => ({ ...f }))
  );
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementChannel, setAnnouncementChannel] = useState("");

  // Moderation State
  const [blockedWords, setBlockedWords] = useState("spam, hack, cheat");
  const [antiSpam, setAntiSpam] = useState(true);
  const [antiFlood, setAntiFlood] = useState(true);
  const [antiLink, setAntiLink] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "⚔️ Bem-vindo(a) ao Last Shelter, soldado {user}! Leia as regras em #regras."
  );
  const [autoRole, setAutoRole] = useState("member");
  

  // ──────── Load settings from Supabase ────────
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("configuracoes_servidor")
          .select("*")
          .eq("id_servidor", SERVER_ID)
          .maybeSingle();

        if (error) {
          console.error("Erro ao carregar configurações:", error);
          toast({
            title: "Erro ao carregar",
            description: "Não foi possível carregar as configurações do servidor.",
            variant: "destructive",
          });
        } else if (data) {
          // --- DADOS REAIS DO SERVIDOR (RADAR) ---
          if (data.server_name !== undefined) setServerName(data.server_name);
          if (data.server_icon !== undefined) setServerIcon(data.server_icon);
          if (data.member_count !== undefined) setMemberCount(data.member_count);
          if (data.online_count !== undefined) setOnlineCount(data.online_count);

          // LSS
          if (data.coz_chest_reminder !== undefined) setCozChestReminder(data.coz_chest_reminder);
          if (data.kill_event_alert !== undefined) setKillEventAlert(data.kill_event_alert);
          if (data.doomsday_targets !== undefined) setDoomsdayTargets(data.doomsday_targets);
          if (data.safe_zone !== undefined) setSafeZone(data.safe_zone);

          // Communication - reaction translations
          if (data.reaction_translations) {
            setReactionTranslations(data.reaction_translations);
          }

          // Moderation
          if (data.blocked_words !== undefined) setBlockedWords(data.blocked_words);
          if (data.anti_spam !== undefined) setAntiSpam(data.anti_spam);
          if (data.anti_flood !== undefined) setAntiFlood(data.anti_flood);
          if (data.anti_link !== undefined) setAntiLink(data.anti_link);
          if (data.welcome_message !== undefined) setWelcomeMessage(data.welcome_message);
          if (data.auto_role !== undefined) setAutoRole(data.auto_role);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // ──────── Save settings to Supabase ────────
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        id_servidor: SERVER_ID,
        // LSS
        coz_chest_reminder: cozChestReminder,
        kill_event_alert: killEventAlert,
        doomsday_targets: doomsdayTargets,
        safe_zone: safeZone,
        // Communication
        reaction_translations: reactionTranslations,
        // Moderation
        blocked_words: blockedWords,
        anti_spam: antiSpam,
        anti_flood: antiFlood,
        anti_link: antiLink,
        welcome_message: welcomeMessage,
        auto_role: autoRole,
      };

      const { error } = await supabase
        .from("configuracoes_servidor")
        .upsert(payload, { onConflict: "id_servidor" });

      if (error) {
        console.error("Erro ao salvar:", error);
        toast({
          title: "Erro ao salvar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "✅ Configurações salvas!",
          description: "Todas as configurações foram salvas com sucesso no banco de dados.",
        });
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao tentar salvar.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleReactionFlag = (emoji: string) => {
    setReactionTranslations((prev) =>
      prev.map((f) => (f.emoji === emoji ? { ...f, active: !f.active } : f))
    );
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <EmberParticles />

      {/* Header Corrigido */}
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
              <span className="text-xl flex items-center">
                {serverIcon.startsWith('http') ? (
                  <img src={serverIcon} alt="Icon" className="w-5 h-5 rounded-full" />
                ) : (
                  serverIcon
                )}
              </span>
              <span className="text-xs font-medium text-foreground font-display tracking-wide">
                {serverName}
              </span>
            </div>

          </div>
          <div className="flex items-center gap-2">
            <Link to="/select-server">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs gap-1.5">
                <Server className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Trocar Servidor</span>
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative z-20 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } fixed lg:relative z-30 lg:z-auto w-60 h-[calc(100vh-3.5rem)] bg-background/70 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 flex-shrink-0 flex flex-col`}
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
                <span className="flex-1 text-left">{item.label.toUpperCase()}</span>
                {activeTab === item.key && <ChevronRight className="h-3 w-3 text-primary/60" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border/30">
            <div className="text-[10px] text-muted-foreground/50 font-mono">
              ELLIE v2.4.1 // SISTEMA ONLINE
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-500/80 font-mono">OPERACIONAL</span>
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* ═══════════════ OVERVIEW ═══════════════ */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Server Header */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl flex items-center">
                    {serverIcon.startsWith('http') ? (
                      <img src={serverIcon} alt="Icon" className="w-12 h-12 rounded-full shadow-[0_0_15px_rgba(255,100,0,0.3)]" />
                    ) : (
                      serverIcon
                    )}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-wider text-foreground">
                      {serverName}
                    </h2>
                    <p className="text-xs text-muted-foreground font-display tracking-wider mt-1">
                      SERVIDOR GERENCIADO POR ELLIE SURVIVOR
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <StatCard icon={<Users className="h-5 w-5" />} label="Total Membros" value={memberCount.toString()} accent />
                <StatCard icon={<Eye className="h-5 w-5" />} label="Online Agora" value={onlineCount.toString()} />
                <StatCard icon={<Globe className="h-5 w-5" />} label="Idiomas Ativos" value="3" />
                <StatCard icon={<Shield className="h-5 w-5" />} label="Ameaças Bloqueadas" value="142" />
              </div>

              {/* Alliance Time Zones Chart */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5">
                  FUSOS HORÁRIOS DA ALIANÇA
                </h3>
                <div className="space-y-4">
                  {timeZoneData.map((tz) => (
                    <div key={tz.zone}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-foreground font-display tracking-wider">{tz.zone.toUpperCase()}</span>
                        <span className="text-primary font-mono">{tz.pct}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-muted/40 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${tz.pct}%`,
                            background: `linear-gradient(90deg, ${tz.color}, ${tz.color}88)`,
                            boxShadow: `0 0 12px ${tz.color}66`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Donut visual */}
                <div className="flex items-center justify-center mt-6">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(0 0% 14%)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(30 95% 50%)" strokeWidth="3"
                        strokeDasharray="55 45" strokeDashoffset="0" className="drop-shadow-[0_0_6px_hsl(30_95%_50%_/_0.6)]" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(25 100% 55%)" strokeWidth="3"
                        strokeDasharray="28 72" strokeDashoffset="-55" className="drop-shadow-[0_0_6px_hsl(25_100%_55%_/_0.6)]" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(0 0% 50%)" strokeWidth="3"
                        strokeDasharray="17 83" strokeDashoffset="-83" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-xs text-primary font-bold">3 ZONAS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Status */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5">
                  STATUS DOS MÓDULOS
                </h3>
                <div className="space-y-3">
                  {moduleStatuses.map((mod) => (
                    <div key={mod.name} className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${mod.active ? "bg-green-500 shadow-[0_0_8px_hsl(120_60%_50%_/_0.5)]" : "bg-muted-foreground/40"}`} />
                        <span className="text-xs font-display tracking-wider text-foreground">{mod.name.toUpperCase()}</span>
                      </div>
                      <Switch checked={mod.active} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* ═══════════════ LSS INTELLIGENCE ═══════════════ */}
          {activeTab === "lss" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Crosshair className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
                  LAST SHELTER <span className="text-gradient-ember">INTELLIGENCE</span>
                </h2>
              </div>

              {/* CoZ Configuration */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                  <Swords className="h-3.5 w-3.5 text-primary" />
                  CLASH OF ZONES (COZ) — CONFIGURAÇÃO
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cozDays.map((d) => (
                    <div key={d.day} className={`rounded-lg border px-4 py-3 ${d.active ? "border-primary/30 bg-primary/5" : "border-border/40 bg-muted/10"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-display tracking-wider text-foreground">{d.day.toUpperCase()}</span>
                        <span className="text-xs font-mono text-primary">{d.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="section-divider my-5" />
                <div className="space-y-4">
                  <ToggleRow label="Lembrete de Baú" desc="Envia alerta quando baús CoZ estiverem disponíveis." checked={cozChestReminder} onChange={setCozChestReminder} />
                  <ToggleRow label="Alerta Kill Event" desc="Notifica membros antes do dia de Kill Event." checked={killEventAlert} onChange={setKillEventAlert} />
                </div>
              </div>

              {/* Doomsday / Eden */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-primary" />
                  DOOMSDAY / EDEN — CONFIGURAÇÃO
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">ALVOS PRIORITÁRIOS</Label>
                    <Input
                      value={doomsdayTargets}
                      onChange={(e) => setDoomsdayTargets(e.target.value)}
                      className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">ZONA SEGURA</Label>
                    <Input
                      value={safeZone}
                      onChange={(e) => setSafeZone(e.target.value)}
                      className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Game Event Timers */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  TEMPORIZADORES DE EVENTOS
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {gameTimers.map((t) => (
                    <div key={t.event} className="rounded-lg border border-border/40 bg-muted/10 px-4 py-4 flex items-center gap-4">
                      <div className="text-primary">{t.icon}</div>
                      <div className="flex-1">
                        <span className="text-xs font-display tracking-wider text-foreground block">{t.event.toUpperCase()}</span>
                        <span className="text-lg font-mono text-primary font-bold">{t.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={saving}
                className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "SALVANDO..." : "SALVAR CONFIGURAÇÕES"}
              </Button>
            </div>
          )}
                    {/* ═══════════════ GLOBAL COMMUNICATION ═══════════════ */}
          {activeTab === "communication" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
                  COMUNICAÇÃO <span className="text-gradient-ember">GLOBAL</span>
                </h2>
              </div>

              {/* Reaction Translation */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                  <Flag className="h-3.5 w-3.5 text-primary" />
                  TRADUÇÃO POR REAÇÃO
                </h3>
                <p className="text-xs text-muted-foreground mb-5">
                  A tradução <strong className="text-foreground">NÃO</strong> é automática. Ela é ativada quando alguém reage a uma mensagem com o emoji de bandeira correspondente.
                </p>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                  {reactionTranslations.map((flag) => (
                    <button
                      key={flag.emoji}
                      onClick={() => toggleReactionFlag(flag.emoji)}
                      className={`rounded-lg border px-4 py-3 text-center transition-all duration-200 ${
                        flag.active
                          ? "border-primary/40 bg-primary/10 shadow-[0_0_15px_hsl(30_95%_50%_/_0.15)]"
                          : "border-border/40 bg-muted/10 opacity-50 hover:opacity-75"
                      }`}
                    >
                      <span className="text-2xl block mb-1">{flag.emoji}</span>
                      <span className="text-[10px] font-display tracking-wider text-foreground">{flag.lang.toUpperCase()}</span>
                      <span className={`block text-[9px] font-mono mt-1 ${flag.active ? "text-green-500" : "text-muted-foreground"}`}>
                        {flag.active ? "ATIVO" : "INATIVO"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Official Announcements */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                  <Megaphone className="h-3.5 w-3.5 text-primary" />
                  ANÚNCIOS OFICIAIS
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">MENSAGEM</Label>
                    <Textarea
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      placeholder="Escreva o anúncio para a aliança..."
                      rows={4}
                      className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm resize-none"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">CANAL DE DESTINO</Label>
                    <Select value={announcementChannel} onValueChange={setAnnouncementChannel}>
                      <SelectTrigger className="sm:w-64 bg-muted/50 border-border/60 text-foreground backdrop-blur-sm">
                        <SelectValue placeholder="Selecionar canal" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {channels.map((ch) => (
                          <SelectItem key={ch.id} value={ch.id}>
                            <span className="flex items-center gap-2">
                              <Hash className="h-3 w-3 text-muted-foreground" />
                              {ch.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    disabled={!announcementText || !announcementChannel}
                    className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2"
                  >
                    <Send className="h-4 w-4" />
                    ENVIAR ANÚNCIO
                  </Button>
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={saving}
                className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "SALVANDO..." : "SALVAR CONFIGURAÇÕES"}
              </Button>
            </div>
          )}
                    {/* ═══════════════ TACTICAL MODERATION ═══════════════ */}
          {activeTab === "moderation" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
                  MODERAÇÃO <span className="text-gradient-ember">TÁTICA</span>
                </h2>
              </div>

              {/* Blocked Words */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-primary" />
                  FILTRO DE PALAVRAS
                </h3>
                <div>
                  <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">PALAVRAS BLOQUEADAS</Label>
                  <Textarea
                    value={blockedWords}
                    onChange={(e) => setBlockedWords(e.target.value)}
                    placeholder="Separe palavras por vírgula..."
                    rows={3}
                    className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm resize-none"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1.5 font-mono">
                    {blockedWords.split(",").filter(Boolean).length} PALAVRAS CONFIGURADAS
                  </p>
                </div>
              </div>

              {/* Anti-Spam Toggles */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  PROTEÇÃO AUTOMÁTICA
                </h3>
                <div className="space-y-3">
                  <ToggleRow label="Anti-Spam" desc="Detecta e remove mensagens de spam automaticamente." checked={antiSpam} onChange={setAntiSpam} />
                  <ToggleRow label="Anti-Flood" desc="Limita mensagens repetidas em curto intervalo." checked={antiFlood} onChange={setAntiFlood} />
                  <ToggleRow label="Anti-Link" desc="Bloqueia links externos não autorizados." checked={antiLink} onChange={setAntiLink} />
                </div>
              </div>

              {/* Welcome Message */}
              <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  MENSAGEM DE BOAS-VINDAS
                </h3>
                <Textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={3}
                  className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm resize-none mb-3"
                />
                <p className="text-[10px] text-muted-foreground font-mono mb-1">
                  USE {"{user}"} PARA MENCIONAR O NOVO MEMBRO
                </p>

                <div className="section-divider my-5" />

                <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  CARGO AUTOMÁTICO
                </h3>
                <Select value={autoRole} onValueChange={setAutoRole}>
                  <SelectTrigger className="sm:w-64 bg-muted/50 border-border/60 text-foreground backdrop-blur-sm">
                    <SelectValue placeholder="Selecionar cargo" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {autoRoles.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "SALVANDO..." : "SALVAR CONFIGURAÇÕES"}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
/* ──────────────────── SUB-COMPONENTS ──────────────────── */

const StatCard = ({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-5">
    <div className="flex items-center gap-3 mb-2 text-primary">{icon}</div>
    <p className={`font-display text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
    <p className="text-[10px] text-muted-foreground font-display tracking-widest mt-1">{label.toUpperCase()}</p>
  </div>
);

const ToggleRow = ({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/10 px-4 py-3">
    <div>
      <span className="font-display text-xs font-semibold tracking-wider text-foreground block">{label.toUpperCase()}</span>
      <span className="text-[11px] text-muted-foreground">{desc}</span>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

export default Dashboard;
