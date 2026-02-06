// plaid-errors.ts
export type PlaidErrorType =
  | 'INVALID_REQUEST'
  | 'INVALID_CONFIGURATION'
  | 'INSTITUTION_ERROR'
  | 'RATE_LIMIT_EXCEEDED'
  | 'API_ERROR'
  | 'ITEM_ERROR';

export type PlaidError = {
  error_type: PlaidErrorType;
  error_code: string;
  error_message: string;
  display_message?: string | null;
};
