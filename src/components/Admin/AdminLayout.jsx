import React from 'react';
import SidebarComponent from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Footer from './AdminFooter';

// Import CSS files
import './../../assets/admin/assets/css/dashlite.css?ver=3.1.2';
import './../../assets/admin/assets/css/theme.css?ver=3.1.2';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarComponent />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <div className='nk-content' style={{ flex: 1, overflowY: 'auto', marginTop: '100px' }}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
