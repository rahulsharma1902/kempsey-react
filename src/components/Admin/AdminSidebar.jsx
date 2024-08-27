import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaList } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import '../../assets/Admin.css';
import { Box } from '@mui/material';

const SidebarComponent = ({ isSidebarCollapsed }) => {
  return (
    <Sidebar
      collapsed={isSidebarCollapsed}
      style={{ height: '100vh', width: isSidebarCollapsed ? '80px' : '250px', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
    >
      <Box sx={{ padding: 2, fontSize: 18, color: 'white' }}>
        <Link to="/admin-dashboard" className="text-light" style={{ textDecoration: 'none' }}>Kempsey</Link>
      </Box>
      <Menu iconShape="circle">
        <MenuItem icon={<FaTachometerAlt />}>
          <Link to="/admin-dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Dashboard</Link>
        </MenuItem>
        <SubMenu label="Products" icon={<AiFillProduct />} >
          <MenuItem>
            <Link to="/admin-dashboard/products" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>View</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/products/add" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Add</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/products/categories" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Product Categories</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/products/filters" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Product Filtering</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/products/brands" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Brands</Link>
          </MenuItem>
        </SubMenu>
        <SubMenu label="Storefront" icon={<CgWebsite />} >
          <MenuItem>
            <Link to="/admin-dashboard/storefront/carousel" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Home Page Carousel</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/storefront/home-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Home Page Content</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/storefront/about-us-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>About Us Content</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/storefront/site-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Site Content</Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
