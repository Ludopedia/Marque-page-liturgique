export interface DayReading {
  id: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  dayLabel: string; // "Lun 2"
  dayOfWeek: number; // 1 = Monday, 6 = Saturday
  weekNumber?: number;
  weekTitle?: string;
  firstReading: string;
  secondReading?: string;
  gospel: string;
  feast?: string;
  liturgicalColor?: 'green' | 'violet' | 'white' | 'red';
}

export interface WeekBlock {
  id: string;
  weekTitle: string;
  days: DayReading[];
}

export interface MonthData {
  year: number;
  month: number; // 1-12
  monthLabel: string; // "NOVEMBRE 2026"
  shortMonthLabel: string; // "Nov 2026"
  liturgicalSeason?: string;
  weeks: WeekBlock[];
}

export type BookmarkType = 'firstReading' | 'gospel';

export interface BookmarkSlot {
  id: string;
  monthData: MonthData;
  type: BookmarkType;
}

export interface AppSettings {
  colorMode: 'liturgical' | 'monochrome';
  showCutGuides: boolean;
  fontSize: 'compact' | 'normal';
  duplexMode: boolean; // Indicates if month 1 & 2 or 1 & 3 are meant for back-to-back gluing
}
