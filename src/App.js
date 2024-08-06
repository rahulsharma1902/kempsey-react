import React from 'react';
import './css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ForgotPassword from './pages/ForgotPassword.js';
import Header from './components/Header.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/" element={<LoginPage />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
