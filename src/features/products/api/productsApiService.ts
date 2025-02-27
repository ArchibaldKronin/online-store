import { Product } from '../../../types';

export const getProducts = async (query?: string): Promise<Product[] | null> => {
  const response = await fetch('/temp/data.json');
  const products: Product[] = await response.json();
  console.log(products);
  return products;
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
