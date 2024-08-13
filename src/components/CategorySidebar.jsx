import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Camping', link: '/camping' },
  { id: 2, name: 'Fishing', link: '/fishing' },
  { id: 3, name: 'Bike shop', link: '/bike-shop' },
  { id: 4, name: 'Gun Shop', link: '/gun-shop' },
  { id: 5, name: 'Accessories', link: '/accessories' },
  { id: 6, name: 'Workshop', link: '/workshop' },
];

const CategorySidebar = () => {
  return (
    <div className="CategorySidebar">
      <h4>Categories</h4>
      <ul className="categories">
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={category.link} className="dwn_arw">
              {category.name} <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
