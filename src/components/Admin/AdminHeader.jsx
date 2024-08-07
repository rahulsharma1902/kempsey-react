import React from 'react';

const Header = () => {
  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu">
              <em className="icon ni ni-menu"></em>
            </a>
          </div>
          <div className="nk-header-brand d-xl-none">
            {/* Brand Logo */}
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="dropdown user-dropdown">
                <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="user-info d-none d-md-block">
                      <div className="user-status">Administrator</div>
                      <div className="user-name dropdown-indicator">
                        {/* Replace with dynamic user info */}
                        User Name
                      </div>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        <span>AB</span>
                      </div>
                      <div className="user-info">
                        <span className="lead-text">User Name</span>
                        <span className="sub-text">user@example.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <a href="/admin-dashboard/setting">
                          <em className="icon ni ni-setting-alt"></em>
                          <span>Account Setting</span>
                        </a>
                      </li>
                      <li>
                        <a className="dark-switch" href="#">
                          <em className="icon ni ni-moon"></em>
                          <span>Dark Mode</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <a href="/logout">
                          <em className="icon ni ni-signout"></em>
                          <span>Sign out</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
