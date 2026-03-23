import {
  Globe, Flag, Megaphone, Hash, Send, Save, Loader2, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// 🌍 Dicionário Mestre de Idiomas da Ellie
export const AVAILABLE_LANGUAGES = [
  { id: "pt", name: "Português", emoji: "🇧🇷" },
  { id: "en", name: "English", emoji: "🇺🇸" },
  { id: "es", name: "Español", emoji: "🇪🇸" },
  { id: "ru", name: "Русский", emoji: "🇷🇺" },
  { id: "zh", name: "Chinês", emoji: "🇨🇳" },
  { id: "ko", name: "Coreano", emoji: "🇰🇷" },
  { id: "ja", name: "Japonês", emoji: "🇯🇵" },
  { id: "fr", name: "Francês", emoji: "🇫🇷" },
  { id: "de", name: "Alemão", emoji: "🇩🇪" },
  { id: "it", name: "Italiano", emoji: "🇮🇹" },
  { id: "tr", name: "Turco", emoji: "🇹🇷" },
  { id: "ar", name: "Árabe", emoji: "🇸🇦" },
  { id: "id", name: "Indonésio", emoji: "🇮🇩" },
  { id: "nl", name: "Holandês", emoji: "🇳🇱" },
  { id: "pl", name: "Polonês", emoji: "🇵🇱" },
  { id: "sv", name: "Sueco", emoji: "🇸🇪" },
  { id: "th", name: "Tailandês", emoji: "🇹🇭" },
  { id: "vi", name: "Vietnamita", emoji: "🇻🇳" },
  { id: "uk", name: "Ucraniano", emoji: "🇺🇦" },
  { id: "el", name: "Grego", emoji: "🇬🇷" }
];

const channels = [
  { id: "general", name: "#geral" },
  { id: "announcements", name: "#anúncios" },
  { id: "alliance", name: "#aliança" },
  { id: "war-room", name: "#sala-de-guerra" },
];

interface CommunicationTabProps {
  idiomasConfigurados: string[];
  toggleIdioma: (id: string) => void;
  announcementText: string;
  setAnnouncementText: (v: string) => void;
  announcementChannel: string;
  setAnnouncementChannel: (v: string) => void;
  saving: boolean;
  handleSave: () => void;
}

const CommunicationTab = ({
  idiomasConfigurados, toggleIdioma,
  announcementText, setAnnouncementText,
  announcementChannel, setAnnouncementChannel,
  saving, handleSave,
}: CommunicationTabProps) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-2">
      <Globe className="h-5 w-5 text-primary" />
      <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
        COMUNICAÇÃO <span className="text-gradient-ember">GLOBAL</span>
      </h2>
    </div>

    {/* Central de Idiomas da Aliança */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
        <div>
          <h3 className="font-display text-xs tracking-widest text-muted-foreground flex items-center gap-2">
            <Flag className="h-3.5 w-3.5 text-primary" />
            CENTRAL DE IDIOMAS DA ALIANÇA
          </h3>
          <p className="text-xs text-muted-foreground mt-2">
            Ative um idioma abaixo. A Ellie irá criar o cargo no Discord e habilitar a tradução por reação automaticamente.
          </p>
        </div>
        <div className="text-left sm:text-right bg-muted/20 px-4 py-2 rounded-md border border-border/40">
          <span className="text-2xl font-bold text-primary font-display">{idiomasConfigurados.length}</span>
          <span className="text-[10px] text-muted-foreground block tracking-wider mt-0.5">ATIVOS</span>
        </div>
      </div>
      
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {AVAILABLE_LANGUAGES.map((lang) => {
          const isActive = idiomasConfigurados.includes(lang.id);
          return (
            <button
              key={lang.id}
              onClick={() => toggleIdioma(lang.id)}
              className={`relative flex flex-col items-center justify-center rounded-lg border p-4 transition-all duration-200 ${
                isActive
                  ? "border-primary/40 bg-primary/10 shadow-[0_0_15px_hsl(30_95%_50%_/_0.15)] scale-[1.02]"
                  : "border-border/40 bg-muted/10 opacity-60 hover:opacity-100 hover:border-border/80"
              }`}
            >
              {isActive && (
                <div className="absolute top-2 right-2">
                  <Check className="h-3 w-3 text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
              )}
              <span className="text-3xl block mb-2">{lang.emoji}</span>
              <span className="text-[11px] font-display tracking-wider text-foreground">{lang.name.toUpperCase()}</span>
              <span className={`block text-[9px] font-mono mt-1.5 ${isActive ? "text-green-500" : "text-muted-foreground"}`}>
                {isActive ? "INSTALADO" : "DESATIVADO"}
              </span>
            </button>
          );
        })}
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
          className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 w-full sm:w-auto"
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
      className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 w-full sm:w-auto"
    >
      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {saving ? "SALVANDO..." : "SALVAR CONFIGURAÇÕES"}
    </Button>
  </div>
);

export default CommunicationTab;
            
