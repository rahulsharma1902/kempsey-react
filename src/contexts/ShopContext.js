import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const updateFilteredProducts = (filters) => {
    const filtered = products.filter((product) => {
      return true; 
    });
    setFilteredProducts(filtered);
  };

  return (
    <ProductContext.Provider value={{ products, filteredProducts, updateProducts, updateFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
