export const toDate = (value: Date | string): Date =>
  value instanceof Date ? value : new Date(value);

export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** Parse `YYYY-MM-DD` (or ISO prefix) into local midnight. */
export const parseDateOnly = (value: string): Date => {
  const [y, m, d] = value.slice(0, 10).split('-').map(Number);
  return new Date(y!, m! - 1, d!);
};

export const isSameCalendarDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const calendarSortKey = (date: Date, eventId: string): string =>
  `${formatDateKey(date)}#${eventId}`;

/**
 * Epoch seconds `daysFromNow` in the future, for DynamoDB TTL attributes.
 * TTL requires a Number of seconds since the Unix epoch.
 */
export const ttlEpochSeconds = (daysFromNow: number, from: Date = new Date()): number =>
  Math.floor(from.getTime() / 1000) + Math.floor(daysFromNow * 24 * 60 * 60);
