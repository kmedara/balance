import { describe, expect, it } from 'vitest';
import { toCreateEventResponse } from './service.js';
import type { EventWithId } from '../data/types.js';

describe('toCreateEventResponse', () => {
  it('exposes updatedAt as an ISO string for OCC', () => {
    const updatedAt = new Date('2026-08-07T12:00:00.000Z');
    const event = {
      id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      userId: 'user-1',
      eventType: 'budget',
      title: 'Rent',
      type: 'Expense',
      amount: 1000,
      category: 'Housing',
      rrule: 'FREQ=MONTHLY',
      dtstart: new Date('2026-01-01T00:00:00.000Z'),
      createdAt: updatedAt,
      updatedAt,
    } as EventWithId;

    const response = toCreateEventResponse(event);

    expect(response.updatedAt).toBe('2026-08-07T12:00:00.000Z');
    expect(response).not.toHaveProperty('version');
  });
});
