import { useEffect } from 'react';
import { getStringFromSession } from '../functions/session-storage-functions/queryStorageFunctions';

export default function useGetParamsFromStoreEffect(
  paramsNameArray: string[],
  setFunction: (
    paramsObjArr: {
      [x: string]: string;
    }[],
  ) => void,
) {
  useEffect(() => {
    const paramsObjArr: { [x: string]: string }[] = paramsNameArray.map((paramsName) => {
      return { [paramsName]: getStringFromSession(paramsName) };
    });
    setFunction(paramsObjArr);
  }, []);
}
