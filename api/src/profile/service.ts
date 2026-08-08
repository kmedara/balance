import type {
  AuthUser,
  CreateProfileBody,
  PatchProfileBody,
  ProfileResponse,
} from '@balance/schemas/auth';
import { ConflictError, NotFoundError } from '../errors/http-error.js';
import { updateCognitoEmail } from '../auth/cognito.js';
import { DEFAULT_SUBSCRIPTION, type UserDocument } from '../data/user.js';
import {
  findUserByCognitoSub,
  insertUserProfile,
  updateUserProfileFields,
} from './repository.js';

export const toProfileResponse = (user: UserDocument): ProfileResponse => ({
  userId: user.cognitoSub,
  email: user.email,
  displayName: user.displayName,
});

export const createProfileForUser = async (
  authUser: AuthUser,
  body: CreateProfileBody,
): Promise<ProfileResponse> => {
  const existing = await findUserByCognitoSub(authUser.userId);
  if (existing) {
    throw new ConflictError('Profile already exists');
  }

  const now = new Date();
  const email = body.email ?? authUser.email;

  if (body.email && body.email !== authUser.email) {
    await updateCognitoEmail(authUser.userId, body.email);
  }

  const document = await insertUserProfile({
    cognitoSub: authUser.userId,
    email,
    displayName: body.displayName,
    subscription: DEFAULT_SUBSCRIPTION,
    createdAt: now,
    updatedAt: now,
  });

  return toProfileResponse(document);
};

export const patchProfileForUser = async (
  authUser: AuthUser,
  body: PatchProfileBody,
): Promise<ProfileResponse> => {
  const existing = await findUserByCognitoSub(authUser.userId);
  if (!existing) {
    throw new NotFoundError('Profile not found');
  }

  if (body.email !== undefined && body.email !== existing.email) {
    await updateCognitoEmail(authUser.userId, body.email);
  }

  const updated = await updateUserProfileFields(authUser.userId, {
    ...(body.email !== undefined ? { email: body.email } : {}),
    ...(body.displayName !== undefined ? { displayName: body.displayName } : {}),
  });

  return toProfileResponse(updated);
};

export const getProfileForUser = async (authUser: AuthUser): Promise<ProfileResponse> => {
  const existing = await findUserByCognitoSub(authUser.userId);
  if (!existing) {
    throw new NotFoundError('Profile not found');
  }
  return toProfileResponse(existing);
};
