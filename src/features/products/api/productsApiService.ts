import { BASE_URL_PRODUCTS } from '../../../constantst';
import { Product } from '../../../types';

export const getProducts = async (pageParams: string): Promise<Product[] | null> => {
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

export const changeProductStock = async (arg: { id: string; newStock: number }) => {
  const response = await fetch(`${BASE_URL_PRODUCTS}/${arg.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ stock: arg.newStock }),
  });
  if (!response.ok)
    throw {
      status: response.status,
      statusText: response.statusText,
    };
  const product: Product = await response.json();
  return product;
};
