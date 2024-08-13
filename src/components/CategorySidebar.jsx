import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Camping', link: '/shop-camping' },
  { id: 2, name: 'Fishing', link: '/shop-camping' },
  { id: 3, name: 'Bike shop', link: '/shop-camping' },
  { id: 4, name: 'Gun Shop', link: '/shop-camping' },
  { id: 5, name: 'Accessories', link: '/shop-camping' },
  { id: 6, name: 'Workshop', link: '/shop-camping' },
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
