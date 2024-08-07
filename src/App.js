import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import './css/responsive.css';
import AdminRoutes from './routes/AdminRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/" element={<HomePage />} /> {/* Default route */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
