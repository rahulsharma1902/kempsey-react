import React, { useState } from 'react';
import Categorymodulehome from '../components/Categorymodulehome.jsx';


const CategorySection = () => {
  return (
    <section className="category-sec p-130">
      <div className="container">
        <div className="category-content">
          <div className="categry-lft">
            <h4>Categories</h4>
            <ul className="categories">
              <li>
                <a href="#" className="dwn_arw">
                  Camping <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" className="dwn_arw">
                  Fishing <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" className="dwn_arw" >
                  Bike shop <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" className="dwn_arw">
                  Gun Shop <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" className="dwn_arw">
                  Accessories <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" className="dwn_arw">
                  Workshop
                </a>
              </li>
            </ul>
          </div>
          <div className="categry-rgt">
            <Categorymodulehome />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
