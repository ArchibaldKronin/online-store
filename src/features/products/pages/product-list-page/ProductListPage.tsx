import { useCallback } from 'react';
import ErrorPage from '../../../../components/error-page/ErrorPage';
import Loader from '../../../../components/loader/Loader';
import { useGetProductsQuery } from '../../api/productsApi';

import useCustomSearchParam from '../../../../hooks/useCustomSearchParam';
import ProductListComponent from '../../../../components/product-list-component/ProductListComponent';
import ProductListHeader from '../../../../components/productListHeader/ProductListHeader';
import { SortSelectStates } from '../../../../components/selectComponent/SelectSortComponent';
import {
  clearStringInSession,
  saveStringToSession,
} from '../../../../functions/session-storage-functions/queryStorageFunctions';
import useGetParamsFromStoreEffect from '../../../../hooks/useGetParamsFromStoreEffect';

const ProductListPage = () => {
  const [memorableSearchParams, setMemorableSearchParams, initialParams] = useCustomSearchParam([
    'q',
    'sort',
  ]);

  //получение параметра поиска для запроса каталога
  const qSearchParamObj = memorableSearchParams.find((param) => 'q' in param);
  let qSearchParam: string = '';
  if (qSearchParamObj) {
    qSearchParam = qSearchParamObj['q'] || '';
  } else {
    qSearchParam = '';
  }
  const { data: products, error, isLoading } = useGetProductsQuery(qSearchParam);

  //при каждом вызове setQSearcheParam обновлять хранилище
  const setSearchParamsAndStor = (paramsObjArr: { [x: string]: string }[]) => {
    for (let paramsObj of paramsObjArr) {
      const key = Object.keys(paramsObj)[0];
      if (paramsObj[key] === '') {
        clearStringInSession(key);
      } else {
        saveStringToSession(key, paramsObj[key]);
      }
    }
    setMemorableSearchParams(paramsObjArr);
  };

  //каждый раз при монтировании, проверять хранилище
  useGetParamsFromStoreEffect(['q', 'sort'], setMemorableSearchParams);

  //пропсы
  const handleSearch = useCallback(
    (query: string) => {
      const newParams = memorableSearchParams.map((obj) => {
        if (obj.hasOwnProperty('q')) {
          return { q: query };
        } else {
          return { ...obj };
        }
      });

      setSearchParamsAndStor(newParams);
    },
    [setSearchParamsAndStor],
  );

  const handleChangeSelect = (query: SortSelectStates) => {
    const newParams = memorableSearchParams.map((obj) => {
      if (obj.hasOwnProperty('sort')) {
        return { sort: query };
      } else {
        return { ...obj };
      }
    });
    setSearchParamsAndStor(newParams);
  };

  //////////////// cheking
  const curentSortingObj = memorableSearchParams.find((param) => 'sort' in param);
  let curentSorting: string = '';
  if (curentSortingObj) {
    curentSorting = curentSortingObj['sort'] || '';
  } else {
    curentSorting = '';
  }
  ////////////end of cheking

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage er={error} />;
  }
  return (
    <div>
      <ProductListHeader onSearch={handleSearch} onChangeSelect={handleChangeSelect} />
      Текущая сортировка: {curentSorting}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <ProductListComponent {...product} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
