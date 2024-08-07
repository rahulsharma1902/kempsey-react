import React from 'react';
import Sidebar from './AdminSidebar';
import Header from './AdminHeader';
import Footer from './AdminFooter';

// Import CSS files
import './../../assets/admin/assets/css/dashlite.css?ver=3.1.2';
import './../../assets/admin/assets/css/theme.css?ver=3.1.2';

const Layout = ({ children }) => {
  

  return (
    <div className="nk-app-root">
      <div className="nk-main">
        <Sidebar />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
