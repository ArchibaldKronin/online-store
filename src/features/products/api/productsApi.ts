import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getProducts } from './productsApiService';
import { Product } from '../../../types';
import generateErrorInRTK from '../../../functions/error-functions/generateErrorInRTK';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://67b71c9e2bddacfb270db7b8.mockapi.io/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[] | null, void | string>({
      queryFn: async () => {
        try {
          const data = await getProducts();
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { fetchProducts, fetchProductById, createProduct } from "./productsApiService";

// export const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://myapi.com" }),
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       queryFn: async () => {
//         try {
//           const data = await fetchProducts();
//           return { data };
//         } catch (error) {
//           return { error: error as Error };
//         }
//       },
//     }),
//     getProductById: builder.query({
//       queryFn: async (id: string) => {
//         try {
//           const data = await fetchProductById(id);
//           return { data };
//         } catch (error) {
//           return { error: error as Error };
//         }
//       },
//     }),
//     addProduct: builder.mutation({
//       queryFn: async (product: any) => {
//         try {
//           const data = await createProduct(product);
//           return { data };
//         } catch (error) {
//           return { error: error as Error };
//         }
//       },
//     }),
//   }),
// });

// export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation } = productsApi;
