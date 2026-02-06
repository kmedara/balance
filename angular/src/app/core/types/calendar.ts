import { FixedLengthArray } from './util';

export type Week = FixedLengthArray<CalendarDay, 7>;

export type CalendarDay = {
  date: Date;
  inCurrentMonth: boolean;
  events?: any[];
};
