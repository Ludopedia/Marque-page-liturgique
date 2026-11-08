import React from 'react';
import { BookmarkSlot } from '../types/lectionary';
import { BookmarkCard } from './BookmarkCard';

interface PrintSheetProps {
  slots: BookmarkSlot[];
  colorMode: 'liturgical' | 'monochrome';
  zoomLevel: number;
  onUpdateReading?: (date: string, field: 'firstReading' | 'secondReading' | 'gospel' | 'feast', value: string) => void;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({
  slots,
  colorMode,
  zoomLevel,
  onUpdateReading,
}) => {
  // Slots: exactly 8 bookmarks (indices 0 to 3 = row 1, indices 4 to 7 = row 2)
  const row1 = slots.slice(0, 4);
  const row2 = slots.slice(4, 8);

  return (
    <div className="flex justify-center items-center py-6 px-2 overflow-auto">
      {/* Visual wrapper for screen zoom */}
      <div
        className="transition-transform duration-200 origin-top"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* A4 Sheet Container: exactly 210mm x 297mm in print */}
        <div
          id="print-sheet-a4"
          className="print-page-sheet relative bg-white text-stone-900 shadow-2xl rounded-sm border border-stone-200 box-border"
          style={{
            width: '210mm',
            minHeight: '297mm',
            height: '297mm',
            padding: '6mm 6mm',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Subtle paper cut guideline notices visible on screen */}
          <div className="no-print absolute -top-5 left-2 right-2 flex justify-between items-center text-[10px] text-stone-400 font-sans">
            <span>Planche A4 (8 marque-pages : 4 colonnes × 2 rangées)</span>
            <span>Dimensions par marque-page : ~4,7 cm × 13,8 cm</span>
          </div>

          {/* ROW 1: 4 BOOKMARKS */}
          <div className="grid grid-cols-4 gap-[2.5mm] w-full justify-between items-stretch">
            {row1.map((slot, idx) => (
              <div key={slot.id || `row1-${idx}`} className="flex justify-center">
                <BookmarkCard
                  slot={slot}
                  colorMode={colorMode}
                  onUpdateReading={onUpdateReading}
                />
              </div>
            ))}
          </div>

          {/* HORIZONTAL CUT LINE WITH SCISSORS */}
          <div className="relative my-[1.5mm] flex items-center justify-center border-t border-dashed border-stone-300 w-full">
            <span className="absolute bg-white px-2 text-[9px] text-stone-400 font-mono tracking-widest select-none">
              ✂ - - - - LIGNE DE DÉCOUPE HORIZONTALE - - - - ✂
            </span>
          </div>

          {/* ROW 2: 4 BOOKMARKS */}
          <div className="grid grid-cols-4 gap-[2.5mm] w-full justify-between items-stretch">
            {row2.map((slot, idx) => (
              <div key={slot.id || `row2-${idx}`} className="flex justify-center">
                <BookmarkCard
                  slot={slot}
                  colorMode={colorMode}
                  onUpdateReading={onUpdateReading}
                />
              </div>
            ))}
          </div>

          {/* SHEET FOOTER NOTICE */}
          <div className="text-[6pt] text-stone-600 flex justify-between items-center px-1 pt-[1mm] border-t border-stone-200 select-none">
            <span>Marque-pages bibliques liturgiques (AELF) • Du lundi au samedi</span>
            <span>Conseil : imprimer sur papier épais (160g/m²) et découper aux ciseaux ou massicot</span>
          </div>
        </div>
      </div>
    </div>
  );
};
