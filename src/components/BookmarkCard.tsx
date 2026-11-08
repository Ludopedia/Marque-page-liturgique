import React from 'react';
import { BookmarkSlot } from '../types/lectionary';
import { BookOpen, Cross } from 'lucide-react';

interface BookmarkCardProps {
  slot: BookmarkSlot;
  colorMode: 'liturgical' | 'monochrome';
  isCompact?: boolean;
  onUpdateReading?: (date: string, field: 'firstReading' | 'secondReading' | 'gospel' | 'feast', value: string) => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  slot,
  colorMode,
  onUpdateReading,
}) => {
  const { monthData, type } = slot;
  const isGospel = type === 'gospel';

  // Liturgical color classes
  const headerBgClass =
    colorMode === 'monochrome'
      ? isGospel
        ? 'bg-neutral-800 text-white'
        : 'bg-neutral-700 text-white'
      : isGospel
      ? 'bg-[#162B4D] text-white' // Deep midnight navy
      : 'bg-[#80182A] text-white'; // Deep liturgical burgundy

  const accentTagClass =
    colorMode === 'monochrome'
      ? 'bg-neutral-200 text-neutral-800'
      : isGospel
      ? 'bg-sky-100 text-[#162B4D]'
      : 'bg-rose-100 text-[#80182A]';

  return (
    <div className="bookmark-card relative flex flex-col justify-between bg-white text-stone-900 border border-dashed border-stone-300 p-[2.5mm] box-border overflow-hidden select-text text-[7pt] leading-[1.22] h-[138mm] w-[46.5mm] max-h-[138mm] max-w-[46.5mm]">
      {/* Mini scissors indicator on top left corner */}
      <span className="absolute -top-[1px] left-1 text-[7px] text-stone-400 select-none no-print">
        ✂
      </span>

      {/* TOP HEADER */}
      <div>
        <div className={`rounded-sm py-[1.8mm] px-[1mm] text-center mb-[1.5mm] shadow-xs ${headerBgClass}`}>
          <div className="flex items-center justify-center gap-1 font-cinzel text-[7.5pt] font-bold tracking-wider uppercase">
            {isGospel ? (
              <>
                <Cross className="w-2.5 h-2.5 shrink-0 opacity-90" />
                <span>Évangile</span>
              </>
            ) : (
              <>
                <BookOpen className="w-2.5 h-2.5 shrink-0 opacity-90" />
                <span>1re Lecture</span>
              </>
            )}
          </div>
          <div className="text-[6.5pt] tracking-widest opacity-95 font-medium mt-[0.5px]">
            {monthData.monthLabel}
          </div>
        </div>

        {/* LIST OF WEEKS AND DAYS */}
        <div className="flex flex-col gap-[1.2mm]">
          {monthData.weeks.map((week, wIdx) => (
            <div key={week.id || wIdx} className="week-section">
              {/* Subtle week title / separator */}
              <div className="text-[5.5pt] font-semibold text-stone-600 uppercase tracking-tight flex items-center justify-between pb-[0.4mm] mb-[0.4mm] border-b border-stone-200/80">
                <span className="truncate max-w-[32mm]">{week.weekTitle || `Semaine ${wIdx + 1}`}</span>
              </div>

              {/* Weekdays (Lun -> Sam) */}
              <div className="flex flex-col gap-[0.25mm]">
                {week.days.map((day) => {
                  const primaryRef = isGospel ? day.gospel : day.firstReading;

                  return (
                    <div
                      key={day.id}
                      className="day-line flex items-start gap-[1.2mm] py-[0.2mm] hover:bg-stone-50 transition-colors rounded-xs group"
                    >
                      {/* Day Label (e.g. Lun 2) */}
                      <span className="font-bold text-[6.8pt] text-stone-800 w-[7.8mm] shrink-0 tracking-tight tabular-nums">
                        {day.dayLabel}
                      </span>

                      {/* Reference and Feast Tag */}
                      <div className="flex-1 min-w-0 leading-[1.18]">
                        <span
                          className="font-medium text-stone-900 text-[6.8pt] cursor-text outline-none focus:bg-amber-50 focus:ring-1 focus:ring-amber-300 rounded-xs"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newText = e.currentTarget.textContent || '';
                            if (onUpdateReading) {
                              onUpdateReading(
                                day.date,
                                isGospel ? 'gospel' : 'firstReading',
                                newText
                              );
                            }
                          }}
                        >
                          {primaryRef}
                        </span>

                        {/* Optional 2nd reading for Solemnities on weekday */}
                        {!isGospel && day.secondReading && (
                          <div className="mt-[0.2mm] flex items-center gap-[0.6mm]">
                            <span className={`text-[5pt] font-bold px-[1px] rounded-[1px] ${accentTagClass}`}>
                              2e
                            </span>
                            <span
                              className="text-[6pt] text-stone-700 cursor-text outline-none focus:bg-amber-50 rounded-xs"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const newText = e.currentTarget.textContent || '';
                                if (onUpdateReading) {
                                  onUpdateReading(day.date, 'secondReading', newText);
                                }
                              }}
                            >
                              {day.secondReading}
                            </span>
                          </div>
                        )}

                        {/* Feast indication (S. Martin, Défunts, etc.) */}
                        {day.feast && (
                          <div
                            className="text-[5.4pt] italic text-stone-700 truncate cursor-text outline-none leading-tight"
                            contentEditable
                            suppressContentEditableWarning
                            title={day.feast}
                            onBlur={(e) => {
                              const newText = e.currentTarget.textContent || '';
                              if (onUpdateReading) {
                                onUpdateReading(day.date, 'feast', newText);
                              }
                            }}
                          >
                            {day.feast}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-[1mm] pt-[1mm] border-t border-stone-200/90 text-center text-[5.5pt] text-stone-700 tracking-wider uppercase font-medium">
        {isGospel ? '✝ Marque-page B • Évangile' : '📖 Marque-page A • 1re Lecture'}
      </div>
    </div>
  );
};
