import {
  createCipheriv,
  createDecipheriv,
  getCipherInfo,
  randomBytes,
  type CipherGCM,
  type DecipherGCM,
} from 'node:crypto';
import type { EncryptedValue } from '@kmedara/balance-domain';

type EncryptionConfig = {
  algorithm: string;
  keyVersion: number;
  ivLength: number;
};

const parseRequiredInt = (name: string, value: string | undefined): number => {
  if (!value) {
    throw new Error(`${name} is required`);
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return parsed;
};

const getEncryptionConfig = (): EncryptionConfig => {
  const algorithm = process.env.ACCESS_TOKEN_ENCRYPTION_ALGORITHM;
  if (!algorithm) {
    throw new Error('ACCESS_TOKEN_ENCRYPTION_ALGORITHM is required');
  }

  if (!getCipherInfo(algorithm)) {
    throw new Error(`Unsupported ACCESS_TOKEN_ENCRYPTION_ALGORITHM: ${algorithm}`);
  }

  const cipherInfo = getCipherInfo(algorithm);
  if (cipherInfo?.mode !== 'gcm') {
    throw new Error(`ACCESS_TOKEN_ENCRYPTION_ALGORITHM must use GCM mode: ${algorithm}`);
  }

  return {
    algorithm,
    keyVersion: parseRequiredInt(
      'ACCESS_TOKEN_ENCRYPTION_KEY_VERSION',
      process.env.ACCESS_TOKEN_ENCRYPTION_KEY_VERSION,
    ),
    ivLength: parseRequiredInt(
      'ACCESS_TOKEN_ENCRYPTION_IV_LENGTH',
      process.env.ACCESS_TOKEN_ENCRYPTION_IV_LENGTH,
    ),
  };
};

const getEncryptionKey = (algorithm: string): Buffer => {
  const keyBase64 = process.env.ACCESS_TOKEN_ENCRYPTION_KEY;
  if (!keyBase64) {
    throw new Error('ACCESS_TOKEN_ENCRYPTION_KEY is required');
  }

  const key = Buffer.from(keyBase64, 'base64');
  const cipherInfo = getCipherInfo(algorithm);

  if (cipherInfo?.keyLength != null && key.length !== cipherInfo.keyLength) {
    throw new Error(
      `ACCESS_TOKEN_ENCRYPTION_KEY must decode to ${cipherInfo.keyLength} bytes for ${algorithm}`,
    );
  }

  return key;
};

export const encryptAccessToken = (plainText: string): EncryptedValue => {
  const { algorithm, keyVersion, ivLength } = getEncryptionConfig();
  const key = getEncryptionKey(algorithm);
  const iv = randomBytes(ivLength);

  const cipher = createCipheriv(algorithm, key, iv) as CipherGCM;
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString('base64'),
    content: encrypted.toString('base64'),
    tag: tag.toString('base64'),
    keyVersion,
  };
};

export const decryptAccessToken = (encrypted: EncryptedValue): string => {
  const { algorithm } = getEncryptionConfig();
  const key = getEncryptionKey(algorithm);
  const iv = Buffer.from(encrypted.iv, 'base64');

  const decipher = createDecipheriv(algorithm, key, iv) as DecipherGCM;
  decipher.setAuthTag(Buffer.from(encrypted.tag, 'base64'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.content, 'base64')),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
};
