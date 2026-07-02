import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import type { AuthUser } from './types.js';
import { getSessionKey } from './config.js';

export type SessionPayload = {
  oauthState: string;
  pkceVerifier: string;
  returnTo: string;
  authUser: AuthUser;
};

const SESSION_COOKIE = 'balance_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

class RequestSession {
  private data: SessionPayload;
  private dirty = false;
  private cleared = false;

  constructor(initial: SessionPayload) {
    this.data = { ...initial };
  }

  get<K extends keyof SessionPayload>(key: K): SessionPayload[K] | undefined {
    return this.data[key];
  }

  set<K extends keyof SessionPayload>(key: K, value: SessionPayload[K] | undefined): void {
    if (value === undefined) {
      delete this.data[key];
    } else {
      this.data[key] = value;
    }

    this.dirty = true;
    this.cleared = false;
  }

  delete(): void {
    this.data = { oauthState: '', pkceVerifier: '', returnTo: '', authUser: { userId: '', email: undefined } };
    this.cleared = true;
    this.dirty = true;
  }

  isDirty(): boolean {
    return this.dirty;
  }

  isCleared(): boolean {
    return this.cleared;
  }

  snapshot(): SessionPayload {
    return { ...this.data };
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    session: RequestSession;
  }
}

const getCookieOptions = () => ({
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_MAX_AGE_SECONDS,
});

const encryptSession = (payload: SessionPayload): string => {
  const key = getSessionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString('base64url');
};

const decryptSession = (value: string): SessionPayload | undefined => {
  try {
    const key = getSessionKey();
    const buffer = Buffer.from(value, 'base64url');
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const json = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
    const parsed = JSON.parse(json) as SessionPayload;

    if (!parsed || typeof parsed !== 'object') return undefined;
    return parsed;
  } catch {
    return undefined;
  }
};

const writeSessionCookie = (reply: FastifyReply, session: RequestSession): void => {
  if (session.isCleared() || Object.keys(session.snapshot()).length === 0) {
    reply.clearCookie(SESSION_COOKIE, { path: '/' });
    return;
  }

  reply.setCookie(SESSION_COOKIE, encryptSession(session.snapshot()), getCookieOptions());
};

export const registerSession = async (app: FastifyInstance): Promise<void> => {
  await app.register(fastifyCookie);

  app.addHook('onRequest', async (request) => {
    const raw = request.cookies[SESSION_COOKIE];
    const payload = raw ? decryptSession(raw) : undefined;
    request.session = new RequestSession(payload ?? { oauthState: '', pkceVerifier: '', returnTo: '', authUser: { userId: '', email: undefined } });
  });

  app.addHook('onSend', async (request, reply, payload) => {
    if (request.session?.isDirty()) {
      writeSessionCookie(reply, request.session);
    }

    return payload;
  });
};

export const readSessionUser = (request: FastifyRequest): AuthUser | undefined => {
  const authUser = request.session.get('authUser');
  if (
    authUser &&
    typeof authUser === 'object' &&
    typeof authUser.userId === 'string' &&
    authUser.userId.length > 0
  ) {
    return authUser;
  }

  return undefined;
};

export const clearAuthSession = (request: FastifyRequest, reply: FastifyReply): void => {
  request.session.delete();
  reply.clearCookie(SESSION_COOKIE, { path: '/' });
};
