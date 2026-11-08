import React from 'react';
import { BookmarkSlot } from '../types/lectionary';
import { BookOpen, Cross } from 'lucide-react';

interface BookmarkCardProps {
  slot: BookmarkSlot;
  colorMode: 'liturgical' | 'monochrome';
  onUpdateReading?: (
    date: string,
    field: 'firstReading' | 'secondReading' | 'gospel' | 'feast',
    value: string
  ) => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  slot,
  colorMode,
  onUpdateReading,
}) => {
  const { monthData, type } = slot;
  const isGospel = type === 'gospel';

  const headerBgClass =
    colorMode === 'monochrome'
      ? isGospel
        ? 'bg-neutral-800 text-white'
        : 'bg-neutral-700 text-white'
      : isGospel
      ? 'bg-[#162B4D] text-white'
      : 'bg-[#80182A] text-white';

  const accentTagClass =
    colorMode === 'monochrome'
      ? 'bg-neutral-200 text-neutral-800'
      : isGospel
      ? 'bg-sky-100 text-[#162B4D]'
      : 'bg-rose-100 text-[#80182A]';

  return (
    <div className="bookmark-card relative flex flex-col justify-start bg-white text-stone-900 border border-dashed border-stone-300 px-[1.8mm] py-[1.5mm] box-border overflow-hidden select-text text-[6.3pt] leading-[1.12] h-[145.5mm] w-[51mm]">
      {/* Tiny scissors icon for cutting */}
      <span className="absolute -top-[1px] left-1 text-[6px] text-stone-400 select-none no-print">
        ✂
      </span>

      {/* COMPACT HEADER */}
      <div className={`rounded-[2px] py-[1mm] px-[1.5mm] mb-[0.8mm] flex items-center justify-between ${headerBgClass}`}>
        <div className="flex items-center gap-[1mm] font-cinzel text-[6.5pt] font-bold tracking-wider uppercase whitespace-nowrap">
          {isGospel ? (
            <>
              <Cross className="w-2 h-2 shrink-0 opacity-90" />
              <span>Évangile</span>
            </>
          ) : (
            <>
              <BookOpen className="w-2 h-2 shrink-0 opacity-90" />
              <span>1re Lect.</span>
            </>
          )}
        </div>
        <div className="text-[6pt] tracking-wider opacity-95 font-semibold uppercase whitespace-nowrap">
          {monthData.monthLabel}
        </div>
      </div>

      {/* WEEKS & DAYS LIST */}
      <div className="flex-1 flex flex-col justify-between">
        {monthData.weeks.map((week, wIdx) => (
          <div
            key={week.id || wIdx}
            className={`week-section ${wIdx > 0 ? 'border-t border-stone-200 pt-[0.4mm]' : ''}`}
          >
            {/* Compact week title */}
            <div className="text-[4.8pt] font-semibold text-stone-400 uppercase tracking-wider text-right leading-none mb-[0.2mm]">
              {week.weekTitle || `Sem. ${wIdx + 1}`}
            </div>

            {/* Weekdays (Lun -> Sam) */}
            <div className="flex flex-col">
              {week.days.map((day) => {
                const primaryRef = isGospel ? day.gospel : day.firstReading;

                return (
                  <div
                    key={day.id}
                    className="day-line flex items-baseline gap-[1mm] py-[0.15mm] hover:bg-stone-50 transition-colors rounded-xs"
                  >
                    {/* Day Label (e.g. Lun 2) */}
                    <span className="font-bold text-[6.1pt] text-stone-800 w-[7.2mm] shrink-0 tracking-tight tabular-nums leading-[1.12]">
                      {day.dayLabel}
                    </span>

                    {/* Reference + inline major feast + optional 2nd reading */}
                    <div className="flex-1 min-w-0 leading-[1.12] text-[6.1pt]">
                      <span
                        className="font-medium text-stone-900 cursor-text outline-none focus:bg-amber-50 rounded-xs"
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

                      {/* Major feast inline */}
                      {day.feast && (
                        <span
                          className="ml-[0.8mm] text-[5.2pt] italic text-stone-500 cursor-text outline-none"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newText = e.currentTarget.textContent || '';
                            if (onUpdateReading) {
                              onUpdateReading(day.date, 'feast', newText);
                            }
                          }}
                        >
                          ({day.feast})
                        </span>
                      )}

                      {/* Optional 2nd reading for Solemnities on weekday */}
                      {!isGospel && day.secondReading && (
                        <span className="ml-[0.8mm] inline-flex items-baseline gap-[0.4mm]">
                          <span
                            className={`text-[4.8pt] font-bold px-[1px] rounded-[1px] leading-none ${accentTagClass}`}
                          >
                            2e
                          </span>
                          <span
                            className="text-[5.6pt] text-stone-700 cursor-text outline-none focus:bg-amber-50 rounded-xs"
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
                        </span>
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
  );
};
