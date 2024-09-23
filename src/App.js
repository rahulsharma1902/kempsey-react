import React, { useState, useContext,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import './css/responsive.css';
import AdminRoutes from './routes/AdminRoutes';
// import FrontRoutes from './routes/AdminRoutes';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
// import HomePage from './pages/HomePage';
// import Header from './components/Header';
import { AuthProvider , AuthContext} from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Logout from './components/Auth/Logout';
// import Footer from './components/Footer';
import Home from './pages/HomePage';
import ShopPage from './pages/Shop';
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
import Checkout from './pages/Checkout';
import {CategoryProvider} from './contexts/CategoryContext';
import {HomeContentProvider} from './contexts/HomeContentContext';
import {AboutContentProvider} from './contexts/AboutContentContext';
import {ServiceContentProvider} from './contexts/WorkshopContext';
import {StoreFrontProvider} from './contexts/StoreFrontContext';
import {ProductProvider} from './contexts/ShopContext';
import {CartProvider} from './contexts/CartContext';

const stripePromise = loadStripe('pk_test_51O4JlISHTa61PzN8pNFAWjxMHk8MejtNaaC54b9nSLkW2rFjOhHWnxHYnCQaZj8RTyNiL9WamgSGwV9GgHi1k8LF00N1SGCLzG');

function App() {
  const { user } = useContext(AuthContext); 
  const [tempId, setTempId] = useState(localStorage.getItem('user_temp_id') || '');

  useEffect(() => {
    const fetchTempId = async () => {
      try {
        const response = await fetch('https://sagmetic.site/2023/laravel/kempsey/public/api/generate-temp-id');
        const result = await response.json();
        const newTempId = result.temp_id;
        setTempId(newTempId);
        localStorage.setItem('user_temp_id', newTempId);
      } catch (error) {
        console.error('Failed to fetch temporary ID:', error);
      }
    };

    if (!user) {
      if (!tempId) {
        fetchTempId();
      }
    } 
    else {
      // if(tempId){

      // }
      setTempId('');
      localStorage.removeItem('user_temp_id');
    }
  }, [user,tempId]);

  return (
    <AuthProvider>
      <HomeContentProvider>
        <AboutContentProvider>
          <ServiceContentProvider>
            <StoreFrontProvider>
              <CategoryProvider>
                <ProductProvider>
                  <CartProvider>
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
                          <Route path="/shop/:category" element={<ShopPage />} />
                          {/* <Route path="/camping" element={<ShopCamping />} /> */}
                          <Route path="/shop-detail/:slug" element={<ShopDetail />} />
                          <Route path="/about-us" element={<AboutusPage />} />
                          <Route path="/cart" element={<CartPage />} /> 
                          <Route path="/Contact-us" element={<Contact />} /> 
                          <Route path="/Faq" element={<Faq/>}/>
                          <Route path="/GiftCertificates" element={<GiftCertificates/>}/>
                          <Route path="/customer-services" element={<CustomerServices/>}/>
                          <Route path="/Workshop" element={<Workshop/>}/>
                          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                          <Route path="/workshop-booking" element={<WorkshopBooking/>}/>
                          <Route
                              path="/checkout"
                              element={
                                <Elements stripe={stripePromise}>
                                  <Checkout />
                                </Elements>
                              }
                            />

                        </Routes>
                      </Router>
                  </CartProvider>

                <ToastContainer />
                </ProductProvider>
              </CategoryProvider>
            </StoreFrontProvider>
          </ServiceContentProvider>
        </AboutContentProvider>
      </HomeContentProvider>
    </AuthProvider>

  )}
export default App;
