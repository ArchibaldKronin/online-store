import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
