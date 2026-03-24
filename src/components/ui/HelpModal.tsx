import { X } from "lucide-react";
import { ReactNode } from "react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const HelpModal = ({ isOpen, onClose, title, children }: HelpModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="card-apocalyptic bg-background border border-primary/30 shadow-[0_0_30px_rgba(255,100,0,0.15)] w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/20">
          <h3 className="font-display text-sm font-bold tracking-wider text-primary">
            {title.toUpperCase()}
          </h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Conteúdo do Modal (Scrollável se for texto grande) */}
        <div className="p-5 overflow-y-auto flex-1 text-sm text-foreground/80 leading-relaxed space-y-4 font-sans">
          {children}
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-border/40 bg-muted/10 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-display tracking-wider bg-muted hover:bg-muted-foreground/20 text-foreground rounded border border-border/50 transition-colors"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};

