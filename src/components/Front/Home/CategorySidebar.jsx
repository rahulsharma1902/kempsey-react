import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../../contexts/CategoryContext';
import Skeleton from '@mui/material/Skeleton';

const CategorySidebar = () => {
  const { ParentCategories, loading } = useCategories();

  return (
    <div className="CategorySidebar">
      <h4>Categories</h4>
      <ul className="categories">
        {loading ? (
          // Render skeletons when loading
          Array.from(new Array(6)).map((_, index) => (
            <li key={index}>
              <Skeleton variant="text" width={265} height={50} />
            </li>
          ))
        ) : (
          // Render actual categories when loaded
          ParentCategories.map((category) => (
            <li key={category?.id ?? ''}>
              <Link to={category?.slug ?? ''} className="dwn_arw">
                {category?.name ?? ''} <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CategorySidebar;
