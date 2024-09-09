import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt,FaQuestionCircle,FaQuoteLeft, FaList } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import '../../assets/Admin.css';
import { Box } from '@mui/material';
import { RiCustomerServiceFill } from "react-icons/ri";
import { IoStorefrontSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

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
          <MenuItem>
            <Link to="/admin-dashboard/storefront/workshop-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Workshop Content</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/storefront/customer-service-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Customer Service Content</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/storefront/contact-us-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Contact Us Content</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/storefront/faq-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Faq Content</Link>
          </MenuItem>
          <SubMenu label="FAQs" icon={<FaQuestionCircle />} >
            <MenuItem>
              <Link to="/admin-dashboard/faq-categories" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Faq Category</Link>
            </MenuItem>
            <SubMenu label="Faqs" icon={<FaQuoteLeft />} >
              <MenuItem>
                <Link to="/admin-dashboard/faqs" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>View</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admin-dashboard/faqs/add" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Add</Link>
              </MenuItem>
            </SubMenu>
          </SubMenu>
        </SubMenu>

        <SubMenu label="Servicing" icon={<RiCustomerServiceFill />} >
          <MenuItem>
            <Link to="/admin-dashboard/services" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Services</Link>
          </MenuItem>
          <SubMenu label="Stores" icon={<IoStorefrontSharp />} >
          <MenuItem>
            <Link to="/admin-dashboard/stores" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>View</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin-dashboard/stores/add" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Add</Link>
          </MenuItem>
        </SubMenu>
        </SubMenu>

        <MenuItem icon={<SlCalender />}>
          <Link to="/admin-dashboard/bookings" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>Bookings</Link>
        </MenuItem>

      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
