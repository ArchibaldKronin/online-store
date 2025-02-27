import React from 'react';
import ErrorPage from '../components/error-page/ErrorPage';
import HomePage from '../pages/home-page/HomePage';
import { RouteObject } from 'react-router-dom';
import ProductListPage from '../features/products/pages/product-list-page/ProductListPage';
import RootLayout from '../pages/root-layout/RootLayout';
import ProductPage from '../features/products/pages/product-page/ProductPage';
import CartPage from '../features/cart/pages/CartPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(RootLayout),
    errorElement: React.createElement(ErrorPage),
    children: [
      {
        errorElement: React.createElement(ErrorPage),
        children: [
          {
            index: true,
            element: React.createElement(HomePage),
          },
          {
            path: 'products',
            element: React.createElement(ProductListPage),
          },
          {
            path: 'products/:productId',
            element: React.createElement(ProductPage),
          },
          {
            path: 'cart',
            element: React.createElement(CartPage),
          },
        ],
      },
    ],
  },
];

export default routes;
