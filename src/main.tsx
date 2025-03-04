import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import AppRouterProvider from './routes/AppRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouterProvider />
  </StrictMode>,
);

// createRoot(document.getElementById('root')!).render(<AppRouterProvider />);
