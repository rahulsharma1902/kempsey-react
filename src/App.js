import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/style.css';
import logo from './logo.svg'; // Assuming you have the logo
import AdminRoutes from './routes/AdminRoutes';
// import FrontRoutes from './routes/AdminRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Logout from './components/Auth/Logout';
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
          {/* <Route path="/*" element={<FrontRoutes />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          {/* <Route path="/" element={<LoginPage />} />  */}
        </Routes>
      </Router>

      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
