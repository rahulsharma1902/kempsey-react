import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { addCart, removeCart, getCartById } from '../api/apiCarts.js';
import defaultImage from '../images/default.jpeg';
import { Skeleton, Box, Typography } from '@mui/material';
import { applyCoupon } from '../api/apiCoupons.js';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [tempId, setTempId] = useState(localStorage.getItem('user_temp_id') || '');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartById(tempId);
        if (response.data) {
          setCartItems(response.data);
        } else {
          // Handle fetch error
        }
      } catch (error) {
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [tempId]);

  const handleQuantityChange = async (id, change) => {
    const updatedItem = cartItems.find(item => item.id === id);
    if (updatedItem) {
      const newQuantity = change === 'increment'
        ? parseInt(updatedItem.quantity) + 1
        : Math.max(parseInt(updatedItem.quantity) - 1, 1);

      const product_id = parseInt(updatedItem.product_id);
      const form = new FormData();
      form.append('product_id', product_id);
      form.append('quantity', newQuantity);
      form.append('tempId', tempId);
      form.append('updateQty', true);

      try {
        const response = await addCart(form);
        if (response.success) {
          setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          ));
        } else {
          alert(response.message);
        }
      } catch (error) {
        setError("Failed to update cart.");
      }
    }
  };

  const handleInputChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      handleQuantityChange(id, parsedValue);
    }
  };

  const handleCouponCodeChange = (value) => {
    setCouponCode(value);
  };

  const handleApplyCouponCode = async () => {
    const form = new FormData();
    form.append('coupon_code', couponCode);
    form.append('tempId', tempId);

    try {
      const data = await applyCoupon(form);
      if (data.success) {
        alert('Coupon applied successfully!');
        // Update the cart total or any related state here if needed
      } else {
        alert(data.message || 'Failed to apply the coupon code.');
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Failed to apply coupon code.");
    }
  };

  const handleDelete = async (id) => {
    const data = await removeCart(id);
    if (data.success) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      alert(data.message);
    }
  };

  const totalAmount = cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (loading) {
    return (
      <Layout>
        <div className='body_inner'>
          <div className='page'>
            <section className="cart_sec p-130 light">
              <div className="container">
                <div className="cart_content">
                  <Typography variant="h4">
                    <Skeleton width="150px" />
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                    <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2 }} />
                    <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2 }} />
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    <Skeleton width="120px" />
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="100%" height={40} />
                    <Skeleton variant="text" width="100%" height={40} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="100%" height={40} sx={{ mt: 1 }} />
                  </Box>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='body_inner'>
        <div className='page'>
          <section className="cart_sec p-130 light">
            <div className="container">
              <div className="cart_content">
                <h4>Your Cart</h4>
                <div className="cart-container">
                  {cartItems?.length > 0 ? (
                    <>
                      <div className="cart-items">
                        <p className="cart_order">
                          YOUR ORDER (<span>{cartItems?.length}</span> ITEM{cartItems?.length > 1 ? 'S' : ''})
                        </p>
                        <table className='cart_table'>
                          <thead>
                            <tr>
                              <th>Product Detail</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems?.map(item => (
                              <tr key={item.id}>
                                <td data-title="Product Detail">
                                  <div className="product-info">
                                    <div className="prdt-img">
                                      <img 
                                        src={
                                          item.product.images && item.product.thumbnail_index !== null 
                                            ? JSON.parse(item.product.images)[item.product.thumbnail_index] || defaultImage
                                            : defaultImage
                                        } 
                                        alt={item.product.name} 
                                      />
                                    </div>
                                    <div className='prod_info_text'>
                                      <p>{item.product?.name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td data-title="Qty">
                                  <div className='quantity_box'>
                                    <span className='quantity_toggle quantity_decr' onClick={() => handleQuantityChange(item.id, 'decrement')}>
                                      <i className="fa-solid fa-minus"></i>
                                    </span>
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                                      min="1"
                                      className="quantity_input"
                                    />
                                    <span className='quantity_toggle quantity_incr' onClick={() => handleQuantityChange(item.id, 'increment')}>
                                      <i className="fa-solid fa-plus"></i>
                                    </span>
                                  </div>
                                </td>
                                <td data-title="Price"><strong>${(item.product.price * item.quantity).toFixed(2)}</strong></td>
                                <td data-title="Delete">
                                  <Link className="delete-btn" onClick={() => handleDelete(item.id)}>
                                    <i className="fa-solid fa-xmark"></i>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <Link to="/checkout" className="add-more cta">Proceed To Checkout</Link>
                      </div>
                      <div className="cart-summary dark">
                        <div className='cart_summery_box'>
                          <h6>Coupon Code</h6>
                          <div className="coupon_apply">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => handleCouponCodeChange(e.target.value)}
                              name="couponCode"
                              placeholder="Enter coupon or gift card"
                            />
                            <button onClick={handleApplyCouponCode} className="cta light">Apply</button>
                          </div>
                          <div className="amnt_detail">
                            <span className="title">Estimate Shipping</span>
                            <ul>
                              <li>Subtotal<strong>${totalAmount.toFixed(2)}</strong></li>
                              <li>Shipping<strong>$0.00</strong></li>
                              <li>Estimated taxes<strong>$0.00</strong></li>
                            </ul>
                            <span className="ad_info">Additional taxes and fees will be calculated at checkout</span>
                          </div>
                          <div className="total-amount">
                            <p>Estimated Order Total</p>
                            <p>${totalAmount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Your cart is empty</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
