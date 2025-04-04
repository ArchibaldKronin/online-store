import { useSearchParams } from 'react-router-dom';

export default function useCustomSearchParam(params: string[]) {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });

  const searchParamsObj = params.map((param) => {
    return { [param]: searchParams.get(param) || '' };
  });

  const setCustomSearcheParam = (paramsObjArr: typeof searchParamsObj) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        for (let paramsObj of paramsObjArr) {
          const key = Object.keys(paramsObj)[0];
          if (paramsObj[key] === '') {
            newParams.delete(key);
          } else {
            newParams.set(key, paramsObj[key]);
          }
        }

        return newParams;
      },
      { replace: true },
    );
  };

  return [searchParamsObj, setCustomSearcheParam, params] as const;
}
