import React from 'react';
import Header from './Header';


const Layout = ({ children }) => {
  

  return (
    <div className="">
          <Header />
          <div className="">
            {children}
          </div>
    </div>
  );
};

export default Layout;
