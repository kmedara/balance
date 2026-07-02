import { randomBytes } from 'node:crypto';

const OBJECT_ID_PATTERN = /^[a-f0-9]{24}$/i;

export const generateId = (): string => randomBytes(12).toString('hex');

export const isValidId = (value: string): boolean => OBJECT_ID_PATTERN.test(value);
