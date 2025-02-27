import { useSearchParams } from 'react-router-dom';
import { getQFromSession } from '../functions/session-storage-functions/searchQueryStorage';

export default function useCustomSearchParam(param: string) {
  const [searchParams, setSearchParams] = useSearchParams({ [param]: getQFromSession() });
  console.log('Хук: ' + searchParams);

  const customSearchParamString = searchParams.get(param) || '';

  const setCustomSearcheParam = (q: string) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (q === '') {
          newParams.delete(param);
        } else {
          newParams.set(param, q);
        }
        return newParams;
      },
      { replace: true },
    );
  };

  return [customSearchParamString, setCustomSearcheParam] as const;
}
