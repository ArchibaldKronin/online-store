import { createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from '../app/store';

const router = createBrowserRouter(routes);

const AppRouterProvider = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default AppRouterProvider;
