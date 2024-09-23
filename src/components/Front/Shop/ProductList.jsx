import React from 'react';
import { useProductContext } from '../../../contexts/ShopContext';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.jpeg';

const ProductList = () => {
  const { products } = useProductContext();
  // console.warn(products);

  // Ensure products is an array
  const productArray = Array.isArray(products) ? products : [];

  return (
    <div className="prdt_list">
      {productArray.length > 0 ? (
        productArray.map(product => {
          const imageIndex = product.thumbnail_index || 0;
          let images = [];
          try {
            images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
          } catch (e) {
            console.error("Error parsing images JSON:", e);
            images = [];
          }
          const imageSrc = Array.isArray(images) && images.length > 0
            ? (imageIndex >= 0 && imageIndex < images.length ? images[imageIndex] : images[0])
            : defaultImage;

          return (
            <div key={product.id} className='product_box'>
              <div className="prdt">
                <Link to={`/shop-detail/${product.slug}`} className="prdt-img">
                  <img src={imageSrc} alt={product.slug} />
                </Link>
                <div className="prdt-info">
                  <h6><Link to={`/shop-detail/${product.slug}`}>{product?.name}</Link></h6>
                  <div className="btm-info">
                    <div className='prodcut_category'>{product?.category?.name}</div>
                    <div className='price'>${product.price}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available</p>
      )}
    </div>
  );

};

export default ProductList;
