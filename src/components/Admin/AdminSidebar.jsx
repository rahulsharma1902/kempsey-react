import React from 'react';

const Sidebar = () => {
  return (
    <div className="nk-sidebar nk-sidebar-fixed is-dark" data-content="sidebarMenu">
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-menu-trigger">
          <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu">
            <em className="icon ni ni-arrow-left"></em>
          </a>
          <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu">
            <em className="icon ni ni-menu"></em>
          </a>
        </div>
        <div className="nk-sidebar-brand">
          <a href="/admin-dashboard" className="logo-link nk-sidebar-logo">
            <h4 className="text-light">kempsey</h4>
          </a>
        </div>
      </div>
      <div className="nk-sidebar-element nk-sidebar-body">
        <div className="nk-sidebar-content">
          <div className="nk-sidebar-menu" data-simplebar>
            <ul className="nk-menu">
              <li className="nk-menu-heading">
                <h6 className="overline-title text-primary-alt">
                  <a href="/admin-dashboard">Dashboard</a>
                </h6>
              </li>
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-icon"><em className="icon ni ni-card-view"></em></span>
                  <span className="nk-menu-text">Products</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="/admin-dashboard/products/categories" className="nk-menu-link">
                      <span className="nk-menu-text">Categories</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/admin-dashboard/products/brands" className="nk-menu-link">
                      <span className="nk-menu-text">Brands</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
