import type { FixedLengthArray } from '../util.js';
import type { RRule } from 'rrule';

export type Week = FixedLengthArray<CalendarDay, 7>;

export type BudgetFrequency = (typeof RRule.FREQUENCIES)[number];

export type CalendarDay = {
    date: Date;
    inCurrentMonth: boolean;
    events?: unknown[];
  };
  
  export type CalendarResponse = {
    year: number;
    month: number;
    monthLabel: string; 
    days: CalendarDay[];
    weeks: CalendarDay[][];
  };
  

  export type CalendarEvent<T> = T & { rRule: RRule; eventType: string };
  