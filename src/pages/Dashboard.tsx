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

type Tab = "overview" | "lss" | "communication" | "moderation";

const sidebarItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Visão Geral", icon: <Eye className="h-4 w-4" /> },
  { key: "lss", label: "LSS Intelligence", icon: <Crosshair className="h-4 w-4" /> },
  { key: "communication", label: "Comunicação", icon: <Globe className="h-4 w-4" /> },
  { key: "moderation", label: "Moderação", icon: <Shield className="h-4 w-4" /> },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [serverName, setServerName] = useState("Carregando...");
  const [serverIcon, setServerIcon] = useState("🏰");
  const [memberCount, setMemberCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);
  const [idiomasAtivos, setIdiomasAtivos] = useState(0);
  const [ameacasBloqueadas, setAmeacasBloqueadas] = useState(0);

  const [tzAmericas, setTzAmericas] = useState(33);
  const [tzEuropa, setTzEuropa] = useState(33);
  const [tzAsia, setTzAsia] = useState(34);

  const [modTraducao, setModTraducao] = useState(true);
  const [modIntelligence, setModIntelligence] = useState(true);
  const [modComunicacao, setModComunicacao] = useState(true);
  const [modModeracao, setModModeracao] = useState(false);
  const [modAlertas, setModAlertas] = useState(true);

  const [cozChestReminder, setCozChestReminder] = useState(true);
  const [killEventAlert, setKillEventAlert] = useState(true);
  const [doomsdayTargets, setDoomsdayTargets] = useState("Setor 7, Setor 12");
  const [safeZone, setSafeZone] = useState("Base Alpha");

  // 📡 Canais Setorizados
  const [canalWarBoard, setCanalWarBoard] = useState("");
  const [canalCoz, setCanalCoz] = useState("");
  const [canalHoraEmHora, setCanalHoraEmHora] = useState("");
  const [canalKe, setCanalKe] = useState("");
  const [canalSiege, setCanalSiege] = useState("");
  const [canalBalrog, setCanalBalrog] = useState("");
  const [canalAcademia, setCanalAcademia] = useState("");

  const [cozAtivo, setCozAtivo] = useState(false);
  const [horaEmHoraAtivo, setHoraEmHoraAtivo] = useState(false);
  const [warBoardTexto, setWarBoardTexto] = useState("");
  const [warBoardImagem, setWarBoardImagem] = useState("");
  
  // ALARMES NOVOS
  const [keAtivo, setKeAtivo] = useState(false);
  const [keAlertaAntecipado, setKeAlertaAntecipado] = useState(true);
  const [siegeAtivo, setSiegeAtivo] = useState(false);
  const [siegeHorario, setSiegeHorario] = useState("");
  const [balrogHorario, setBalrogHorario] = useState("");
  
  const [lssRegrasNovatos, setLssRegrasNovatos] = useState("");

  const [idiomasConfigurados, setIdiomasConfigurados] = useState<string[]>([]);
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementChannel, setAnnouncementChannel] = useState("");

  const [blockedWords, setBlockedWords] = useState("spam, hack, cheat");
  const [antiSpam, setAntiSpam] = useState(true);
  const [antiFlood, setAntiFlood] = useState(true);
  const [antiLink, setAntiLink] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("Bem-vindo {user}!");
  const [autoRole, setAutoRole] = useState("member");

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await supabase.from("configuracoes_servidor").select("*").eq("id_servidor", SERVER_ID).maybeSingle();
        if (data) {
          if (data.server_name) setServerName(data.server_name);
          if (data.server_icon) setServerIcon(data.server_icon);
          if (data.member_count !== undefined) setMemberCount(data.member_count);
          if (data.online_count !== undefined) setOnlineCount(data.online_count);
          if (data.idiomas_ativos !== undefined) setIdiomasAtivos(data.idiomas_ativos);
          if (data.ameacas_bloqueadas !== undefined) setAmeacasBloqueadas(data.ameacas_bloqueadas);
          if (data.tz_americas !== undefined) setTzAmericas(data.tz_americas);
          if (data.tz_europa !== undefined) setTzEuropa(data.tz_europa);
          if (data.tz_asia !== undefined) setTzAsia(data.tz_asia);
          if (data.mod_traducao !== undefined) setModTraducao(data.mod_traducao);
          if (data.mod_intelligence !== undefined) setModIntelligence(data.mod_intelligence);
          if (data.mod_comunicacao !== undefined) setModComunicacao(data.mod_comunicacao);
          if (data.mod_moderacao !== undefined) setModModeracao(data.mod_moderacao);
          if (data.mod_alertas !== undefined) setModAlertas(data.mod_alertas);
          
          if (data.coz_chest_reminder !== undefined) setCozChestReminder(data.coz_chest_reminder);
          if (data.kill_event_alert !== undefined) setKillEventAlert(data.kill_event_alert);
          if (data.doomsday_targets !== undefined) setDoomsdayTargets(data.doomsday_targets);
          if (data.safe_zone !== undefined) setSafeZone(data.safe_zone);

          if (data.canal_warboard !== undefined) setCanalWarBoard(data.canal_warboard);
          if (data.canal_coz !== undefined) setCanalCoz(data.canal_coz);
          if (data.canal_hora_em_hora !== undefined) setCanalHoraEmHora(data.canal_hora_em_hora);
          if (data.canal_ke !== undefined) setCanalKe(data.canal_ke);
          if (data.canal_siege !== undefined) setCanalSiege(data.canal_siege);
          if (data.canal_balrog !== undefined) setCanalBalrog(data.canal_balrog);
          if (data.canal_academia !== undefined) setCanalAcademia(data.canal_academia);

          if (data.coz_ativo !== undefined) setCozAtivo(data.coz_ativo);
          if (data.hora_em_hora_ativo !== undefined) setHoraEmHoraAtivo(data.hora_em_hora_ativo);
          if (data.war_board_texto !== undefined) setWarBoardTexto(data.war_board_texto);
          if (data.war_board_imagem !== undefined) setWarBoardImagem(data.war_board_imagem);
          if (data.ke_ativo !== undefined) setKeAtivo(data.ke_ativo);
          if (data.ke_alerta_antecipado !== undefined) setKeAlertaAntecipado(data.ke_alerta_antecipado);
          if (data.siege_ativo !== undefined) setSiegeAtivo(data.siege_ativo);
          if (data.siege_horario !== undefined) setSiegeHorario(data.siege_horario);
          if (data.balrog_horario !== undefined) setBalrogHorario(data.balrog_horario);
          if (data.lss_regras_novatos !== undefined) setLssRegrasNovatos(data.lss_regras_novatos);
          
          if (data.idiomas_configurados) setIdiomasConfigurados(data.idiomas_configurados);
          if (data.blocked_words !== undefined) setBlockedWords(data.blocked_words);
          if (data.anti_spam !== undefined) setAntiSpam(data.anti_spam);
          if (data.anti_flood !== undefined) setAntiFlood(data.anti_flood);
          if (data.anti_link !== undefined) setAntiLink(data.anti_link);
          if (data.welcome_message !== undefined) setWelcomeMessage(data.welcome_message);
          if (data.auto_role !== undefined) setAutoRole(data.auto_role);
        }
      } finally { setLoading(false); }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        id_servidor: SERVER_ID,
        mod_traducao: modTraducao, mod_intelligence: modIntelligence, mod_comunicacao: modComunicacao, mod_moderacao: modModeracao, mod_alertas: modAlertas,
        coz_chest_reminder: cozChestReminder, kill_event_alert: killEventAlert, doomsday_targets: doomsdayTargets, safe_zone: safeZone,
        canal_warboard: canalWarBoard, canal_coz: canalCoz, canal_hora_em_hora: canalHoraEmHora,
        canal_ke: canalKe, canal_siege: canalSiege, canal_balrog: canalBalrog, canal_academia: canalAcademia,
        coz_ativo: cozAtivo, hora_em_hora_ativo: horaEmHoraAtivo,
        war_board_texto: warBoardTexto, war_board_imagem: warBoardImagem,
        ke_ativo: keAtivo, ke_alerta_antecipado: keAlertaAntecipado,
        siege_ativo: siegeAtivo, siege_horario: siegeHorario, balrog_horario: balrogHorario,
        lss_regras_novatos: lssRegrasNovatos,
        idiomas_configurados: idiomasConfigurados, blocked_words: blockedWords, anti_spam: antiSpam, anti_flood: antiFlood, anti_link: antiLink, welcome_message: welcomeMessage, auto_role: autoRole,
      };

      const { error } = await supabase.from("configuracoes_servidor").upsert(payload, { onConflict: "id_servidor" });
      
      if (!error) {
        toast({ title: "✅ Ordens Transmitidas!" });
        setWarBoardTexto("");
        setWarBoardImagem("");
        await supabase
          .from("configuracoes_servidor")
          .update({ war_board_texto: "", war_board_imagem: "" })
          .eq("id_servidor", SERVER_ID);
      }
    } catch (err) {
      toast({ title: "❌ Erro ao salvar", description: "Falha na conexão com a base de dados.", variant: "destructive" });
    } finally { 
      setSaving(false); 
    }
  };

  // 🚨 BOTÃO DE PÂNICO DO CERCO ZUMBI
  const handleTriggerSiege = async () => {
    try {
      await supabase
        .from("configuracoes_servidor")
        .update({ trigger_siege_now: true })
        .eq("id_servidor", SERVER_ID);
      
      toast({ 
        title: "🚨 SIRENE ACIONADA!", 
        description: "A Ellie está enviando o alerta de Cerco Zumbi no Discord agora mesmo.",
        variant: "destructive" 
      });
    } catch (err) {
      toast({ title: "Erro ao acionar sirene", variant: "destructive" });
    }
  };

  const toggleIdioma = (id: string) => { setIdiomasConfigurados((prev) => prev.includes(id) ? prev.filter((langId) => langId !== id) : [...prev, id]); };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${SERVER_ID}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('ellie-images').upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('ellie-images').getPublicUrl(fileName);
      setWarBoardImagem(publicUrl);
      toast({ title: "📸 Imagem carregada!", description: "Link gerado com sucesso. Clique em 'Salvar Táticas' para enviar." });
    } catch (error) {
      toast({ title: "Erro no upload", description: "Tamanho máximo permitido: 5MB.", variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <EmberParticles />

      <header className="relative z-30 border-b border-border/50 bg-background/60 backdrop-blur-xl flex-shrink-0">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground lg:hidden"><Menu className="h-5 w-5" /></button>
            <Link to="/" className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary" /><span className="font-display text-xs font-bold tracking-wider text-foreground hidden sm:inline">ELLIE</span></Link>
            <span className="text-muted-foreground/40">/</span>
            <div className="flex items-center gap-2">
              {serverIcon.startsWith("http") ? <img src={serverIcon} alt="Server Icon" className="h-6 w-6 rounded-md object-cover" /> : <span className="text-xl">{serverIcon}</span>}
              <span className="text-xs font-medium text-foreground font-display tracking-wide">{serverName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/select-server"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs gap-1.5"><Server className="h-3.5 w-3.5" /><span className="hidden sm:inline">Trocar Servidor</span></Button></Link>
            <Link to="/"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative z-20 overflow-hidden">
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} fixed lg:relative z-30 lg:z-auto w-60 h-[calc(100vh-3.5rem)] bg-background/70 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 flex-shrink-0 flex flex-col`}>
          <div className="p-4 border-b border-border/30"><div className="flex items-center gap-2 text-xs text-muted-foreground font-display tracking-widest"><Shield className="h-3.5 w-3.5 text-primary" />PAINEL TÁTICO</div></div>
          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => (
              <button key={item.key} onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-display tracking-wider transition-all duration-200 ${activeTab === item.key ? "bg-primary/10 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"}`}>
                {item.icon}<span className="flex-1 text-left">{item.label.toUpperCase()}</span>{activeTab === item.key && <ChevronRight className="h-3 w-3 text-primary/60" />}
              </button>
            ))}
          </nav>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-background/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {activeTab === "overview" && (
            <OverviewTab serverName={serverName} serverIcon={serverIcon} memberCount={memberCount} onlineCount={onlineCount} idiomasAtivos={idiomasAtivos} ameacasBloqueadas={ameacasBloqueadas} tzAmericas={tzAmericas} tzEuropa={tzEuropa} tzAsia={tzAsia} modTraducao={modTraducao} setModTraducao={setModTraducao} modIntelligence={modIntelligence} setModIntelligence={setModIntelligence} modComunicacao={modComunicacao} setModComunicacao={setModComunicacao} modModeracao={modModeracao} setModModeracao={setModModeracao} modAlertas={modAlertas} setModAlertas={setModAlertas} handleSave={handleSave} saving={saving} />
          )}

          {activeTab === "lss" && (
            <LssTab
              cozChestReminder={cozChestReminder} setCozChestReminder={setCozChestReminder} killEventAlert={killEventAlert} setKillEventAlert={setKillEventAlert} doomsdayTargets={doomsdayTargets} setDoomsdayTargets={setDoomsdayTargets} safeZone={safeZone} setSafeZone={setSafeZone}
              canalWarBoard={canalWarBoard} setCanalWarBoard={setCanalWarBoard}
              canalCoz={canalCoz} setCanalCoz={setCanalCoz}
              canalHoraEmHora={canalHoraEmHora} setCanalHoraEmHora={setCanalHoraEmHora}
              canalKe={canalKe} setCanalKe={setCanalKe}
              canalSiege={canalSiege} setCanalSiege={setCanalSiege}
              canalBalrog={canalBalrog} setCanalBalrog={setCanalBalrog}
              canalAcademia={canalAcademia} setCanalAcademia={setCanalAcademia}
              cozAtivo={cozAtivo} setCozAtivo={setCozAtivo}
              horaEmHoraAtivo={horaEmHoraAtivo} setHoraEmHoraAtivo={setHoraEmHoraAtivo}
              warBoardTexto={warBoardTexto} setWarBoardTexto={setWarBoardTexto}
              warBoardImagem={warBoardImagem} setWarBoardImagem={setWarBoardImagem}
              keAtivo={keAtivo} setKeAtivo={setKeAtivo}
              keAlertaAntecipado={keAlertaAntecipado} setKeAlertaAntecipado={setKeAlertaAntecipado}
              siegeAtivo={siegeAtivo} setSiegeAtivo={setSiegeAtivo}
              siegeHorario={siegeHorario} setSiegeHorario={setSiegeHorario}
              balrogHorario={balrogHorario} setBalrogHorario={setBalrogHorario}
              lssRegrasNovatos={lssRegrasNovatos} setLssRegrasNovatos={setLssRegrasNovatos}
              saving={saving} handleSave={handleSave}
              uploadingImage={uploadingImage}
              handleImageUpload={handleImageUpload}
              handleTriggerSiege={handleTriggerSiege}
            />
          )}

          {activeTab === "communication" && (
            <CommunicationTab idiomasConfigurados={idiomasConfigurados} toggleIdioma={toggleIdioma} announcementText={announcementText} setAnnouncementText={setAnnouncementText} announcementChannel={announcementChannel} setAnnouncementChannel={setAnnouncementChannel} saving={saving} handleSave={handleSave} />
          )}

          {activeTab === "moderation" && (
            <ModerationTab blockedWords={blockedWords} setBlockedWords={setBlockedWords} antiSpam={antiSpam} setAntiSpam={setAntiSpam} antiFlood={antiFlood} setAntiFlood={setAntiFlood} antiLink={antiLink} setAntiLink={setAntiLink} welcomeMessage={welcomeMessage} setWelcomeMessage={setWelcomeMessage} autoRole={autoRole} setAutoRole={setAutoRole} saving={saving} handleSave={handleSave} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
    
