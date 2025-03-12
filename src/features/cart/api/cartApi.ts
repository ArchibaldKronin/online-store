import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_CART } from '../../../constantst';
import { Cart, CartElement } from '../../../types';
import {
  changeCartElementQuantity,
  createElementInCart,
  deleteCartElement,
  getCart,
  getCartElementById,
} from './cartApiService';
import generateErrorInRTK from '../../../functions/error-functions/generateErrorInRTK';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_CART }),
  endpoints: (builder) => ({
    getCart: builder.query<Cart | null, void>({
      queryFn: async () => {
        try {
          const data = await getCart();
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
    getCarElementById: builder.query<CartElement | null, string>({
      queryFn: async (id) => {
        try {
          const data = await getCartElementById(id);
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
    createElementInCart: builder.mutation<CartElement | null, string>({
      queryFn: async (productId: string) => {
        try {
          const data = await createElementInCart(productId);
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
    changeCartElementQuantity: builder.mutation<CartElement | null, { id: string; count: number }>({
      queryFn: async ({ id, count }) => {
        try {
          const data = await changeCartElementQuantity({ id, count });
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
    deleteCartElement: builder.mutation<CartElement | null, string>({
      queryFn: async (id: string) => {
        try {
          const data = await deleteCartElement(id);
          return { data };
        } catch (error: unknown) {
          return generateErrorInRTK(error);
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useChangeCartElementQuantityMutation,
  useCreateElementInCartMutation,
  useDeleteCartElementMutation,
  useGetCarElementByIdQuery,
} = cartApi;
