import { useCallback, useEffect } from 'react';
import ErrorPage from '../../../../components/error-page/ErrorPage';
import Loader from '../../../../components/loader/Loader';
import SearchBar from '../../../../components/search-bar/SearchBar';
import { useGetProductsQuery } from '../../api/productsApi';
import {
  clearQFromSession,
  getQFromSession,
  saveQToSession,
} from '../../../../functions/session-storage-functions/searchQueryStorage';
import useCustomSearchParam from '../../../../hooks/useCustomSearchParam';

const ProductListPage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  const [qSearchParam, setQSearcheParam] = useCustomSearchParam('q'); // параметры поиска
  console.log('Список покупок: ' + qSearchParam);

  //при каждом вызове setQSearcheParam обновлять хранилище
  const setQSearcheParamAndStore = (q: string) => {
    if (q === '') {
      clearQFromSession();
      setQSearcheParam(q);
    } else {
      setQSearcheParam(q);
      saveQToSession(q);
    }
  };

  //каждый раз при монтировании, проверять хранилище
  useEffect(() => {
    const queryFromSession = getQFromSession();
    setQSearcheParam(queryFromSession);
  }, []);

  //пропсы
  const onClick = useCallback(
    (q: string) => setQSearcheParamAndStore(q),
    [setQSearcheParamAndStore],
  );
  //
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div>
      <SearchBar onSearch={onClick} />
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
