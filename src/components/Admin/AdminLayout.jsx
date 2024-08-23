import React, { useState } from 'react';
import SidebarComponent from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Footer from './AdminFooter';
import { Container, Box } from '@mui/material';

const AdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SidebarComponent isSidebarCollapsed={isSidebarCollapsed} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: isSidebarCollapsed ? '80px' : '250px',
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        <Container component="main" sx={{ flex: 1, mt: 10, overflow: 'auto' }}>
          {children}
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminLayout;
