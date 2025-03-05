import { useSearchParams } from 'react-router-dom';
import { getQParamsFromSession } from '../functions/session-storage-functions/searchQueryParamsInStorage';

export default function useCustomSearchParam(param: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('Имя парамса в хуке', param);

  const customSearchParamString = searchParams.get(param) || '';

  console.log('Значение парама хуке ', param, customSearchParamString);

  const setCustomSearcheParam = (q: string) => {
    console.log('Установка парамса в хуке ', param, ' ', q);

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
