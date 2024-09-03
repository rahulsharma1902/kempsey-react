import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import product1 from '../images/product1.png'; // Adjust the path
import product2 from '../images/prodcut2.png'; // Adjust the path

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product Name 01', price: 149.00, quantity: 1, image: product1 },
    { id: 2, name: 'Product Name 02', price: 149.00, quantity: 1, image: product2 }
  ]);

  const handleIncrement = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleInputChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: parsedValue } : item
      ));
    }
  };

  const handleDelete = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className='body_inner'>
        <div className='page'>
          <section className="cart_sec p-130 light">
            <div className="container">
              <div className="cart_content">
                <h4>Your Cart</h4>
                <div className="cart-container">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="cart-items">
                        <p className="cart_order">
                          YOUR ORDER (<span>{cartItems.length}</span> ITEM{cartItems.length > 1 ? 'S' : ''})
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
                            {cartItems.map(item => (
                              <tr key={item.id}>
                                <td data-title="Product Detail">
                                  <div className="product-info">
                                    <div className="prdt-img">
                                      <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className='prod_info_text'>
                                      <p>{item.name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td data-title="Qty">
                                  <div className='quantity_box'>
                                    <span className='quantity_toggle quantity_decr' onClick={() => handleDecrement(item.id)}>
                                      <i className="fa-solid fa-minus"></i>
                                    </span>
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                                      min="1"
                                      className="quantity_input"
                                    />
                                    <span className='quantity_toggle quantity_incr' onClick={() => handleIncrement(item.id)}>
                                      <i className="fa-solid fa-plus"></i>
                                    </span>
                                  </div>
                                </td>
                                <td data-title="Price"><strong>${item.price.toFixed(2)}</strong></td>
                                <td data-title="Delete"><Link className="delete-btn" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-xmark"></i></Link></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <Link className="add-more cta">Add More Items</Link>
                      </div>
                      <div className="cart-summary dark">
                        <div className='cart_summery_box'>
                          <h6>Coupon Code</h6>
                          <div className="coupon_apply">
                            <input type="text" placeholder="Enter coupon or gift card" />
                            <a className="cta light" href="javascript:void(0)">Apply</a>
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
