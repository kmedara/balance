import { describe, expect, it } from 'vitest';
import type { CalendarDayWire, CalendarResponseWire } from '@balance/schemas/client';
import {
  buildEmptyMonthDays,
  parseCalendarDate,
  reviveCalendarResponse,
  summarizeMonth,
} from './calendar.utils';

describe('calendar.utils', () => {
  describe('parseCalendarDate', () => {
    it('parses YYYY-MM-DD as local midnight', () => {
      const date = parseCalendarDate('2026-03-15');
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(15);
      expect(date.getHours()).toBe(0);
    });

    it('normalizes Date inputs to local midnight', () => {
      const date = parseCalendarDate(new Date(2026, 0, 5, 14, 30));
      expect(date.getHours()).toBe(0);
      expect(date.getDate()).toBe(5);
    });
  });

  describe('summarizeMonth', () => {
    it('sums income and expenses for in-month days only', () => {
      const summary = summarizeMonth([
        {
          date: new Date(2026, 0, 1),
          inCurrentMonth: true,
          events: [
            { amount: 100, type: 'Income' },
            { amount: 40, type: 'Expense' },
          ],
        },
        {
          date: new Date(2025, 11, 31),
          inCurrentMonth: false,
          events: [{ amount: 999, type: 'Income' }],
        },
      ]);

      expect(summary).toEqual({ income: 100, expenses: 40, net: 60 });
    });
  });

  describe('buildEmptyMonthDays', () => {
    it('builds a padded grid including days outside the month', () => {
      const days = buildEmptyMonthDays(2026, 1);
      expect(days.length % 7).toBe(0);
      expect(days.some((d) => d.inCurrentMonth)).toBe(true);
      expect(days.some((d) => !d.inCurrentMonth)).toBe(true);
    });
  });

  describe('reviveCalendarResponse', () => {
    it('revives day date strings to Date instances', () => {
      const day: CalendarDayWire = {
        date: '2026-02-01',
        inCurrentMonth: true,
        events: [],
      };
      const wire: CalendarResponseWire = {
        days: [day],
        weeks: [[day]],
        month: 2,
        year: 2026,
        monthLabel: 'February 2026',
      };

      const revived = reviveCalendarResponse(wire);
      expect(revived.days[0]?.date).toBeInstanceOf(Date);
      expect(revived.weeks[0]?.[0]?.date).toBeInstanceOf(Date);
      expect(revived.days[0]?.date.getDate()).toBe(1);
    });
  });
});
