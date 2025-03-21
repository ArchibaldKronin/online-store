import { useCallback, useEffect, useState } from 'react';
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
import Button from '../../../../components/button/Button';

const ProductListPage = () => {
  const [memorableSearchParams, setMemorableSearchParams] = useCustomSearchParam([
    'q',
    'sort',
    'page',
  ]);

  //получение параметра поиска для запроса каталога
  const qSearchParamObj = memorableSearchParams.find((param) => 'q' in param);
  const qSearchParam = qSearchParamObj?.['q'] ?? '';
  //получение параметра страницы для запроса с пагинацией
  const pageSearchParamObj = memorableSearchParams.find((param) => 'page' in param);
  const pageSearchParam = pageSearchParamObj?.['page'] ?? '1';
  //Получение параметра для сортировки
  const sortSearchParamObj = memorableSearchParams.find((param) => 'sort' in param);
  const sortSearchParam = (sortSearchParamObj?.['sort'] ?? '') as SortSelectStates;
  //запрос
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({ query: qSearchParam, page: pageSearchParam, sort: sortSearchParam });

  //при каждом вызове setQSearcheParam обновлять хранилище
  const setSearchParamsAndStor = (paramsObjArr: Record<string, string>[]) => {
    paramsObjArr.forEach((param) => {
      const [[key, value]] = Object.entries(param);
      value ? saveStringToSession(key, value) : clearStringInSession(key);
    });

    setMemorableSearchParams(paramsObjArr);
  };

  //каждый раз при монтировании, проверять хранилище
  useGetParamsFromStoreEffect(['q', 'sort', 'page'], setMemorableSearchParams);

  const [currentPage, setCurrentPage] = useState(Number(pageSearchParam));

  //пропсы
  const handleSearch = useCallback(
    (query: string) => {
      const newParams = memorableSearchParams.map((obj) => {
        if (obj.hasOwnProperty('q')) {
          return { q: query };
        }
        return { ...obj };
      });
      setSearchParamsAndStor(newParams);
      setCurrentPage(1);
    },
    [setSearchParamsAndStor],
  );

  const handleChangeSelect = (query: SortSelectStates) => {
    const newParams = memorableSearchParams.map((obj) => {
      if (obj.hasOwnProperty('sort')) {
        return { sort: query };
      }
      if (obj.hasOwnProperty('page')) {
        return { page: String(1) };
      }
      return { ...obj };
    });
    setSearchParamsAndStor(newParams);
    setCurrentPage(1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => --prevPage);
    const newParams = memorableSearchParams.map((obj) => {
      if (obj.hasOwnProperty('page')) {
        return { page: String(currentPage - 1) };
      } else {
        return { ...obj };
      }
    });
    setSearchParamsAndStor(newParams);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => ++prevPage);
    const newParams = memorableSearchParams.map((obj) => {
      if (obj.hasOwnProperty('page')) {
        return { page: String(currentPage + 1) };
      } else {
        return { ...obj };
      }
    });
    setSearchParamsAndStor(newParams);
  };

  const checkIsNextButtonActive = () => {
    if (products && products?.length >= 10 && !qSearchParam) return true;
    return false;
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage er={error} />;
  }
  return (
    <div>
      <ProductListHeader onSearch={handleSearch} onChangeSelect={handleChangeSelect} />
      {/* Текущая сортировка: {curentSorting} */}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              {/* Исправь переделай и количество в корзине, и факт наличия */}
              <ProductListComponent {...product} />
            </li>
          ))}
      </ul>
      <Button onClick={handlePrevClick} disabled={currentPage <= 1}>
        Предыдущая страница
      </Button>
      {currentPage}
      <Button onClick={handleNextClick} disabled={!checkIsNextButtonActive()}>
        Следующая страница
      </Button>
    </div>
  );
};

export default ProductListPage;
