import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  

  return (
    <div className="front_page">
          <Header />
          <div className="">
            {children}
          </div>
          <Footer/>
    </div>
  );
};

export default Layout;
