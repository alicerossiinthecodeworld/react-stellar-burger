import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = (children) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const location = useLocation();
  const from = location.state?.from || '/';
  if (isAuthenticated) {
    return <Navigate to={ from } />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location}}/>;
  }
  return children;
};

export default ProtectedRouteElement;
