import React, { useState } from 'react';
import { useProductContext } from '../../../contexts/ShopContext.js';
import ProductList from './ProductList.jsx';

const ProductModuleShop = ({ title }) => {
    const { products, loading, error, updateProducts } = useProductContext();
    const [sortBy, setSortBy] = useState('Alphabetic_Ato_z');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortBy(value);
        sortProducts(value);
    };

    const sortProducts = (criteria) => {
        let sortedProducts = [...products];
        switch (criteria) {
            case 'Alphabetic_Ato_z':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Alphabetic_Zto_A':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price_low_high':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price_high_low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            default:
                break;
        }
        updateProducts(sortedProducts);
    };

    return (
        <div className="category_products_wrapper light">
            <header className="productssection_head">
                <div className="title_side">
                    <h2 className="size46">{title || ''}</h2>
                    <div className="product_count_wrap">
                        <span className="product_count">{products.length}</span> Results
                    </div>
                </div>
                <div className="filter_side">
                    <label htmlFor="sort_by" className="sort_by_filter">
                        Sort By:
                        <select id="sort_by" name="sort_by" value={sortBy} onChange={handleSortChange}>
                            <option value="Alphabetic_Ato_z">Alphabetic (A-Z)</option>
                            <option value="Alphabetic_Zto_A">Alphabetic (Z-A)</option>
                            <option value="price_low_high">Price: Low to High</option>
                            <option value="price_high_low">Price: High to Low</option>
                            <option value="newest">Newest</option>
                        </select>
                    </label>
                </div>
            </header>

            <ProductList products={products} />
        </div>
    );
};

export default ProductModuleShop;
