import { configureSessionStorageToStrings } from './queryStorageFunctions';

export const [saveSortParamsToSession, getSortParamsFromSession, clearSortParamsinSession] =
  configureSessionStorageToStrings('sort');
