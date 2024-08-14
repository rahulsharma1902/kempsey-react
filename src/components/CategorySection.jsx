import React from 'react';
import Categorymodulehome from '../components/Categorymodulehome.jsx';
import CategorySidebar from '../components/CategorySidebar.jsx';

const CategorySection = () => {
  return (
    <section className="category-sec p-130">
      <div className="container">
        <div className="category-content">
          <div className="categry-lft">
            <div className='sidebar'>
              <CategorySidebar />
            </div>
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
