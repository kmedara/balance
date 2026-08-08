import { afterEach, describe, expect, it } from 'vitest';
import {
  getClientOrigins,
  isHttpOrigin,
  parseClientOrigins,
} from './config.js';
import { ServiceUnavailableError } from '../errors/http-error.js';

describe('isHttpOrigin', () => {
  it('accepts http and https origins', () => {
    expect(isHttpOrigin('http://localhost:4200')).toBe(true);
    expect(isHttpOrigin('https://app.example.com')).toBe(true);
  });

  it('rejects wildcards, paths, and non-http schemes', () => {
    expect(isHttpOrigin('*')).toBe(false);
    expect(isHttpOrigin('https://app.example.com/')).toBe(false);
    expect(isHttpOrigin('https://app.example.com/app')).toBe(false);
    expect(isHttpOrigin('ftp://app.example.com')).toBe(false);
    expect(isHttpOrigin('')).toBe(false);
  });
});

describe('parseClientOrigins', () => {
  it('parses a single origin and strips a trailing slash', () => {
    expect(parseClientOrigins('http://localhost:4200/')).toEqual(['http://localhost:4200']);
  });

  it('parses a comma-separated allowlist', () => {
    expect(
      parseClientOrigins('http://localhost:4200, https://app.example.com'),
    ).toEqual(['http://localhost:4200', 'https://app.example.com']);
  });

  it('fails closed on missing or invalid values', () => {
    expect(() => parseClientOrigins(undefined)).toThrow(/required/i);
    expect(() => parseClientOrigins('')).toThrow(/required/i);
    expect(() => parseClientOrigins('*')).toThrow(/valid http/);
    expect(() => parseClientOrigins('https://app.example.com/path')).toThrow(/valid http/);
  });
});

describe('getClientOrigins', () => {
  const previous = process.env.CLIENT_ORIGIN;

  afterEach(() => {
    if (previous === undefined) {
      Reflect.deleteProperty(process.env, 'CLIENT_ORIGIN');
    } else {
      process.env.CLIENT_ORIGIN = previous;
    }
  });

  it('reads CLIENT_ORIGIN from the environment', () => {
    process.env.CLIENT_ORIGIN = 'https://app.example.com';
    expect(getClientOrigins()).toEqual(['https://app.example.com']);
  });

  it('throws ServiceUnavailableError when unset', () => {
    Reflect.deleteProperty(process.env, 'CLIENT_ORIGIN');
    expect(() => getClientOrigins()).toThrow(ServiceUnavailableError);
  });
});
