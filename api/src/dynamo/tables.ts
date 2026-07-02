const required = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
};

export const getTableName = (): string => required('BALANCE_TABLE');

export const LOCAL_TABLE_NAME = 'balance';
