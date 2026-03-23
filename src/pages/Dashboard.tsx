import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bot, Server, LogOut, Eye, Globe, Crosshair,
  Shield, Menu, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EmberParticles from "@/components/EmberParticles";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

import OverviewTab from "@/components/dashboard/OverviewTab";
import LssTab from "@/components/dashboard/LssTab";
import CommunicationTab from "@/components/dashboard/CommunicationTab";
import ModerationTab from "@/components/dashboard/ModerationTab";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Server info states (from DB)
  const [serverName, setServerName] = useState("Carregando...");
  const [serverIcon, setServerIcon] = useState("🏰");
  const [memberCount, setMemberCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);
  const [idiomasAtivos, setIdiomasAtivos] = useState(0);
  const [ameacasBloqueadas, setAmeacasBloqueadas] = useState(0);

  // Time Zones states (from DB)
  const [tzAmericas, setTzAmericas] = useState(33);
  const [tzEuropa, setTzEuropa] = useState(33);
  const [tzAsia, setTzAsia] = useState(34);

  // Module states
  const [modTraducao, setModTraducao] = useState(true);
  const [modIntelligence, setModIntelligence] = useState(true);
  const [modComunicacao, setModComunicacao] = useState(true);
  const [modModeracao, setModModeracao] = useState(false);
  const [modAlertas, setModAlertas] = useState(true);

  // LSS State
  const [cozChestReminder, setCozChestReminder] = useState(true);
  const [killEventAlert, setKillEventAlert] = useState(true);
  const [doomsdayTargets, setDoomsdayTargets] = useState("Setor 7, Setor 12");
  const [safeZone, setSafeZone] = useState("Base Alpha");

  // Communication State (Nova Central de Idiomas)
  const [idiomasConfigurados, setIdiomasConfigurados] = useState<string[]>([]);
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
          // Server info
          if (data.server_name) setServerName(data.server_name);
          if (data.server_icon) setServerIcon(data.server_icon);
          if (data.member_count !== undefined) setMemberCount(data.member_count);
          if (data.online_count !== undefined) setOnlineCount(data.online_count);
          if (data.idiomas_ativos !== undefined) setIdiomasAtivos(data.idiomas_ativos);
          if (data.ameacas_bloqueadas !== undefined) setAmeacasBloqueadas(data.ameacas_bloqueadas);

          // Time Zones
          if (data.tz_americas !== undefined) setTzAmericas(data.tz_americas);
          if (data.tz_europa !== undefined) setTzEuropa(data.tz_europa);
          if (data.tz_asia !== undefined) setTzAsia(data.tz_asia);

          // Modules
          if (data.mod_traducao !== undefined) setModTraducao(data.mod_traducao);
          if (data.mod_intelligence !== undefined) setModIntelligence(data.mod_intelligence);
          if (data.mod_comunicacao !== undefined) setModComunicacao(data.mod_comunicacao);
          if (data.mod_moderacao !== undefined) setModModeracao(data.mod_moderacao);
          if (data.mod_alertas !== undefined) setModAlertas(data.mod_alertas);

          // LSS
          if (data.coz_chest_reminder !== undefined) setCozChestReminder(data.coz_chest_reminder);
          if (data.kill_event_alert !== undefined) setKillEventAlert(data.kill_event_alert);
          if (data.doomsday_targets !== undefined) setDoomsdayTargets(data.doomsday_targets);
          if (data.safe_zone !== undefined) setSafeZone(data.safe_zone);

          // Communication (Nova Central de Idiomas)
          if (data.idiomas_configurados) {
            setIdiomasConfigurados(data.idiomas_configurados);
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
        // Modules
        mod_traducao: modTraducao,
        mod_intelligence: modIntelligence,
        mod_comunicacao: modComunicacao,
        mod_moderacao: modModeracao,
        mod_alertas: modAlertas,
        // LSS
        coz_chest_reminder: cozChestReminder,
        kill_event_alert: killEventAlert,
        doomsday_targets: doomsdayTargets,
        safe_zone: safeZone,
        // Communication
        idiomas_configurados: idiomasConfigurados,
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

  const toggleIdioma = (id: string) => {
    setIdiomasConfigurados((prev) =>
      prev.includes(id) ? prev.filter((langId) => langId !== id) : [...prev, id]
    );
  };

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
              {serverIcon.startsWith("http") ? (
                <img src={serverIcon} alt="Server Icon" className="h-6 w-6 rounded-md object-cover" />
              ) : (
                <span className="text-xl">{serverIcon}</span>
              )}
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
          {activeTab === "overview" && (
            <OverviewTab
              serverName={serverName}
              serverIcon={serverIcon}
              memberCount={memberCount}
              onlineCount={onlineCount}
              idiomasAtivos={idiomasAtivos}
              ameacasBloqueadas={ameacasBloqueadas}
              tzAmericas={tzAmericas}
              tzEuropa={tzEuropa}
              tzAsia={tzAsia}
              modTraducao={modTraducao}
              setModTraducao={setModTraducao}
              modIntelligence={modIntelligence}
              setModIntelligence={setModIntelligence}
              modComunicacao={modComunicacao}
              setModComunicacao={setModComunicacao}
              modModeracao={modModeracao}
              setModModeracao={setModModeracao}
              modAlertas={modAlertas}
              setModAlertas={setModAlertas}
              handleSave={handleSave}
              saving={saving}
            />
          )}

          {activeTab === "lss" && (
            <LssTab
              cozChestReminder={cozChestReminder}
              setCozChestReminder={setCozChestReminder}
              killEventAlert={killEventAlert}
              setKillEventAlert={setKillEventAlert}
              doomsdayTargets={doomsdayTargets}
              setDoomsdayTargets={setDoomsdayTargets}
              safeZone={safeZone}
              setSafeZone={setSafeZone}
              saving={saving}
              handleSave={handleSave}
            />
          )}

          {activeTab === "communication" && (
            <CommunicationTab
              idiomasConfigurados={idiomasConfigurados}
              toggleIdioma={toggleIdioma}
              announcementText={announcementText}
              setAnnouncementText={setAnnouncementText}
              announcementChannel={announcementChannel}
              setAnnouncementChannel={setAnnouncementChannel}
              saving={saving}
              handleSave={handleSave}
            />
          )}

          {activeTab === "moderation" && (
            <ModerationTab
              blockedWords={blockedWords}
              setBlockedWords={setBlockedWords}
              antiSpam={antiSpam}
              setAntiSpam={setAntiSpam}
              antiFlood={antiFlood}
              setAntiFlood={setAntiFlood}
              antiLink={antiLink}
              setAntiLink={setAntiLink}
              welcomeMessage={welcomeMessage}
              setWelcomeMessage={setWelcomeMessage}
              autoRole={autoRole}
              setAutoRole={setAutoRole}
              saving={saving}
              handleSave={handleSave}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
                  
