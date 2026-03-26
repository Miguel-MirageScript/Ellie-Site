import { useState } from "react";
import {
  Crosshair, Swords, AlertTriangle, Save, Loader2, BookOpen, Map,
  MessageSquareWarning, Link as LinkIcon, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { HelpModal } from "@/components/ui/HelpModal";
import { 
  CanalAnunciosHelp, CozHelp, WarBoardHelp, AlarmesHelp, AcademiaHelp 
} from "@/components/help/LssHelpContents";

const ToggleRow = ({
  label, desc, checked, onChange,
}: {
  label: string; desc: string; checked: boolean; onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/10 px-4 py-3">
    <div className="pr-4">
      <span className="font-display text-xs font-semibold tracking-wider text-foreground block">{label.toUpperCase()}</span>
      <span className="text-[11px] text-muted-foreground block mt-1 leading-relaxed">{desc}</span>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

const HelpBtn = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="absolute top-4 right-4 h-6 w-6 flex items-center justify-center rounded bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all shadow-sm"
    title="Clique para saber mais"
  >
    <span className="font-display font-bold text-sm">?</span>
  </button>
);

const ChannelInput = ({ value, onChange, placeholder = "Ex: 123456789012345678" }: { value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="mt-4 pt-3 border-t border-border/20">
    <Label className="text-[10px] text-primary/80 font-display tracking-widest mb-1.5 flex items-center gap-1.5 uppercase">
      <MessageSquareWarning className="h-3 w-3" />
      ID do Canal de Anúncios
    </Label>
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background/40 border-border/40 text-foreground font-mono text-xs w-full sm:w-2/3 h-8"
    />
  </div>
);

interface LssTabProps {
  doomsdayTargets: string; setDoomsdayTargets: (v: string) => void;
  safeZone: string; setSafeZone: (v: string) => void;

  canalWarBoard: string; setCanalWarBoard: (v: string) => void;
  canalCoz: string; setCanalCoz: (v: string) => void;
  canalHoraEmHora: string; setCanalHoraEmHora: (v: string) => void;
  canalKe: string; setCanalKe: (v: string) => void;
  canalSiege: string; setCanalSiege: (v: string) => void;
  canalBalrog: string; setCanalBalrog: (v: string) => void;
  canalAcademia: string; setCanalAcademia: (v: string) => void; // 👈 NOVO

  cozAtivo: boolean; setCozAtivo: (v: boolean) => void;
  horaEmHoraAtivo: boolean; setHoraEmHoraAtivo: (v: boolean) => void;
  
  warBoardTexto: string; setWarBoardTexto: (v: string) => void;
  warBoardImagem: string; setWarBoardImagem: (v: string) => void;
  
  keAtivo: boolean; setKeAtivo: (v: boolean) => void;
  siegeAtivo: boolean; setSiegeAtivo: (v: boolean) => void;
  balrogHorario: string; setBalrogHorario: (v: string) => void;
  lssRegrasNovatos: string; setLssRegrasNovatos: (v: string) => void;

  saving: boolean;
  handleSave: () => void;
  uploadingImage?: boolean;
  handleImageUpload?: (file: File) => void;
}

const LssTab = ({
  doomsdayTargets, setDoomsdayTargets, safeZone, setSafeZone,
  canalWarBoard, setCanalWarBoard, canalCoz, setCanalCoz,
  canalHoraEmHora, setCanalHoraEmHora, canalKe, setCanalKe,
  canalSiege, setCanalSiege, canalBalrog, setCanalBalrog,
  canalAcademia, setCanalAcademia,
  cozAtivo, setCozAtivo, horaEmHoraAtivo, setHoraEmHoraAtivo,
  warBoardTexto, setWarBoardTexto, warBoardImagem, setWarBoardImagem,
  keAtivo, setKeAtivo, siegeAtivo, setSiegeAtivo,
  balrogHorario, setBalrogHorario, lssRegrasNovatos, setLssRegrasNovatos,
  saving, handleSave, uploadingImage = false, handleImageUpload,
}: LssTabProps) => {

  const [activeHelp, setActiveHelp] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (handleImageUpload) handleImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <HelpModal isOpen={activeHelp === "canal"} onClose={() => setActiveHelp(null)} title="ℹ️ Canal de Anúncios"><CanalAnunciosHelp /></HelpModal>
      <HelpModal isOpen={activeHelp === "coz"} onClose={() => setActiveHelp(null)} title="ℹ️ Radar CoZ"><CozHelp /></HelpModal>
      <HelpModal isOpen={activeHelp === "warboard"} onClose={() => setActiveHelp(null)} title="ℹ️ Quadro de Guerra"><WarBoardHelp /></HelpModal>
      <HelpModal isOpen={activeHelp === "alarmes"} onClose={() => setActiveHelp(null)} title="ℹ️ Alarmes e Eventos"><AlarmesHelp /></HelpModal>
      <HelpModal isOpen={activeHelp === "academia"} onClose={() => setActiveHelp(null)} title="ℹ️ Manual de Integração"><AcademiaHelp /></HelpModal>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Crosshair className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
            LAST SHELTER <span className="text-gradient-ember">INTELLIGENCE</span>
          </h2>
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground bg-primary/5 border border-primary/20 rounded p-3 mb-4">
        <strong className="text-primary font-display tracking-widest block mb-1">DICA TÁTICA:</strong>
        Pode usar IDs de canais diferentes para cada função. Caso prefira concentrar tudo num único canal, basta colar o mesmo ID em todas as caixas.
      </div>

      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <HelpBtn onClick={() => setActiveHelp("coz")} />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xs tracking-widest text-muted-foreground flex items-center gap-2 pr-8">
            <Swords className="h-4 w-4 text-primary" />
            RADAR CLASH OF ZONES (COZ) & DESAFIOS HORÁRIOS
          </h3>
        </div>
        <div className="space-y-4">
          <div className="bg-muted/5 p-4 rounded-lg border border-border/20">
            <ToggleRow label="Dicas Automáticas do CoZ" desc="Às 00:00 (LSS Time), a Ellie anuncia o evento do dia com dicas avançadas." checked={cozAtivo} onChange={setCozAtivo} />
            {cozAtivo && <ChannelInput value={canalCoz} onChange={setCanalCoz} placeholder="ID do canal de dicas do CoZ" />}
          </div>
          <div className="bg-muted/5 p-4 rounded-lg border border-border/20">
            <ToggleRow label="Radar de Hora em Hora (Fase Sequencial)" desc="Alerta o chat 20 minutos antes de um evento chave para ativar bônus no tempo exato." checked={horaEmHoraAtivo} onChange={setHoraEmHoraAtivo} />
            {horaEmHoraAtivo && <ChannelInput value={canalHoraEmHora} onChange={setCanalHoraEmHora} placeholder="ID do canal de alertas horários" />}
          </div>
        </div>
      </div>

      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <HelpBtn onClick={() => setActiveHelp("warboard")} />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xs tracking-widest text-muted-foreground flex items-center gap-2 pr-8">
            <Map className="h-4 w-4 text-primary" />
            QUADRO DE GUERRA (WAR BOARD)
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">ORDENS DO COMANDO (Alvos, Ladrilhos e Honra)</Label>
            <textarea value={warBoardTexto} onChange={(e) => setWarBoardTexto(e.target.value)} placeholder="Ex: AC3 inimigo (X: 1200, Y: 450) às 20:00 UTC..." className="flex min-h-[120px] w-full rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" />
          </div>
          <div className="pt-2 border-t border-border/20">
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 flex items-center gap-1.5"><LinkIcon className="h-3.5 w-3.5 text-primary" />ANEXAR IMAGEM (Opcional)</Label>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <Label className="cursor-pointer shrink-0">
                <div className={`flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border/50 rounded text-xs font-display tracking-wider transition-colors ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Upload className="h-4 w-4 text-primary" />}
                  {uploadingImage ? 'ENVIANDO...' : 'ENVIAR IMAGEM'}
                </div>
                <input type="file" accept="image/png, image/jpeg, image/gif" className="hidden" onChange={onFileChange} disabled={uploadingImage} />
              </Label>
              <span className="text-[10px] text-muted-foreground font-mono">OU</span>
              <Input placeholder="COLE AQUI O LINK DA SUA IMAGEM" value={warBoardImagem} onChange={(e) => setWarBoardImagem(e.target.value)} className="bg-muted/30 border-border/60 text-foreground w-full font-mono text-[11px]" />
            </div>
            {warBoardImagem && (
              <div className="mt-3 relative inline-block"><img src={warBoardImagem} alt="Preview" className="h-24 w-auto rounded border border-primary/30 object-contain bg-black/50" onError={(e) => (e.currentTarget.style.display = 'none')} /></div>
            )}
          </div>
          <ChannelInput value={canalWarBoard} onChange={setCanalWarBoard} placeholder="ID do canal do Quadro de Guerra" />
        </div>
      </div>

      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <HelpBtn onClick={() => setActiveHelp("alarmes")} />
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2 pr-8">
          <AlertTriangle className="h-4 w-4 text-primary" />
          SISTEMA DE ALARMES & EVENTOS
        </h3>
        <div className="space-y-4">
          <div className="bg-muted/5 p-4 rounded-lg border border-border/20">
            <ToggleRow label="Sirene: Kill Event (KE)" desc="Emite alerta piscando horas antes do KE." checked={keAtivo} onChange={setKeAtivo} />
            {keAtivo && <ChannelInput value={canalKe} onChange={setCanalKe} placeholder="ID do canal de alertas KE" />}
          </div>
          <div className="bg-muted/5 p-4 rounded-lg border border-border/20">
            <ToggleRow label="Sirene: Cerco Zumbi (Zombie Siege)" desc="Alerta os membros para defenderem a base." checked={siegeAtivo} onChange={setSiegeAtivo} />
            {siegeAtivo && <ChannelInput value={canalSiege} onChange={setCanalSiege} placeholder="ID do canal de alertas de Cerco" />}
          </div>
          <div className="bg-muted/5 p-4 rounded-lg border border-border/20">
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">AGENDAR DESPERTAR DO BALROG (UTC)</Label>
            <Input placeholder="Ex: Sexta-feira às 18:30 UTC" value={balrogHorario} onChange={(e) => setBalrogHorario(e.target.value)} className="bg-muted/30 border-border/60 text-foreground w-full sm:w-1/2" />
            <ChannelInput value={canalBalrog} onChange={setCanalBalrog} placeholder="ID do canal do Balrog" />
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
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">COORDENADAS DA SAFE ZONE (Colmeia)</Label>
            <Input placeholder="Ex: Estado #999 (X: 500, Y: 500) perto do AC1" value={safeZone} onChange={(e) => setSafeZone(e.target.value)} className="bg-muted/30 border-border/60 text-foreground w-full sm:w-2/3" />
          </div>
          <div>
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">REGRAS GERAIS & NAP (Alianças Aliadas)</Label>
            <textarea value={lssRegrasNovatos} onChange={(e) => setLssRegrasNovatos(e.target.value)} placeholder="Digite as alianças do NAP..." className="flex min-h-[100px] w-full rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" />
          </div>
          
          {/* 👇 CAIXA DE ID PARA O MANUAL DE NOVATOS */}
          <ChannelInput value={canalAcademia} onChange={setCanalAcademia} placeholder="ID do canal de Regras/Academia" />
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
          
