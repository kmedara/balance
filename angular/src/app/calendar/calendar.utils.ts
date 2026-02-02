import { Budget } from '../types/types';

export const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const daysBetween = (a: Date, b: Date) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((b.getTime() - a.getTime()) / msPerDay);
};

export const occursOnDate = (budget: Budget, date: Date) => {
  const start = new Date(budget.startDate);
  start.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  if (target < start) return false;

  const diffDays = daysBetween(start, target);

  switch (budget.frequency) {
    case 'Daily':
      return true;

    case 'Weekly':
      return diffDays % 7 === 0;

    case 'Bi-Weekly':
      return diffDays % 14 === 0;

    case 'Semi-Monthly':
      // occurs on start day AND 15 days later
      return target.getDate() === start.getDate() || target.getDate() === start.getDate() + 15;

    case 'Monthly':
      return target.getDate() === start.getDate();

    case 'Quarterly':
      return (
        target.getDate() === start.getDate() && (target.getMonth() - start.getMonth()) % 3 === 0
      );

    case 'Semi-Annually':
      return (
        target.getDate() === start.getDate() && (target.getMonth() - start.getMonth()) % 6 === 0
      );

    default:
      return false;
  }
};
export const getBudgetsForDay = (date: Date, budgets: Budget[]): Budget[] => {
  return budgets.filter((b) => occursOnDate(b, date));
};
