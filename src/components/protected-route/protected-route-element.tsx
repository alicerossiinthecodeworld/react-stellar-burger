import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactElement} from 'react';
import { RootState } from '../../services/store';
import React from 'react';

type ProtectedRouteElementProps = {
  onlyUnAuth?: boolean,
  children: ReactElement | null
}

const ProtectedRouteElement = ({ onlyUnAuth = false, children }:ProtectedRouteElementProps) => {
  const user = useSelector((state:RootState) => state.auth.user);
  const location = useLocation()

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRouteElement;
