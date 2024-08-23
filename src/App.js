import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import './css/responsive.css';
import AdminRoutes from './routes/AdminRoutes';
// import FrontRoutes from './routes/AdminRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
// import HomePage from './pages/HomePage';
// import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Logout from './components/Auth/Logout';
// import Footer from './components/Footer';
import Home from './pages/HomePage';
import ShopCamping from './pages/ShopCamping';
import ShopDetail from './pages/ShopDetail';
import CartPage from './pages/CartPage';
import Faq from './pages/Faq';
import GiftCertificates from './pages/GiftCertificates';
import AboutusPage from './pages/AboutusPage';
import Contact from './pages/Contact';
import CustomerServices from './pages/CustomerServices';
import Workshop from './pages/Workshop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import WorkshopBooking from './pages/WorkshopBooking';
import {CategoryProvider} from './contexts/CategoryContext';
import {HomeContentProvider} from './contexts/HomeContentContext';

function App() {
  return (
    <AuthProvider>
      <HomeContentProvider>
      <CategoryProvider>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
          {/* <Route path="/*" element={<FrontRoutes />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} /> 
          <Route path="/shop-camping" element={<ShopCamping />} />
          <Route path="/shop-camping-detail" element={<ShopDetail />} />
          <Route path="/about-us" element={<AboutusPage />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/Contact-us" element={<Contact />} /> 
          <Route path="/Faq" element={<Faq/>}/>
          <Route path="/GiftCertificates" element={<GiftCertificates/>}/>
          <Route path="/customer-services" element={<CustomerServices/>}/>
          <Route path="/Workshop" element={<Workshop/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="/workshop-booking" element={<WorkshopBooking/>}/>
        </Routes>
      </Router>

      <ToastContainer />
      </CategoryProvider>
      </HomeContentProvider>
    </AuthProvider>

  )}
export default App;
