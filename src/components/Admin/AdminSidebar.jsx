import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, ProSidebarProvider } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaList, FaFilter, FaTags, FaPlusCircle } from 'react-icons/fa';
import '../../assets/Admin.css';

const SidebarComponent = () => {
  return (
    <ProSidebarProvider>
      <Sidebar style={{ height: '100vh', position: '', width: '250px' }}>
        <div style={{ padding: '24px', fontSize: '18px', color: 'white' }}>
          <Link to="/admin-dashboard" className="text-light" style={{ textDecoration: 'none' }}>kempsey</Link>
        </div>
        <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}>
            <Link to="/admin-dashboard">Dashboard</Link>
          </MenuItem>
          <SubMenu label="Products" icon={<FaList />} >
            <MenuItem >
              <Link to="/admin-dashboard/products">View</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/admin-dashboard/products/add">Add</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/admin-dashboard/products/categories">Product Categories</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/admin-dashboard/products/filters">Product Filtering</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/admin-dashboard/products/brands">Brands</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  );
};

export default SidebarComponent;
