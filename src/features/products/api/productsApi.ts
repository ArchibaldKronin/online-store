import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getProductById, getProducts } from './productsApiService';
import { Product } from '../../../types';
import generateErrorInRTK from '../../../functions/error-functions/generateErrorInRTK';
import { BASE_URL_PRODUCTS } from '../../../constantst';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_PRODUCTS }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[] | null, void | string>({
      queryFn: async (query?: string) => {
        try {
          const data = await getProducts(query);
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
    getProductById: builder.query<Product | null, string>({
      queryFn: async (id) => {
        try {
          const data = await getProductById(id);
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;

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
