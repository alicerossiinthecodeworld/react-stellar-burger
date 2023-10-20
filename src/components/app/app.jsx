import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';

export default function App() {
  return (
      <Router>
        <Routes>
             <Route path="/" element={<MainPage />}/>
             <Route path="/login" element={<LoginPage/>}/>
             <Route path="/register" element={<RegisterPage/>}/>
             <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
             <Route path="/reset-password" element={<ResetPasswordPage/>}/>
             <Route path="/profile" element={<ProfilePage/>}/>
         </Routes>
      </Router>
  );
} 