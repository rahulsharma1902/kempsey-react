import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import iconshop from '../../../images/shoppay-img.svg';
import iconpaypal from '../../../images/paypal-img.svg';
import icongpay from '../../../images/gpay-img.svg';
import iconcard from '../../../images/card-payment.svg';
import iconpp from '../../../images/paypal-payment.svg';
import iconzip from '../../../images/zip-payment.svg';
import iconafpay from '../../../images/afterpay.svg';
import defaultImage from '../../../images/default.jpeg';
import CustomPaymentForm from './CardPaymentForm';



const CheckoutSection = () => {
    // const stripe = useStripe();
    // const elements = useElements();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: '',
    });
    const [showBillingAddress, setShowBillingAddress] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const tempId = localStorage.getItem('user_temp_id');      
                if (!tempId) {
                    throw new Error('Temporary ID not found.');  
                }
                const response = await fetch('https://sagmetic.site/2023/laravel/kempsey/public/api/get-cart?temp_id='+tempId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                setCartItems(data.data); 
            } catch (err) {
              console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handleBillingAddressChange = (e) => {
        setShowBillingAddress(e.target.id === 'diffss-addrs');
      };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.message) errors.message = 'Message is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted:', formData);
            // Submit the form data to the server or perform other actions
        } else {
            setErrors(validationErrors);
        }
    };

    const totalAmount = cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (

        <div Class="CheckoutSection light p-130">
            <div Class='container'>
                <div class="CheckoutSection-row">
                    <div class="CheckoutSection-col">
                        <div Class="checkout-express-head">
                            <h2 class="text-center">Express Checkout</h2>
                            <div Class="Express-Checkout-row">
                                <div class="Express-Checkout-col">
                                    <a href=''><span><img src={iconshop} alt="Shop Icon" /></span></a>
                                </div>
                                <div class="Express-Checkout-col express-pal">
                                    <a href=''><span><img src={iconpaypal} alt="Shop Icon" /></span></a>
                                </div>
                                <div class="Express-Checkout-col express-gpay">
                                    <a href=''><span><img src={icongpay} alt="Shop Icon" /></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-form-list login-checkout">
                            <h4>Contact</h4>
                            <div class={`form_group ${errors.email ? 'error' : ''}`}>
                                <a class="checkout-login" href='/login'>Log In</a>
                                <input
                                    class="form_control"
                                    type="email"
                                    name="email"
                                    placeholder="Email Id*"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.email && <p class="error_message">{errors.email}</p>}
                            </div>
                            <div className="form_group">
                                <label>
                                    <input type="checkbox" />
                                    Email me with news and offers
                                </label>
                            </div>
                        </div>

                        <div class='contact_col checkout-form-list'>
                            <h4>Shipping Address</h4>
                            <div class='contact_form'>
                                <form onSubmit={handleSubmit}>
                                    <div class="form_row">
                                        <div class={`form_group w-50 ${errors.firstName ? 'error' : ''}`}>
                                            <input
                                                class="form_control"
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name*"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.firstName && <p class="error_message">{errors.firstName}</p>}
                                        </div>
                                        <div class={`form_group w-50 ${errors.lastName ? 'error' : ''}`}>
                                            <input
                                                class="form_control"
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name*"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.lastName && <p class="error_message">{errors.lastName}</p>}
                                        </div>
                                    </div>
                                    <div class={`form_group ${errors.phoneNumber ? 'error' : ''}`}>
                                        <input
                                            class="form_control"
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="Phone Number*"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.phoneNumber && <p class="error_message">{errors.phoneNumber}</p>}
                                    </div>
                                    <div class={`form_group ${errors.email ? 'error' : ''}`}>
                                        <input
                                            class="form_control"
                                            type="email"
                                            name="email"
                                            placeholder="Enter you address here*"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.email && <p class="error_message">{errors.email}</p>}
                                    </div>
                                    <div class={`form_group ${errors.message ? 'error' : ''}`}>
                                        <input
                                            class="form_control"
                                            name="message"
                                            placeholder="Apt, Suite, Floor etc."
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.message && <p class="error_message">{errors.message}</p>}
                                    </div>
                                    <div class={`form_group ${errors.message ? 'error' : ''}`}>
                                        <input
                                            class="form_control"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.city && <p class="error_city">{errors.city}</p>}
                                    </div>
                                    <div class="form_row">
                                        <div class="form_group">
                                            <select id="hear-aboutus" class="form_control">
                                                <option selected>State</option>
                                                <option>LA</option>
                                                <option>Las Vegas</option>
                                                <option>California</option>
                                                <option>Texas</option>
                                            </select>
                                        </div>
                                        <div class={`form_group w-50 ${errors.lastName ? 'error' : ''}`}>
                                            <input
                                                class="form_control"
                                                type="text"
                                                name="Postalcode"
                                                placeholder="Postal Code*"
                                                value={formData.Postalcode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.Postalcode && <p class="error_message">{errors.Postalcode}</p>}
                                        </div>
                                    </div>
                                    <div class="form_group">
                                        <label>
                                            <input name='save-information' type="checkbox" />
                                            Save this information for next time
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class='checkout-form-list shipping-method'>
                            <div className="checkout-form-list-head">
                                <h4>Shipping Method</h4>
                            </div>
                            <p>Select the address that matches your card or payment method.  </p>

                            <div class="billing-address-detail">
                                <div class="same-billing-address">
                                    <div class="form-check">
                                        <div className="shipping-method-check">
                                            <input class="form-check-input address-radio-btn" type="radio" name="flexRadioDefaul" id="same-addrs" data-gtm-form-interact-field-id="1" />
                                            <label class="form-check-label" for="same-addrs">
                                                Standard
                                            </label>
                                            <div className="shipping-method-price">
                                                <p>$13.00</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="diff-billing-address">
                                    <div class="form-check">
                                        <div className="shipping-method-check">
                                            <input class="form-check-input address-radio-btn" type="radio" name="flexRadioDefaul" id="diff-addrs" data-gtm-form-interact-field-id="0" />
                                            <label class="form-check-label" for="diff-addrs">
                                                Express
                                                <span>1 to 4 business days</span>
                                            </label>
                                            <div className="shipping-method-price">
                                                <p>$20.00</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='checkout-form-list payment'>
                            <div className="checkout-form-list-head">
                                <h4>Payment</h4>
                            </div>
                            <p>All transactions are secure and encrypted.</p>

                            <div class="billing-address-detail payment-type-detail">
                                <div class="same-billing-address">
                                    <div class="form-check">
                                        <div className="payment-check">
                                            <input class="form-check-input address-radio-btn" type="radio" name="payment_method" value="paypal" id="ccpayment" data-gtm-form-interact-field-id="1" />
                                            <label class="form-check-label" for="ccpayment">
                                                Credit card
                                            </label>
                                            <div className="payment-type-img">
                                                <img src={iconcard} alt="card Icon" />
                                            </div>
                                           <CustomPaymentForm />
                                        </div>
                                    </div>
                                </div>
                                <div class="diff-billing-address">
                                    <div class="form-check">
                                        <div className="payment-check">
                                            <input class="form-check-input address-radio-btn" type="radio" name="payment_method" value="paypal" id="pppayment" data-gtm-form-interact-field-id="0" />
                                            <label class="form-check-label" for="pppayment">
                                                PayPal
                                            </label>
                                            <div className="payment-type-img">
                                                <img src={iconpp} alt="card Icon" />
                                            </div>
                                            <div class="payment-detail-form contact-form">
                                                <a href='#'><b>Pay via Paypal</b></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <div class="diff-billing-address">
                                    <div class="form-check">
                                        <div className="payment-check">
                                            <input class="form-check-input address-radio-btn" type="radio" name="paymentRadioDefaul" id="zippayment" data-gtm-form-interact-field-id="2" />
                                            <label class="form-check-label" for="zippayment">
                                            Zip - Buy now, pay later
                                            </label>
                                            <div className="payment-type-img">
                                                <img src={iconzip} alt="card Icon" />
                                            </div>
                                            <div class="payment-detail-form contact-form">
                                                <a href='#'><b>Pay via Zip</b></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="diff-billing-address">
                                    <div class="form-check">
                                        <div className="payment-check">
                                            <input class="form-check-input address-radio-btn" type="radio" name="paymentRadioDefaul" id="afpayment" data-gtm-form-interact-field-id="2" />
                                            <label class="form-check-label" for="afpayment">
                                            Afterpay
                                            </label>
                                            <div className="payment-type-img">
                                                <img src={iconafpay} alt="card Icon" />
                                            </div>
                                            <div class="payment-detail-form contact-form">
                                                <a href='#'><b>Pay via Afterpay</b></a>
                                            </div>
                                        </div>

                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="checkout-form">
                            <div className="checkout-form-list shipping-method">
                                <div className="checkout-form-list-head">
                                <h4>Billing Address</h4>
                                </div>
                                <p>Select the address that matches your card or payment method.</p>

                                <div className="billing-address-detail">
                                <div className="same-billing-address">
                                    <div className="form-check">
                                    <div className="shipping-method-check">
                                        <input
                                        className="form-check-input address-radio-btn"
                                        type="radio"
                                        name="baRadioDefault"
                                        id="samess-addrs"
                                        data-gtm-form-interact-field-id="1"
                                        onChange={handleBillingAddressChange}
                                        checked={!showBillingAddress}
                                        />
                                        <label className="form-check-label" htmlFor="samess-addrs">
                                        Same as shipping address
                                        </label>
                                    </div>
                                    </div>
                                </div>
                                <div className="diff-billing-address">
                                    <div className="form-check">
                                    <div className="shipping-method-check">
                                        <input
                                        className="form-check-input address-radio-btn"
                                        type="radio"
                                        name="baRadioDefault"
                                        id="diffss-addrs"
                                        data-gtm-form-interact-field-id="0"
                                        onChange={handleBillingAddressChange}
                                        checked={showBillingAddress}
                                        />
                                        <label className="form-check-label" htmlFor="diffss-addrs">
                                        Use as different billing address
                                        </label>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            {/* Conditionally Render Billing Address Form */}
                            {showBillingAddress && (
                                <div className="contact_col checkout-form-list">
                                <h4>Billing Address</h4>
                                <div className="contact_form">
                                    <form onSubmit={handleSubmit}>
                                    <div className="form_row">
                                        <div className={`form_group w-50 ${errors.firstName ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name*"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.firstName && <p className="error_message">{errors.firstName}</p>}
                                        </div>
                                        <div className={`form_group w-50 ${errors.lastName ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name*"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.lastName && <p className="error_message">{errors.lastName}</p>}
                                        </div>
                                    </div>
                                    <div className={`form_group ${errors.phoneNumber ? 'error' : ''}`}>
                                        <input
                                        className="form_control"
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="Phone Number*"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                        />
                                        {errors.phoneNumber && <p className="error_message">{errors.phoneNumber}</p>}
                                    </div>
                                    <div className={`form_group ${errors.email ? 'error' : ''}`}>
                                        <input
                                        className="form_control"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your address here*"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        />
                                        {errors.email && <p className="error_message">{errors.email}</p>}
                                    </div>
                                    <div className={`form_group ${errors.message ? 'error' : ''}`}>
                                        <input
                                        className="form_control"
                                        name="message"
                                        placeholder="Apt, Suite, Floor etc."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        />
                                        {errors.message && <p className="error_message">{errors.message}</p>}
                                    </div>
                                    <div className={`form_group ${errors.city ? 'error' : ''}`}>
                                        <input
                                        className="form_control"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        />
                                        {errors.city && <p className="error_city">{errors.city}</p>}
                                    </div>
                                    <div className="form_row">
                                        <div className="form_group">
                                        <select id="hear-aboutus" className="form_control">
                                            <option selected>State</option>
                                            <option>LA</option>
                                            <option>Las Vegas</option>
                                            <option>California</option>
                                            <option>Texas</option>
                                        </select>
                                        </div>
                                        <div className={`form_group w-50 ${errors.Postalcode ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="Postalcode"
                                            placeholder="Postal Code*"
                                            value={formData.Postalcode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.Postalcode && <p className="error_message">{errors.Postalcode}</p>}
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <label>
                                        <input name="save-information" type="checkbox" />
                                        Save this information for next time
                                        </label>
                                    </div>
                                    </form>
                                </div>
                                </div>
                            )}
                            </div>

                        <button class="checkout-pay ">PAY NOW</button>
                    </div>
                    {/* Product and Price Section */}
                    <div class="CheckoutSection-col checkout-items">
                        <div className="checkout-items-detail">
                        {cartItems?.length > 0 ? (
                            <>
                                <table className='product-detail-paymant'>
                                    <tbody>
                                        {cartItems?.map(item => (
                                            <>
                                                <tr className='product-dd'>
                                                    <td className='product-img'>
                                                        <img  src={
                                                                item.product.images && item.product.thumbnail_index !== null 
                                                                ? JSON.parse(item.product.images)[item.product.thumbnail_index] ||  defaultImage
                                                                : defaultImage
                                                            } 
                                                            alt={item.product.name} 
                                                        />
                                                        <span className='product-items-number'>{ item.quantity ?? '1'}</span>
                                                    </td>
                                                    <td>{item.product?.name}</td>
                                                    <td class="product-price">${(item.product.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            </>
                                        ))}
                                        <tr className='product-pp'>
                                            <td>Subtotal</td>
                                            <td></td>
                                            <td class="product-price">${ totalAmount }</td>
                                        </tr>
                                        <tr className='product-pp'>
                                            <td>Shipping</td>
                                            <td></td>
                                            <td class="product-price">$00</td>
                                        </tr>
                                        <tr className='product-total'>
                                            <td>Order Total</td>
                                            <td></td>
                                            <td class="product-price">${totalAmount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>Please select product that you want to purchase.</p>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

{/* <script>
if ($('.address-radio-btnl').find(':checked')) {
    $(this).parent().parent().addClass('selected'),
});
         </script> */}

export default CheckoutSection;
