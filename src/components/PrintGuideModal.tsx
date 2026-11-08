import React from 'react';
import { X, Printer, Scissors, Layers, Bookmark, Check } from 'lucide-react';

interface PrintGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintGuideModal: React.FC<PrintGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden text-stone-900 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#80182A]" />
            <h3 className="font-semibold text-stone-900 text-base">
              Conseils d'impression &amp; de confection
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-stone-700 leading-relaxed overflow-y-auto max-h-[70vh]">
          {/* Tip 1: Paper */}
          <div className="flex items-start gap-3 p-3 bg-amber-50/70 border border-amber-200/60 rounded-lg">
            <Layers className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-950 mb-0.5">1. Choix du papier</h4>
              <p>
                Pour que vos marque-pages restent bien droits dans votre Bible sans s'avachir ni se corner,
                privilégiez un papier légèrement épais : <strong>120g/m² à 160g/m²</strong> (ou papier Bristol).
              </p>
            </div>
          </div>

          {/* Tip 2: Print Settings */}
          <div className="flex items-start gap-3 p-3 bg-sky-50/70 border border-sky-200/60 rounded-lg">
            <Printer className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sky-950 mb-0.5">2. Réglages de la boîte d'impression</h4>
              <ul className="list-disc pl-4 space-y-1 text-stone-700 mt-1">
                <li>
                  <strong>Graphiques d'arrière-plan</strong> : Veillez à cocher cette case dans votre navigateur
                  pour conserver les élégants bandeaux bordeaux et bleu nuit.
                </li>
                <li>
                  <strong>Marges</strong> : Sélectionnez <em>« Aucune »</em> ou <em>« Par défaut »</em>.
                </li>
                <li>
                  <strong>Échelle</strong> : 100% ou <em>« Ajuster à la page »</em> pour garantir une seule feuille A4 sans déborder.
                </li>
              </ul>
            </div>
          </div>

          {/* Tip 3: Cutting */}
          <div className="flex items-start gap-3 p-3 bg-stone-100/70 border border-stone-200 rounded-lg">
            <Scissors className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-stone-950 mb-0.5">3. Découpe des 8 marque-pages</h4>
              <p>
                Découpez d'abord la page en deux selon la <strong>ligne horizontale médiane</strong> (repérée par les ciseaux ✂),
                puis séparez les 4 colonnes à l'aide d'une règle et d'un cutter (ou de bons ciseaux).
              </p>
            </div>
          </div>

          {/* Tip 4: Duplex trick */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-lg">
            <h4 className="font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              Astuce : Marque-pages Recto-Verso
            </h4>
            <p>
              Si vous collez dos-à-dos deux marque-pages (ex. <em>1re Lecture Novembre</em> avec <em>1re Lecture Décembre</em>),
              vous obtenez un marque-page rigide biface ! Il vous suffit de le retourner à la fin du mois.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#162B4D] hover:bg-[#0e1d35] rounded-lg transition-colors shadow-xs"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};
