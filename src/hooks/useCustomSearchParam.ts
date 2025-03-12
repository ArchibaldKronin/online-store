import { useSearchParams } from 'react-router-dom';

export default function useCustomSearchParam(params: string[]) {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });

  console.log('Имя парамсов в хуке', params);

  const searchParamsObj = params.map((param) => {
    return { [param]: searchParams.get(param) || '' };
  });

  //loging
  console.log(`Парамсы возвращаемые из хука`, searchParamsObj);
  //end loging

  const setCustomSearcheParam = (paramsObjArr: typeof searchParamsObj) => {
    //loging
    console.log(`Парамсы для записи в хуке`, paramsObjArr);
    //end loging

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
