import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import ProtectedRouteElement from '../../services/protected-route-element';
import AppHeader from '../app-header/app-header';

export default function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={
          <ProtectedRouteElement onlyUnAuth={true}>
            <LoginPage />
          </ProtectedRouteElement>} />
        <Route path="/register" element={
          <ProtectedRouteElement onlyUnAuth={true}>
            <RegisterPage />
          </ProtectedRouteElement>} />
        <Route path="/forgot-password" element={
          <ProtectedRouteElement onlyUnAuth={true}>
            <ForgotPasswordPage />
          </ProtectedRouteElement>} />
        <Route path="/reset-password" element={
          <ProtectedRouteElement onlyUnAuth={true}>
            <ResetPasswordPage />
          </ProtectedRouteElement>} />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
      </Routes>
    </Router>
  );
} 