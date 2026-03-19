import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

const KEY = Buffer.from(process.env.ACCESS_TOKEN_ENCRYPTION_KEY!, "base64");

if (KEY.length !== 32) {
  throw new Error("Encryption key must be 32 bytes (base64)");
}

export type EncryptedValue = {
  iv: string;
  content: string;
  tag: string;
  keyVersion: number;
};

const KEY_VERSION = 1;

export function encrypt(plainText: string): EncryptedValue {
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    content: encrypted.toString("base64"),
    tag: tag.toString("base64"),
    keyVersion: KEY_VERSION,
  };
}

export function decrypt(encrypted: EncryptedValue): string {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encrypted.iv, "base64"),
  );

  decipher.setAuthTag(Buffer.from(encrypted.tag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.content, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
