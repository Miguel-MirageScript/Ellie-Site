import { useState } from "react";
import {
  Crosshair, Swords, AlertTriangle, Save, Loader2, BookOpen, Map,
  MessageSquareWarning, Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// 📦 Importando nosso Sistema de Ajuda (Os textos e o Pop-up)
import { HelpModal } from "@/components/ui/HelpModal";
import { 
  CanalAnunciosHelp, CozHelp, WarBoardHelp, AlarmesHelp, AcademiaHelp 
} from "@/components/help/LssHelpContents";

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
    <div className="pr-4">
      <span className="font-display text-xs font-semibold tracking-wider text-foreground block">{label.toUpperCase()}</span>
      <span className="text-[11px] text-muted-foreground block mt-1 leading-relaxed">{desc}</span>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

// 👇 O Botão "?" de Ajuda que fica no canto superior direito
const HelpBtn = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="absolute top-4 right-4 h-6 w-6 flex items-center justify-center rounded bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all shadow-sm"
    title="Clique para saber mais"
  >
    <span className="font-display font-bold text-sm">?</span>
  </button>
);

interface LssTabProps {
  doomsdayTargets: string; setDoomsdayTargets: (v: string) => void;
  safeZone: string; setSafeZone: (v: string) => void;

  lssCanalAnuncios: string; setLssCanalAnuncios: (v: string) => void;
  cozAtivo: boolean; setCozAtivo: (v: boolean) => void;
  horaEmHoraAtivo: boolean; setHoraEmHoraAtivo: (v: boolean) => void;
  
  // 🗺️ Quadro de Guerra (Texto + Imagem)
  warBoardTexto: string; setWarBoardTexto: (v: string) => void;
  warBoardImagem: string; setWarBoardImagem: (v: string) => void;
  
  keAtivo: boolean; setKeAtivo: (v: boolean) => void;
  siegeAtivo: boolean; setSiegeAtivo: (v: boolean) => void;
  balrogHorario: string; setBalrogHorario: (v: string) => void;
  lssRegrasNovatos: string; setLssRegrasNovatos: (v: string) => void;

  saving: boolean;
  handleSave: () => void;
  
  // Mantidos como opcionais
  cozChestReminder?: boolean; setCozChestReminder?: (v: boolean) => void;
  killEventAlert?: boolean; setKillEventAlert?: (v: boolean) => void;
}

