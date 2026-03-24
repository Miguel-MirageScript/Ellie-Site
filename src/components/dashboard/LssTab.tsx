import {
  Crosshair, Swords, AlertTriangle, Clock,
  Skull, Target, Timer, Save, Loader2, BookOpen, Map,
  MessageSquareWarning, ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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

interface LssTabProps {
  // Antigos (Mantidos para não quebrar compatibilidade)
  cozChestReminder: boolean; setCozChestReminder: (v: boolean) => void;
  killEventAlert: boolean; setKillEventAlert: (v: boolean) => void;
  doomsdayTargets: string; setDoomsdayTargets: (v: string) => void;
  safeZone: string; setSafeZone: (v: string) => void;

  // ⚔️ Novos: Pilares da Inteligência
  lssCanalAnuncios: string; setLssCanalAnuncios: (v: string) => void;
  cozAtivo: boolean; setCozAtivo: (v: boolean) => void;
  horaEmHoraAtivo: boolean; setHoraEmHoraAtivo: (v: boolean) => void;
  warBoardTexto: string; setWarBoardTexto: (v: string) => void;
  keAtivo: boolean; setKeAtivo: (v: boolean) => void;
  siegeAtivo: boolean; setSiegeAtivo: (v: boolean) => void;
  balrogHorario: string; setBalrogHorario: (v: string) => void;
  lssRegrasNovatos: string; setLssRegrasNovatos: (v: string) => void;

  saving: boolean;
  handleSave: () => void;
}

const LssTab = ({
  // Antigos
  cozChestReminder, setCozChestReminder,
  doomsdayTargets, setDoomsdayTargets,
  safeZone, setSafeZone,
  
  // Novos
  lssCanalAnuncios, setLssCanalAnuncios,
  cozAtivo, setCozAtivo,
  horaEmHoraAtivo, setHoraEmHoraAtivo,
  warBoardTexto, setWarBoardTexto,
  keAtivo, setKeAtivo,
  siegeAtivo, setSiegeAtivo,
  balrogHorario, setBalrogHorario,
  lssRegrasNovatos, setLssRegrasNovatos,

  saving, handleSave,
}: LssTabProps) => (
  <div className="space-y-6">
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
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6 border-l-4 border-l-primary/80">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
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
          className="bg-muted/30 border-primary/20 text-foreground font-mono focus-visible:ring-primary/50"
        />
      </div>
    </div>

    {/* ==========================================
        1. PILAR 1: RADAR CLASH OF ZONES (COZ)
    ========================================== */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <Swords className="h-4 w-4 text-primary" />
        RADAR CLASH OF ZONES (COZ) & DESAFIOS HORÁRIOS
      </h3>
      
      <div className="space-y-4">
        <ToggleRow 
          label="Dicas Automáticas do CoZ" 
          desc="Às 00:00 (LSS Time), a Ellie anuncia o evento do dia com dicas avançadas (Ex: Ticket 100% + Medalhas de Sabedoria)." 
          checked={cozAtivo} 
          onChange={setCozAtivo} 
        />
        <ToggleRow 
          label="Radar de Hora em Hora (Fase Sequencial)" 
          desc="Alerta o chat 20 minutos antes de um evento chave para os membros ativarem os bônus no tempo exato." 
          checked={horaEmHoraAtivo} 
          onChange={setHoraEmHoraAtivo} 
        />
        <ToggleRow 
          label="Lembrete de Baú (R4/R5)" 
          desc="Habilita avisos manuais quando os baús globais da aliança forem abertos." 
          checked={cozChestReminder} 
          onChange={setCozChestReminder} 
        />
      </div>
    </div>

    {/* ==========================================
        2. PILAR 2: TÁTICAS DOOMSDAY / EDEN
    ========================================== */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <Map className="h-4 w-4 text-primary" />
        QUADRO DE GUERRA (WAR BOARD - DOOMSDAY)
      </h3>
      
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
          <p className="text-[10px] text-muted-foreground mt-2 font-mono">
            * A Ellie fará um anúncio tático marcando os membros sempre que isso for alterado.
          </p>
        </div>
        
        {/* Antigo campo, mantido caso queira usar como "Alvo Rápido" */}
        <div>
          <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">ALVOS RÁPIDOS (Opcional)</Label>
          <Input
            value={doomsdayTargets}
            onChange={(e) => setDoomsdayTargets(e.target.value)}
            className="bg-muted/30 border-border/60 text-foreground"
          />
        </div>
      </div>
    </div>

    {/* ==========================================
        3. PILAR 3: SISTEMA DE ALARME GLOBAL
    ========================================== */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
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
            className="bg-muted/30 border-border/60 text-foreground"
          />
        </div>
      </div>
    </div>

    {/* ==========================================
        4. PILAR 4: ACADEMIA LSS (SAFE ZONE)
    ========================================== */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
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
            className="bg-muted/30 border-border/60 text-foreground"
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

    {/* Botão de Salvar Global */}
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

export default LssTab;
          
