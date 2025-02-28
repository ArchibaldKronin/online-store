import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/api/productsApi';

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
