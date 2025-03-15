import { SortSelectStates } from '../../../components/selectComponent/SelectSortComponent';
import { BASE_URL_PRODUCTS } from '../../../constantst';
import { Product } from '../../../types';
import { matchSorter } from 'match-sorter';

export const getProducts = async (
  pageParams: string,
  // query?: string,
  // sort?: SortSelectStates,
): Promise<Product[] | null> => {
  // const url = new URL(`${BASE_URL_PRODUCTS}`);
  // if (!query && !sort) {
  //   url.searchParams.append('page', page);
  //   url.searchParams.append('limit', '10');
  // }

  const response = await fetch(`${BASE_URL_PRODUCTS}?${pageParams}`);
  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
    };
  }
  const products: Product[] = await response.json();
  return products;
};

export const getProductById = async (id: string) => {
  const response = await fetch(`${BASE_URL_PRODUCTS}/${id}`);
  if (!response.ok)
    throw {
      status: response.status,
      statusText: response.statusText,
    };
  const product: Product = await response.json();
  return product;
};

export const changeProductStock = async (arg: {
  id: string;
  stock: number;
  countInCart: number;
}) => {
  const newStock = arg.stock - arg.countInCart;
  const response = await fetch(`${BASE_URL_PRODUCTS}/${arg.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ stock: newStock }),
  });
  if (!response.ok)
    throw {
      status: response.status,
      statusText: response.statusText,
    };
  const product: Product = await response.json();
  return product;
};
