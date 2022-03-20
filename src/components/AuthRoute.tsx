import { Navigate, useLocation } from 'react-router-dom';
import { SESSION_STORAGE_KEY } from '../constants/auth';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const userData = localStorage.getItem(SESSION_STORAGE_KEY);

  if (!userData) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default AuthRoute;
