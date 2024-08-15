import React from 'react';
import SidebarComponent from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Footer from './AdminFooter';
import Container from '@mui/material/Container';

// Import CSS files
// import './../../assets/admin/assets/css/dashlite.css?ver=3.1.2';
// import './../../assets/admin/assets/css/theme.css?ver=3.1.2';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarComponent />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <Container
          component="main"
          style={{ flex: 1, display: '', flexDirection: '', marginTop: '100px' }}
        >
          {children}
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
