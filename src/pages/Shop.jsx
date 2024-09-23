import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout.jsx';
import ProductsectionShop from '../components/Front/Shop/ProductsectionShop.jsx';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import { useParams, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import CircularProgress from '@mui/material/CircularProgress';
import { getCategoryById } from '../api/apiCategories.js';

const Shop = () => {
  const { category } = useParams(); 
  const [title, setTitle] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      setTitle('Not Found');

      try {
        // Fetch the category using the API function
        const response = await getCategoryById(category);
        if (response && response?.data?.name) {
          setTitle(response.data.name); 
        } else {
          setTitle('Not Found')
          // setError('Category not found');
        }
      } catch (err) {
        // setError('An error occurred while fetching the category');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategory();
    }
  }, [category]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <CircularProgress />
          <p>Loading category...</p>
        </div>
      </Layout>
    );
  }

  // if (error) {
  //   return <Navigate to="/404" replace />;
  // }

  return (
    <Layout>
      <div className='body_inner'>
        <div className='page'>
          <div className='banner_section'>
            <InnerpageBanner data={{ 'heading': title}} />
          </div>
          <ProductsectionShop title={title} />
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
