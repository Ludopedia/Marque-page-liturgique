import React from 'react';
import { Calendar, ZoomIn, ZoomOut, RotateCcw, Palette, HelpCircle, FileText } from 'lucide-react';

interface ToolbarProps {
  currentMonths: string[];
  colorMode: 'liturgical' | 'monochrome';
  onChangeColorMode: (mode: 'liturgical' | 'monochrome') => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onOpenMonthSelector: () => void;
  onOpenPrintGuide: () => void;
  onResetReadings: () => void;
  isCustomized: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentMonths,
  colorMode,
  onChangeColorMode,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onOpenMonthSelector,
  onOpenPrintGuide,
  onResetReadings,
  isCustomized,
}) => {
  return (
    <div className="no-print bg-stone-100/90 border-b border-stone-200 py-2.5 px-4 sticky top-[57px] z-30 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Month selection summary */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenMonthSelector}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-md font-medium text-stone-800 hover:bg-stone-50 hover:border-stone-400 transition-colors shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#80182A]" />
            <span>Mois sélectionnés :</span>
            <span className="font-semibold text-stone-900">
              {currentMonths.map((m) => m.replace('2026-', '').replace('2027-', '')).join(' · ')}
            </span>
            <span className="text-stone-400 text-[10px] ml-1">(Modifier)</span>
          </button>

          {isCustomized && (
            <button
              onClick={onResetReadings}
              title="Restaurer les références d'origine du lectionnaire"
              className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 px-2 py-1 rounded-sm hover:bg-stone-200/50 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Rétablir valeurs d'origine</span>
            </button>
          )}
        </div>

        {/* Center: Style and Color toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 bg-stone-200/80 rounded-md">
            <button
              onClick={() => onChangeColorMode('liturgical')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-sm transition-all ${
                colorMode === 'liturgical'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#80182A]"></span>
              <span>Liturgique</span>
            </button>
            <button
              onClick={() => onChangeColorMode('monochrome')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-sm transition-all ${
                colorMode === 'monochrome'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-stone-800"></span>
              <span>Noir &amp; Blanc</span>
            </button>
          </div>
        </div>

        {/* Right: Zoom controls and Help */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-stone-300 rounded-md px-1.5 py-0.5 shadow-2xs">
            <button
              onClick={onZoomOut}
              disabled={zoomLevel <= 0.55}
              title="Zoom arrière"
              className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-40"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetZoom}
              title="Réinitialiser zoom"
              className="text-[11px] font-semibold text-stone-700 hover:text-stone-950 px-1 tabular-nums"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={onZoomIn}
              disabled={zoomLevel >= 1.4}
              title="Zoom avant"
              className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-40"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onOpenPrintGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 text-stone-600 hover:text-stone-900 bg-white border border-stone-300 hover:border-stone-400 rounded-md transition-colors shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-[11px] font-medium">Conseils</span>
          </button>
        </div>
      </div>
    </div>
  );
};
