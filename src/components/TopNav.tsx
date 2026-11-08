import React from 'react';
import { Printer } from 'lucide-react';

interface TopNavProps {
  onOpenMonthSelector: () => void;
  onOpenPrintGuide: () => void;
  onPrint: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenMonthSelector,
  onOpenPrintGuide,
  onPrint,
}) => {
  return (
    <header className="no-print bg-white border-b border-stone-200 sticky top-0 z-40 px-6 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in single text element display font */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-cinzel text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap">
            Marque-pages Liturgiques
          </span>
          <span className="hidden sm:inline-block text-[11px] font-sans font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-sm">
            8 / feuille A4
          </span>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Aperçu A4
          </button>
          <button
            onClick={onOpenMonthSelector}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Choisir les mois
          </button>
          <button
            onClick={onOpenPrintGuide}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Guide d'impression
          </button>
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#162B4D] hover:bg-[#0e1d35] rounded-lg transition-colors shadow-xs flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
