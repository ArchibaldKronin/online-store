import { Navigate } from 'react-router-dom';

const HomePage = () => {
  return <Navigate to={'/products'} replace />;
};

export default HomePage;
