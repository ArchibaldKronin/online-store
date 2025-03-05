import { configureSessionStorageToStrings } from './queryStorageFunctions';

export const [saveQParamsToSession, getQParamsFromSession, clearQParamsinSession] =
  configureSessionStorageToStrings('q');
