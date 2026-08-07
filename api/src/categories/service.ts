import { listCategoryDisplayNames } from './repository.js';

/** Lists display names for budget categories. */
export const listCategories = (): Promise<string[]> => listCategoryDisplayNames();
