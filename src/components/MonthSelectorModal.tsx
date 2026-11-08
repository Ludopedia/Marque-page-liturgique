import React, { useState } from 'react';
import { X, Calendar, RefreshCw, CheckCircle2, Copy } from 'lucide-react';

interface MonthSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonths: string[]; // 4 strings like ["2026-11", "2026-12", "2027-01", "2027-02"]
  onApplyMonths: (months: string[]) => void;
  isLoading: boolean;
}

const AVAILABLE_MONTHS = [
  { value: '2026-09', label: 'Septembre 2026' },
  { value: '2026-10', label: 'Octobre 2026' },
  { value: '2026-11', label: 'Novembre 2026' },
  { value: '2026-12', label: 'Décembre 2026' },
  { value: '2027-01', label: 'Janvier 2027' },
  { value: '2027-02', label: 'Février 2027' },
  { value: '2027-03', label: 'Mars 2027' },
  { value: '2027-04', label: 'Avril 2027' },
  { value: '2027-05', label: 'Mai 2027' },
  { value: '2027-06', label: 'Juin 2027' },
  { value: '2027-07', label: 'Juillet 2027' },
  { value: '2027-08', label: 'Août 2027' },
  { value: '2027-09', label: 'Septembre 2027' },
  { value: '2027-10', label: 'Octobre 2027' },
  { value: '2027-11', label: 'Novembre 2027' },
  { value: '2027-12', label: 'Décembre 2027' },
];

export const MonthSelectorModal: React.FC<MonthSelectorModalProps> = ({
  isOpen,
  onClose,
  currentMonths,
  onApplyMonths,
  isLoading,
}) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>(
    currentMonths.length === 4 ? [...currentMonths] : ['2026-11', '2026-12', '2027-01', '2027-02']
  );

  if (!isOpen) return null;

  const handleSlotChange = (index: number, val: string) => {
    const next = [...selectedMonths];
    next[index] = val;
    setSelectedMonths(next);
  };

  const applyPreset = (presetMonths: string[]) => {
    setSelectedMonths(presetMonths);
  };

  const handleSave = () => {
    onApplyMonths(selectedMonths);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden text-stone-900 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#80182A]" />
            <h3 className="font-semibold text-stone-900 text-base">
              Choisir les 4 mois de la feuille A4
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
        <div className="p-6 space-y-5">
          <p className="text-xs text-stone-600 leading-relaxed">
            Chaque feuille A4 comporte <strong>8 marque-pages</strong> : 4 mois distincts, avec pour chaque mois
            1 marque-page <em>1re Lecture</em> et 1 marque-page <em>Évangile</em>.
          </p>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Préréglages rapides
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => applyPreset(['2026-11', '2026-12', '2027-01', '2027-02'])}
                className="text-left px-3 py-2 rounded-lg border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-colors"
              >
                <div className="font-medium text-stone-800">Fin 2026 &amp; Début 2027</div>
                <div className="text-[10px] text-stone-500">Nov 26, Déc 26, Jan 27, Fév 27</div>
              </button>
              <button
                type="button"
                onClick={() => applyPreset(['2027-01', '2027-02', '2027-03', '2027-04'])}
                className="text-left px-3 py-2 rounded-lg border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-colors"
              >
                <div className="font-medium text-stone-800">1er Quadrimestre 2027</div>
                <div className="text-[10px] text-stone-500">Janvier à Avril 2027</div>
              </button>
              <button
                type="button"
                onClick={() => applyPreset(['2026-11', '2026-12', '2026-11', '2026-12'])}
                className="text-left px-3 py-2 rounded-lg border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-stone-800">2 mois en double (Nov &amp; Déc)</div>
                  <div className="text-[10px] text-stone-500">Idéal pour collage recto-verso</div>
                </div>
                <Copy className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-1" />
              </button>
              <button
                type="button"
                onClick={() => applyPreset(['2027-03', '2027-04', '2027-05', '2027-06'])}
                className="text-left px-3 py-2 rounded-lg border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-colors"
              >
                <div className="font-medium text-stone-800">Printemps 2027</div>
                <div className="text-[10px] text-stone-500">Mars à Juin 2027</div>
              </button>
            </div>
          </div>

          {/* Slot pickers */}
          <div className="pt-2 border-t border-stone-200">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-3">
              Personnalisation des 4 mois
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[0, 1, 2, 3].map((slotIdx) => {
                const rowLabel = slotIdx < 2 ? 'Rangée 1 (Haut)' : 'Rangée 2 (Bas)';
                return (
                  <div key={slotIdx} className="space-y-1">
                    <label className="text-[11px] font-medium text-stone-600 block">
                      Mois {slotIdx + 1} <span className="text-stone-400">({rowLabel})</span>
                    </label>
                    <select
                      value={selectedMonths[slotIdx]}
                      onChange={(e) => handleSlotChange(slotIdx, e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#162B4D]/30"
                    >
                      {AVAILABLE_MONTHS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#162B4D] hover:bg-[#0e1d35] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Chargement...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Appliquer et Générer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
