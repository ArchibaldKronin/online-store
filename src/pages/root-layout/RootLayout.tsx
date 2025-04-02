import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import classNames from 'classnames';
import styles from './RootLayout.module.scss';

const RootLayout = () => {
  return (
    <div className={classNames(styles.mainContainer)}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
