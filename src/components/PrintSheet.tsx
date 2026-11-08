import React from 'react';
import { BookmarkSlot } from '../types/lectionary';
import { BookmarkCard } from './BookmarkCard';

interface PrintSheetProps {
  slots: BookmarkSlot[];
  colorMode: 'liturgical' | 'monochrome';
  zoomLevel: number;
  onUpdateReading?: (
    date: string,
    field: 'firstReading' | 'secondReading' | 'gospel' | 'feast',
    value: string
  ) => void;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({
  slots,
  colorMode,
  zoomLevel,
  onUpdateReading,
}) => {
  const row1 = slots.slice(0, 4);
  const row2 = slots.slice(4, 8);

  return (
    <div className="print-outer-wrapper flex justify-center items-center py-6 px-2 overflow-auto">
      {/* Visual wrapper for screen zoom (disabled in @media print) */}
      <div
        className="print-zoom-wrapper transition-transform duration-200 origin-top"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* A4 Sheet Container: 210mm x 297mm */}
        <div
          id="print-sheet-a4"
          className="print-page-sheet relative bg-white text-stone-900 shadow-2xl rounded-xs border border-stone-200 box-border flex flex-col justify-between"
          style={{
            width: '210mm',
            minHeight: '297mm',
            height: '297mm',
            padding: '2.5mm',
          }}
        >
          {/* Screen-only dimensions hint */}
          <div className="no-print absolute -top-5 left-1 right-1 flex justify-between items-center text-[10px] text-stone-500 font-sans">
            <span>Feuille A4 (210 × 297 mm) • 8 marque-pages plein format</span>
            <span>Format unitaire : 5,1 cm × 14,5 cm</span>
          </div>

          {/* ROW 1: 4 BOOKMARKS */}
          <div className="grid grid-cols-4 gap-[0.3mm] w-full justify-between items-stretch">
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

          {/* HORIZONTAL CUT LINE */}
          <div className="relative flex items-center justify-center border-t border-dashed border-stone-300 w-full my-0">
            <span className="no-print absolute bg-white px-2 text-[8px] text-stone-400 font-mono tracking-widest select-none">
              ✂ - - - DÉCOUPE HORIZONTALE - - - ✂
            </span>
          </div>

          {/* ROW 2: 4 BOOKMARKS */}
          <div className="grid grid-cols-4 gap-[0.3mm] w-full justify-between items-stretch">
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
        </div>
      </div>
    </div>
  );
};
