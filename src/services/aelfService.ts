import { DEFAULT_MONTHS_DATA } from '../data/defaultLiturgicalData';
import { DayReading, MonthData, WeekBlock } from '../types/lectionary';

const DAYS_SHORT_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS_FULL_FR = [
  'JANVIER',
  'FÉVRIER',
  'MARS',
  'AVRIL',
  'MAI',
  'JUIN',
  'JUILLET',
  'AOÛT',
  'SEPTEMBRE',
  'OCTOBRE',
  'NOVEMBRE',
  'DÉCEMBRE',
];

const MONTHS_SHORT_FR = [
  'Jan',
  'Fév',
  'Mars',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sept',
  'Oct',
  'Nov',
  'Déc',
];

const STORAGE_PREFIX = 'custom_month_v2_';

interface AelfLecture {
  type: string;
  ref?: string;
  titre?: string;
}

interface AelfMesse {
  nom?: string;
  fete?: string;
  lectures?: AelfLecture[];
}

interface AelfResponse {
  messes?: AelfMesse[];
  informations?: {
    jour?: string;
    couleur?: string;
    fete?: string;
    degre?: string;
  };
}

export async function fetchMonthFromAELF(
  year: number,
  month: number,
  onProgress?: (progress: number, total: number) => void
): Promise<MonthData> {
  const monthKey = `${year}-${String(month).padStart(2, '0')}`;

  // Check custom storage first
  const stored = localStorage.getItem(`${STORAGE_PREFIX}${monthKey}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  // If in default pre-computed data, return copy
  if (DEFAULT_MONTHS_DATA[monthKey]) {
    return JSON.parse(JSON.stringify(DEFAULT_MONTHS_DATA[monthKey]));
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  const weeks: WeekBlock[] = [];
  let currentDays: DayReading[] = [];
  let weekIndex = 1;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();

    if (onProgress) {
      onProgress(day, daysInMonth);
    }

    // Exclude Sundays
    if (dayOfWeek === 0) {
      if (currentDays.length > 0) {
        weeks.push({
          id: `${monthKey}-w${weekIndex}`,
          weekTitle: `Semaine ${weekIndex}`,
          days: currentDays,
        });
        currentDays = [];
        weekIndex++;
      }
      continue;
    }

    const yyyy = year;
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    let firstReading = '';
    let secondReading: string | undefined = undefined;
    let gospel = '';
    let feast: string | undefined = undefined;

    try {
      const res = await fetch(`https://api.aelf.org/v1/messes/${dateStr}/romain`);
      if (res.ok) {
        const data: AelfResponse = await res.json();
        const infoFete = data.informations?.fete || '';
        const degre = (data.informations?.degre || '').toLowerCase();

        // Only keep major feasts (Solennité or Fête), ignore Mémoires
        const isMajorFeast =
          degre.includes('solennit') ||
          degre.includes('fête') ||
          degre.includes('fete') ||
          infoFete.toLowerCase().includes('cendres') ||
          infoFete.toLowerCase().includes('défunts');

        if (
          isMajorFeast &&
          infoFete &&
          !infoFete.toLowerCase().includes('férie') &&
          !infoFete.toLowerCase().includes('semaine')
        ) {
          feast = infoFete
            .split(',')[0]
            .replace('Saint', 'S.')
            .replace('Sainte', 'Ste')
            .slice(0, 14);
        }

        const messe = data.messes && data.messes[data.messes.length - 1];
        if (messe?.lectures) {
          for (const l of messe.lectures) {
            if (l.type === 'lecture_1' && !firstReading) firstReading = l.ref || '';
            if (l.type === 'lecture_2' && !secondReading) secondReading = l.ref || '';
            if (l.type === 'evangile' && !gospel) gospel = l.ref || '';
          }
        }
      }
    } catch {
      firstReading = 'Lecture du jour';
      gospel = 'Évangile du jour';
    }

    currentDays.push({
      id: dateStr,
      date: dateStr,
      dayNumber: day,
      dayLabel: `${DAYS_SHORT_FR[dayOfWeek]} ${day}`,
      dayOfWeek,
      firstReading: firstReading || 'Ref. 1re Lect.',
      secondReading: secondReading || undefined,
      gospel: gospel || 'Ref. Évangile',
      feast: feast || undefined,
    });
  }

  if (currentDays.length > 0) {
    weeks.push({
      id: `${monthKey}-w${weekIndex}`,
      weekTitle: `Semaine ${weekIndex}`,
      days: currentDays,
    });
  }

  const result: MonthData = {
    year,
    month,
    monthLabel: `${MONTHS_FULL_FR[month - 1]} ${year}`,
    shortMonthLabel: `${MONTHS_SHORT_FR[month - 1]} ${year}`,
    weeks,
  };

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${monthKey}`, JSON.stringify(result));
  } catch {
    // ignore
  }

  return result;
}

export function saveEditedMonth(monthData: MonthData): void {
  const monthKey = `${monthData.year}-${String(monthData.month).padStart(2, '0')}`;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${monthKey}`, JSON.stringify(monthData));
  } catch {
    // ignore
  }
}

export function resetMonthToDefault(year: number, month: number): MonthData | null {
  const monthKey = `${year}-${String(month).padStart(2, '0')}`;
  localStorage.removeItem(`${STORAGE_PREFIX}${monthKey}`);
  if (DEFAULT_MONTHS_DATA[monthKey]) {
    return JSON.parse(JSON.stringify(DEFAULT_MONTHS_DATA[monthKey]));
  }
  return null;
}

export function getStoredMonthKey(monthKey: string): string | null {
  return localStorage.getItem(`${STORAGE_PREFIX}${monthKey}`);
}
