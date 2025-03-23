import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { changeProductStock, getProductById, getProducts } from './productsApiService';
import { Product } from '../../../types';
import generateErrorInRTK from '../../../functions/error-functions/generateErrorInRTK';
import { BASE_URL_PRODUCTS } from '../../../constantst';
import { matchSorter } from 'match-sorter';
import { SortSelectStates } from '../../../components/selectComponent/SelectSortComponent';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_PRODUCTS }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[] | null,
      { query?: string; page: string; sort?: SortSelectStates }
    >({
      queryFn: async ({ query, page = '1', sort }) => {
        try {
          const params = new URLSearchParams();
          if (!query) {
            params.set('page', page);
            params.set('limit', '10');
            if (sort) {
              params.set('sortBy', 'price');
              params.set('order', sort);
            }
          }
          const paramsString = params.toString();

          let data = await getProducts(paramsString);

          if (data) {
            if (query) {
              data = matchSorter(data, query, { keys: ['title', 'category'] });
            }
          }

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
    changeProductStock: builder.mutation<
      Product | null,
      { id: string; stock: number; countInCart: number }
    >({
      queryFn: async ({ id, stock, countInCart }) => {
        const newStock = stock - countInCart;

        try {
          const data = await changeProductStock({ id, newStock });
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useChangeProductStockMutation } =
  productsApi;
