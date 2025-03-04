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
import ProductListComponent from '../../../../components/product-list-component/ProductListComponent';
import ProductListHeader from '../../../../components/productListHeader/ProductListHeader';

const ProductListPage = () => {
  const [qSearchParam, setQSearcheParam] = useCustomSearchParam('q'); // параметры поиска

  const { data: products, error, isLoading } = useGetProductsQuery(qSearchParam);

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
    return <ErrorPage er={error} />;
  }
  return (
    <div>
      <ProductListHeader onSearch={onClick} />
      {/* <SearchBar onSearch={onClick} /> */}
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
