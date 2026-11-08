/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TopNav } from './components/TopNav';
import { Toolbar } from './components/Toolbar';
import { PrintSheet } from './components/PrintSheet';
import { MonthSelectorModal } from './components/MonthSelectorModal';
import { PrintGuideModal } from './components/PrintGuideModal';
import { BookmarkSlot, MonthData } from './types/lectionary';
import { DEFAULT_MONTHS_DATA } from './data/defaultLiturgicalData';
import {
  fetchMonthFromAELF,
  saveEditedMonth,
  resetMonthToDefault,
  getStoredMonthKey,
} from './services/aelfService';
import { Printer } from 'lucide-react';

export default function App() {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([
    '2026-11',
    '2026-12',
    '2027-01',
    '2027-02',
  ]);

  const [monthsDataMap, setMonthsDataMap] = useState<Record<string, MonthData>>(() => {
    const initialMap: Record<string, MonthData> = {};
    Object.keys(DEFAULT_MONTHS_DATA).forEach((key) => {
      const stored = getStoredMonthKey(key);
      if (stored) {
        try {
          initialMap[key] = JSON.parse(stored);
        } catch {
          initialMap[key] = DEFAULT_MONTHS_DATA[key];
        }
      } else {
        initialMap[key] = DEFAULT_MONTHS_DATA[key];
      }
    });
    return initialMap;
  });

  const [colorMode, setColorMode] = useState<'liturgical' | 'monochrome'>('liturgical');
  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 0.72;
    }
    return 0.95;
  });

  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomized, setIsCustomized] = useState(false);

  const loadMonths = useCallback(
    async (monthsToLoad: string[]) => {
      setIsLoading(true);
      const updatedMap = { ...monthsDataMap };

      for (const mKey of monthsToLoad) {
        if (!updatedMap[mKey]) {
          const [year, month] = mKey.split('-').map(Number);
          try {
            const data = await fetchMonthFromAELF(year, month);
            updatedMap[mKey] = data;
          } catch (err) {
            console.error(`Error loading month ${mKey}:`, err);
          }
        }
      }

      setMonthsDataMap(updatedMap);
      setIsLoading(false);
    },
    [monthsDataMap]
  );

  useEffect(() => {
    const missing = selectedMonths.filter((m) => !monthsDataMap[m]);
    if (missing.length > 0) {
      loadMonths(missing);
    }
  }, [selectedMonths, monthsDataMap, loadMonths]);

  // Generate the 8 Bookmark Slots: 4 months x 2 bookmarks (1re Lecture + Gospel)
  const bookmarkSlots: BookmarkSlot[] = useMemo(() => {
    const slots: BookmarkSlot[] = [];

    selectedMonths.forEach((mKey, monthIndex) => {
      const data = monthsDataMap[mKey] || DEFAULT_MONTHS_DATA[mKey] || {
        year: Number(mKey.split('-')[0]),
        month: Number(mKey.split('-')[1]),
        monthLabel: mKey,
        shortMonthLabel: mKey,
        weeks: [],
      };

      // Bookmark A: 1re Lecture
      slots.push({
        id: `slot-${monthIndex}-lect`,
        monthData: data,
        type: 'firstReading',
      });

      // Bookmark B: Évangile
      slots.push({
        id: `slot-${monthIndex}-gospel`,
        monthData: data,
        type: 'gospel',
      });
    });

    return slots;
  }, [selectedMonths, monthsDataMap]);

  const handleUpdateReading = (
    dateStr: string,
    field: 'firstReading' | 'secondReading' | 'gospel' | 'feast',
    value: string
  ) => {
    const [year, month] = dateStr.split('-').map(Number);
    const mKey = `${year}-${String(month).padStart(2, '0')}`;
    const targetMonth = monthsDataMap[mKey];
    if (!targetMonth) return;

    const cloned = JSON.parse(JSON.stringify(targetMonth)) as MonthData;
    let found = false;

    for (const week of cloned.weeks) {
      for (const day of week.days) {
        if (day.date === dateStr) {
          day[field] = value;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (found) {
      saveEditedMonth(cloned);
      setMonthsDataMap((prev) => ({
        ...prev,
        [mKey]: cloned,
      }));
      setIsCustomized(true);
    }
  };

  const handleResetReadings = () => {
    const updated = { ...monthsDataMap };
    selectedMonths.forEach((mKey) => {
      const [year, month] = mKey.split('-').map(Number);
      const res = resetMonthToDefault(year, month);
      if (res) {
        updated[mKey] = res;
      }
    });
    setMonthsDataMap(updated);
    setIsCustomized(false);
  };

  const handleApplyMonths = (newMonths: string[]) => {
    setSelectedMonths(newMonths);
    loadMonths(newMonths);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-root min-h-screen bg-stone-200 text-stone-900 flex flex-col font-sans antialiased selection:bg-[#80182A]/20">
      {/* TOP NAVIGATION BAR */}
      <TopNav
        onOpenMonthSelector={() => setIsMonthModalOpen(true)}
        onOpenPrintGuide={() => setIsGuideModalOpen(true)}
        onPrint={handlePrint}
      />

      {/* WORKSPACE TOOLBAR */}
      <Toolbar
        currentMonths={selectedMonths}
        colorMode={colorMode}
        onChangeColorMode={setColorMode}
        zoomLevel={zoomLevel}
        onZoomIn={() => setZoomLevel((z) => Math.min(1.4, Number((z + 0.1).toFixed(2))))}
        onZoomOut={() => setZoomLevel((z) => Math.max(0.55, Number((z - 0.1).toFixed(2))))}
        onResetZoom={() => setZoomLevel(0.95)}
        onOpenMonthSelector={() => setIsMonthModalOpen(true)}
        onOpenPrintGuide={() => setIsGuideModalOpen(true)}
        onResetReadings={handleResetReadings}
        isCustomized={isCustomized}
      />

      {/* QUICK INSTRUCTION RIBBON */}
      <div className="no-print bg-[#162B4D]/5 border-b border-[#162B4D]/10 px-4 py-2 text-center text-xs text-stone-700 flex items-center justify-center gap-2 flex-wrap">
        <span className="font-semibold text-[#162B4D]">Format optimisé plein A4 :</span>
        <span>
          8 marque-pages (5,1 × 14,5 cm) • Tous les jours du mois sur une seule ligne avec les solennités majeures.
        </span>
        <span className="text-stone-400">·</span>
        <button
          onClick={() => setIsGuideModalOpen(true)}
          className="text-[#80182A] font-medium underline hover:text-[#5a101d] transition-colors"
        >
          Voir les conseils papier &amp; découpe
        </button>
      </div>

      {/* MAIN VIEWPORT CANVAS */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-8">
        <PrintSheet
          slots={bookmarkSlots}
          colorMode={colorMode}
          zoomLevel={zoomLevel}
          onUpdateReading={handleUpdateReading}
        />
      </main>

      {/* FLOATING ACTION PILL FOR QUICK PRINT */}
      <aside aria-label="Action d'impression" className="no-print fixed bottom-6 right-6 z-30 shadow-lg">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#162B4D] hover:bg-[#0e1d35] text-white text-sm font-semibold shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimer la planche A4</span>
        </button>
      </aside>

      {/* MODALS */}
      <MonthSelectorModal
        isOpen={isMonthModalOpen}
        onClose={() => setIsMonthModalOpen(false)}
        currentMonths={selectedMonths}
        onApplyMonths={handleApplyMonths}
        isLoading={isLoading}
      />

      <PrintGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
