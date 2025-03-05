import { useCallback, useEffect } from 'react';
import ErrorPage from '../../../../components/error-page/ErrorPage';
import Loader from '../../../../components/loader/Loader';
import { useGetProductsQuery } from '../../api/productsApi';
import {
  clearQParamsinSession,
  getQParamsFromSession,
  saveQParamsToSession,
} from '../../../../functions/session-storage-functions/searchQueryParamsInStorage';
import useCustomSearchParam from '../../../../hooks/useCustomSearchParam';
import ProductListComponent from '../../../../components/product-list-component/ProductListComponent';
import ProductListHeader from '../../../../components/productListHeader/ProductListHeader';
import { SortSelectStates } from '../../../../components/selectComponent/SelectSortComponent';
import {
  clearSortParamsinSession,
  getSortParamsFromSession,
  saveSortParamsToSession,
} from '../../../../functions/session-storage-functions/sortingPriceQueryParamsInStorage';

const ProductListPage = () => {
  const [qSearchParam, setQSearcheParam] = useCustomSearchParam('q'); // параметры поиска

  const { data: products, error, isLoading } = useGetProductsQuery(qSearchParam);

  //при каждом вызове setQSearcheParam обновлять хранилище
  const setQSearcheParamAndStore = (q: string) => {
    if (q === '') {
      clearQParamsinSession();
      setQSearcheParam(q);
    } else {
      setQSearcheParam(q);
      saveQParamsToSession(q);
    }
  };

  //каждый раз при монтировании, проверять хранилище
  useEffect(() => {
    const queryFromSession = getQParamsFromSession();
    setQSearcheParam(queryFromSession);
  }, []);

  //пропсы
  const handleSearch = useCallback(
    (q: string) => setQSearcheParamAndStore(q),
    [setQSearcheParamAndStore],
  );
  //

  //СОРТИРОВКА
  const [sortSearchParam, setSortSearcheParam] = useCustomSearchParam('sort');

  const setSortSearchParamAndStore = (q: SortSelectStates) => {
    if (q === '') {
      clearSortParamsinSession();
      setSortSearcheParam(q);
    } else {
      setSortSearcheParam(q);
      saveSortParamsToSession(q);
    }
  };

  useEffect(() => {
    const queryFromSession = getSortParamsFromSession();
    console.log('Данные из хранилища по ключу Sort', queryFromSession);

    setSortSearcheParam(queryFromSession);
  }, []);
  ////////////////
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage er={error} />;
  }
  return (
    <div>
      <ProductListHeader onSearch={handleSearch} onChangeSelect={setSortSearchParamAndStore} />
      {/* <SearchBar onSearch={onClick} /> */}
      {sortSearchParam}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <ProductListComponent
                {...product}
                // title={product.title}
                // category={product.category}
                // description={product.description}
                // image={product.image}
                // price={product.price}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
