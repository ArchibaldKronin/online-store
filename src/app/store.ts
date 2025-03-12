import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/api/productsApi';
import { cartApi } from '../features/cart/api/cartApi';

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, cartApi.middleware),
});

export default store;
