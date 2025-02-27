import { configureSessionStorageToStrings } from './queryStorageFunctions';

export const [saveQToSession, getQFromSession, clearQFromSession] =
  configureSessionStorageToStrings('q');
