import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../api/productsApi';
import Loader from '../../../../components/loader/Loader';
import ErrorPage from '../../../../components/error-page/ErrorPage';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const ProductPage = () => {
  const { productId } = useParams();

  if (!productId) {
    throw new Error('"productId" отсутствует в URL');
  }

  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  console.log(product);

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage er={error as FetchBaseQueryError} />;
  return <>Product Page</>;
};

export default ProductPage;