const LssTab = ({
  doomsdayTargets, setDoomsdayTargets,
  safeZone, setSafeZone,
  lssCanalAnuncios, setLssCanalAnuncios,
  cozAtivo, setCozAtivo,
  horaEmHoraAtivo, setHoraEmHoraAtivo,
  warBoardTexto, setWarBoardTexto,
  warBoardImagem, setWarBoardImagem,
  keAtivo, setKeAtivo,
  siegeAtivo, setSiegeAtivo,
  balrogHorario, setBalrogHorario,
  lssRegrasNovatos, setLssRegrasNovatos,
  saving, handleSave,
}: LssTabProps) => {

  // 🧠 Controlador de qual Janela de Ajuda está aberta
  const [activeHelp, setActiveHelp] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      
      {/* 🔮 GERENCIADOR DE MODAIS (Pop-ups de Ajuda) */}
      <HelpModal isOpen={activeHelp === "canal"} onClose={() => setActiveHelp(null)} title="ℹ️ Canal de Anúncios">
        <CanalAnunciosHelp />
      </HelpModal>
      <HelpModal isOpen={activeHelp === "coz"} onClose={() => setActiveHelp(null)} title="ℹ️ Radar CoZ">
        <CozHelp />
      </HelpModal>
      <HelpModal isOpen={activeHelp === "warboard"} onClose={() => setActiveHelp(null)} title="ℹ️ Quadro de Guerra">
        <WarBoardHelp />
      </HelpModal>
      <HelpModal isOpen={activeHelp === "alarmes"} onClose={() => setActiveHelp(null)} title="ℹ️ Alarmes e Eventos">
        <AlarmesHelp />
      </HelpModal>
      <HelpModal isOpen={activeHelp === "academia"} onClose={() => setActiveHelp(null)} title="ℹ️ Manual de Integração">
        <AcademiaHelp />
      </HelpModal>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Crosshair className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
            LAST SHELTER <span className="text-gradient-ember">INTELLIGENCE</span>
          </h2>
        </div>
      </div>

      {/* ==========================================
          0. CONFIGURAÇÃO DE COMUNICAÇÃO LSS
      ========================================== */}
      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6 border-l-4 border-l-primary/80">
        <HelpBtn onClick={() => setActiveHelp("canal")} />
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-4 flex items-center gap-2 pr-8">
          <MessageSquareWarning className="h-4 w-4 text-primary" />
          CANAL DE ANÚNCIOS DA ELLIE
        </h3>
        <div>
          <Label className="text-[11px] text-muted-foreground tracking-wider mb-2 block">
            ID DO CANAL DO DISCORD (Onde a Ellie vai mandar as dicas do CoZ, Alvos e Alertas)
          </Label>
          <Input
            placeholder="Ex: 123456789012345678"
            value={lssCanalAnuncios}
            onChange={(e) => setLssCanalAnuncios(e.target.value)}
            className="bg-muted/30 border-primary/20 text-foreground font-mono focus-visible:ring-primary/50 w-full sm:w-2/3"
          />
        </div>
      </div>

      {/* ==========================================
          1. PILAR 1: RADAR CLASH OF ZONES (COZ)
      ========================================== */}
      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <HelpBtn onClick={() => setActiveHelp("coz")} />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xs tracking-widest text-muted-foreground flex items-center gap-2 pr-8">
            <Swords className="h-4 w-4 text-primary" />
            RADAR CLASH OF ZONES (COZ) & DESAFIOS HORÁRIOS
          </h3>
        </div>
        
        <div className="space-y-4">
          <ToggleRow 
            label="Dicas Automáticas do CoZ" 
            desc="Às 00:00 (LSS Time), a Ellie anuncia o evento do dia com dicas avançadas." 
            checked={cozAtivo} 
            onChange={setCozAtivo} 
          />
          <ToggleRow 
            label="Radar de Hora em Hora (Fase Sequencial)" 
            desc="Alerta o chat 20 minutos antes de um evento chave para ativar bônus no tempo exato." 
            checked={horaEmHoraAtivo} 
            onChange={setHoraEmHoraAtivo} 
          />
        </div>
      </div>

      {/* ==========================================
          2. PILAR 2: TÁTICAS DOOMSDAY / EDEN
      ========================================== */}
      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <HelpBtn onClick={() => setActiveHelp("warboard")} />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xs tracking-widest text-muted-foreground flex items-center gap-2 pr-8">
            <Map className="h-4 w-4 text-primary" />
            QUADRO DE GUERRA (WAR BOARD - DOOMSDAY)
          </h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">
              ORDENS DO COMANDO (Alvos, Ladrilhos e Honra)
            </Label>
            <textarea
              value={warBoardTexto}
              onChange={(e) => setWarBoardTexto(e.target.value)}
              placeholder="Ex: AC3 inimigo (X: 1200, Y: 450) às 20:00 UTC. Proibido atacar tiles da aliança [XYZ]..."
              className="flex min-h-[120px] w-full rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            />
          </div>
          
          {/* 👇 CAIXA: LINK DA IMAGEM DO MAPA */}
          <div className="pt-2 border-t border-border/20">
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-primary" />
              LINK DO MAPA TÁTICO (Opcional)
            </Label>
            <p className="text-[10px] text-muted-foreground mb-2">
              Cole o link de uma imagem (JPG, PNG, GIF) para a Ellie exibir um mapa gigante no Discord.
            </p>
            <Input
              placeholder="Ex: https://i.imgur.com/mapa-doomsday.png"
              value={warBoardImagem}
              onChange={(e) => setWarBoardImagem(e.target.value)}
              className="bg-muted/30 border-border/60 text-foreground w-full font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* ==========================================
          3. PILAR 3: SISTEMA DE ALARME GLOBAL
      ========================================== */}
      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <HelpBtn onClick={() => setActiveHelp("alarmes")} />
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2 pr-8">
          <AlertTriangle className="h-4 w-4 text-primary" />
          SISTEMA DE ALARMES & EVENTOS
        </h3>
        
        <div className="space-y-4">
          <ToggleRow 
            label="Sirene: Kill Event (KE)" 
            desc="Emite um alerta vermelho piscando horas antes do KE para todos levantarem escudos." 
            checked={keAtivo} 
            onChange={setKeAtivo} 
          />
          <ToggleRow 
            label="Sirene: Cerco Zumbi (Zombie Siege)" 
            desc="Alerta os membros para recolherem tropas para defenderem a base da aliança." 
            checked={siegeAtivo} 
            onChange={setSiegeAtivo} 
          />
          
          <div className="pt-2 border-t border-border/20">
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">
              AGENDAR DESPERTAR DO BALROG (UTC)
            </Label>
            <Input
              placeholder="Ex: Sexta-feira às 18:30 UTC"
              value={balrogHorario}
              onChange={(e) => setBalrogHorario(e.target.value)}
              className="bg-muted/30 border-border/60 text-foreground w-full sm:w-1/2"
            />
          </div>
        </div>
      </div>

      {/* ==========================================
          4. PILAR 4: ACADEMIA LSS (SAFE ZONE)
      ========================================== */}
      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <HelpBtn onClick={() => setActiveHelp("academia")} />
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2 pr-8">
          <BookOpen className="h-4 w-4 text-primary" />
          MANUAL DE INTEGRAÇÃO DE NOVATOS
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">
              COORDENADAS DA SAFE ZONE (Colmeia)
            </Label>
            <Input
              placeholder="Ex: Estado #999 (X: 500, Y: 500) perto do AC1"
              value={safeZone}
              onChange={(e) => setSafeZone(e.target.value)}
              className="bg-muted/30 border-border/60 text-foreground w-full sm:w-2/3"
            />
          </div>

          <div>
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">
              REGRAS GERAIS & NAP (Alianças Aliadas)
            </Label>
            <textarea
              value={lssRegrasNovatos}
              onChange={(e) => setLssRegrasNovatos(e.target.value)}
              placeholder="Digite as alianças do NAP e as regras que todo novato deve saber..."
              className="flex min-h-[100px] w-full rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 w-full sm:w-auto"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? "TRANSMITINDO ORDENS..." : "SALVAR TÁTICAS"}
      </Button>
    </div>
  );
};

export default LssTab;
