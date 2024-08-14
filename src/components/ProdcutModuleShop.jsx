import React from 'react';
import ProductList from '../components/ProductList.jsx';


const ProdcutModuleShop = () => {
  return (
    <div className="category_products_wrapper light">
        <div className='productssection_head'>
            <div className='title_side'>
            <h2 className='size46'>Camping</h2>
            <div className='product_count_wrap'>
                <span className='product_count'>100</span> Results
            </div>
            </div>
            <div className='filter_side'>
            <div className='sort_by_filter'>
            <label htmlFor="sort_by">Sort By:</label>
            <select id="sort_by">
            
                <option value="Alphabetic_Ato_z">Alphabetic (A-Z)</option>
                <option value="Alphabetic_Zto_A">Alphabetic (Z-A)</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
            </select>
          </div>
            </div>
        </div>

        <ProductList />
    </div>
  );
};

export default ProdcutModuleShop;
