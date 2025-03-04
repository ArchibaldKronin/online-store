import { BASE_URL_PRODUCTS } from '../../../constantst';
import { Product } from '../../../types';
import { matchSorter } from 'match-sorter';

export const getProducts = async (query?: string): Promise<Product[] | null> => {
  // const response = await fetch(`${BASE_URL_PRODUCTS}`);
  // if (!response.ok) {
  //   throw {
  //     status: response.status,
  //     statusText: response.statusText,
  //   };
  // }
  // const products: Product[] = await response.json();
  // return products;

  const response = await fetch('/temp/data.json');
  let products: Product[] = await response.json();

  if (query) {
    products = matchSorter(products, query, { keys: ['title', 'category'] });
  }

  console.log(products);
  console.log('Сортированные', products);
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

// const BASE_URL = "https://myapi.com/products";

// export const fetchProducts = async () => {
//   const response = await fetch(`${BASE_URL}`);
//   if (!response.ok) throw new Error("Failed to fetch products");
//   return response.json();
// };

// export const fetchProductById = async (id: string) => {
//   const response = await fetch(`${BASE_URL}/${id}`);
//   if (!response.ok) throw new Error("Product not found");
//   return response.json();
// };

// export const createProduct = async (product: any) => {
//   const response = await fetch(`${BASE_URL}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(product),
//   });
//   if (!response.ok) throw new Error("Failed to create product");
//   return response.json();
// };
