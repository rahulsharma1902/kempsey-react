import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import iconshop from '../../../images/shoppay-img.svg';
import iconpaypal from '../../../images/paypal-img.svg';
import icongpay from '../../../images/gpay-img.svg';
import iconcard from '../../../images/card-payment.svg';
import iconpp from '../../../images/paypal-payment.svg';
import iconzip from '../../../images/zip-payment.svg';
import iconafpay from '../../../images/afterpay.svg';
import defaultImage from '../../../images/default.jpeg';
import { ShippingMethods } from '../../../api/apiShippingMethods';



const CheckoutSection = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cartItems, setCartItems] = useState([]);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        additional_address: '',
        city: '',
        state: '',
        Postalcode: '',
        save_for_future: '',
        shipping_method: '',
        payment_method: '',
        payment_token: '',
        bfirstName: '',
        blastName: '',
        bphoneNumber: '',
        bemail: '',
        baddress: '',
        badditional_address: '',
        bcity: '',
        bstate: '',
        bPostalcode: '',
        cart_ids: '',

    });
    const [showBillingAddress, setShowBillingAddress] = useState(false);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
    const [selectedShippingMethodPrice, setSelectedShippingMethodPrice] = useState('');
    const [errors, setErrors] = useState({});

    //  fetching  user carts
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

    //Fetching shipping methods
    useEffect(() => {
        const getShippingMethodData = async () => {
          try {
            const response = await ShippingMethods();
            if (Array.isArray(response.data)) {
                setShippingMethods(response.data);
                if (response.data.length > 0) {
                    setSelectedShippingMethod(response.data[0].id);
                    setSelectedShippingMethodPrice(response.data[0].price);
                }
            } else {
                setShippingMethods([]);
              console.error('Unexpected response format:', response.data);
            }
          } catch (error) {
            console.error('Failed to fetch ShippingMethods:', error.message);
          } finally {
            setLoading(false);
          }
        };
        getShippingMethodData();
    }, []);

    const handleShippingMethodChange = (e) => {
        const selectedValue = e.target.value;
        const selectedPrice = e.target.getAttribute('data-price');

        setSelectedShippingMethod(selectedValue);
        setSelectedShippingMethodPrice(selectedPrice);
    };

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

    const validateForm = async () => {
        
        const errors = {};

        if (!formData.firstName) errors.firstName = 'First name is required';
        // if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
        if (!formData.email) errors.email = 'Email is required';
        // if (!formData.additional_address) errors.additional_address = 'a is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.city) errors.city = 'City is required';
        if (!formData.Postalcode) errors.Postalcode = 'Postalcode is required';

        if(!formData.payment_method ) errors.payment_method = 'Please select payment method';

        if(formData.payment_method == 'stripe') {
           
            if (!stripe || !elements) {
                errors.email = "don't have element";
            }
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: 'test',
                },
            });

            setFormData({
                ...formData, 
                ['payment_token']: paymentMethod.id,
            });
            // formData.append('payment_token',paymentMethod);
        }
        
        
        return errors;
    };


    const handleSubmit =  (e) => {
        // console.log("enter");
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {

            
            console.log('Form submitted:', formData);
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
                                <form >
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
                                    <div class={`form_group ${errors.address ? 'error' : ''}`}>
                                        <input
                                            class="form_control"
                                            type="text"
                                            name="address"
                                            placeholder="Enter you address here*"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.address && <p class="error_message">{errors.address}</p>}
                                    </div>
                                    <div class={`form_group ${errors.additional_address ? 'error' : ''}`}>
                                        <input
                                            class="form_control"
                                            name="additional_address"
                                            placeholder="Apt, Suite, Floor etc."
                                            value={formData.additional_address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.additional_address && <p class="error_message">{errors.additional_address}</p>}
                                    </div>
                                    <div class={`form_group ${errors.city ? 'error' : ''}`}>
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
                                            <select id="state" name="state"  value={formData.state} onChange={handleInputChange} class="form_control">
                                                {/* <option selected>State</option> */}
                                                <option value="LA">LA</option>
                                                <option value="Las Vegas">Las Vegas</option>
                                                <option value="California">California</option>
                                                <option value="Texas">Texas</option>
                                            </select>
                                        </div>
                                        <div class={`form_group w-50 ${errors.Postalcode ? 'error' : ''}`}>
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
                                            <input name='save_for_future' value={formData.save_for_future} onChange={handleInputChange} type="checkbox" />
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
                            {shippingMethods.map(smethod => (
                                <div key={smethod.id} className="same-billing-address">
                                    <div className="form-check">
                                        <div className="shipping-method-check">
                                            <input 
                                                className="form-check-input address-radio-btn" 
                                                type="radio" 
                                                name="shipping_method" 
                                                id={`shipping-method-${smethod.id}`}  // Unique ID for each radio button
                                                value={smethod.id} 
                                                data-price={smethod.price}
                                                checked={selectedShippingMethod == smethod.id}
                                                onChange={handleShippingMethodChange}
                                                data-gtm-form-interact-field-id="1" 
                                            />
                                            <label className="form-check-label" htmlFor={`shipping-method-${smethod.id}`}>
                                                {smethod.type}
                                                <span>{smethod.details}</span>
                                            </label>
                                            <div className="shipping-method-price">
                                                <p>${smethod.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                            <input class="form-check-input address-radio-btn" type="radio" name="payment_method"  onChange={handleInputChange} value="stripe" id="ccpayment" data-gtm-form-interact-field-id="1" />
                                            <label class="form-check-label" for="ccpayment">
                                                Credit card
                                            </label>
                                            <div className="payment-type-img">
                                                <img src={iconcard} alt="card Icon" />
                                            </div>
                                            <div class="payment-detail-form contact-form">
                                                {/* <form class="creditcard-form"> */}
                                                    <div class="form-group">
                                                        <input class="form_control" id="cardname" name="cardname" placeholder="Name On Card" type="text"  />
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="form-check-label" for="card-number">
                                                            Card Number:
                                                        </label>
                                                        {/* <input class="form_control" id="ccnumber" name="ccnumber" placeholder="Card Number" type="tel"  /> */}
                                                        <CardNumberElement className="input" id="card-number" />
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-6">
                                                            <label class="form-check-label" for="card-exp">
                                                                Card Expirey:
                                                            </label>
                                                            {/* <input class="form_control" id="ccexp" name="ccexp" placeholder="Expiration Date(MM/YY)" type="tel"  /> */}
                                                            <CardExpiryElement className="input" id="card-exp"/>
                                                        </div>
                                                        <div class="form-group col-6">
                                                            <label class="form-check-label" for="card-cvv">
                                                                CVV:
                                                            </label>
                                                            {/* <input class="form_control" id="cvv" name="cvv" placeholder="Security Code" type="tel"  /> */}
                                                            <CardCvcElement className="input" id="card-cvv"/>
                                                            {/* <div data-tooltip="true" id="phone_tooltip" class="tooltip-container">
                                                                <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Your card security code ">
                                                                    ?
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                {/* </form> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="diff-billing-address">
                                    <div class="form-check">
                                        <div className="payment-check">
                                            <input class="form-check-input address-radio-btn" type="radio" name="payment_method"  onChange={handleInputChange} value="paypal" id="pppayment" data-gtm-form-interact-field-id="0" />
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
                                                <div className={`form_group w-50 ${errors.bfirstName ? 'error' : ''}`}>
                                                    <input
                                                        className="form_control"
                                                        type="text"
                                                        name="bfirstName"
                                                        placeholder="First Name*"
                                                        value={formData.bfirstName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    {errors.bfirstName && <p className="error_message">{errors.bfirstName}</p>}
                                                </div>
                                                <div className={`form_group w-50 ${errors.blastName ? 'error' : ''}`}>
                                                    <input
                                                        className="form_control"
                                                        type="text"
                                                        name="blastName"
                                                        placeholder="Last Name*"
                                                        value={formData.blastName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    {errors.blastName && <p className="error_message">{errors.blastName}</p>}
                                                </div>
                                            </div>
                                            <div className={`form_group ${errors.bphoneNumber ? 'error' : ''}`}>
                                                <input
                                                    className="form_control"
                                                    type="tel"
                                                    name="bphoneNumber"
                                                    placeholder="Phone Number*"
                                                    value={formData.bphoneNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {errors.bphoneNumber && <p className="error_message">{errors.bphoneNumber}</p>}
                                            </div>
                                            <div className={`form_group ${errors.bemail ? 'error' : ''}`}>
                                                <input
                                                    className="form_control"
                                                    type="email"
                                                    name="bemail"
                                                    placeholder="Enter your Email here*"
                                                    value={formData.bemail}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {errors.bemail && <p className="error_message">{errors.bemail}</p>}
                                            </div>
                                            <div className={`form_group ${errors.baddress ? 'error' : ''}`}>
                                                <input
                                                    className="form_control"
                                                    name="baddress"
                                                    placeholder="Apt, Suite, Floor etc."
                                                    value={formData.baddress}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {errors.baddress && <p className="error_message">{errors.baddress}</p>}
                                            </div>
                                            <div className={`form_group ${errors.bcity ? 'error' : ''}`}>
                                                <input
                                                    className="form_control"
                                                    name="bcity"
                                                    placeholder="City"
                                                    value={formData.bcity}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {errors.bcity && <p className="error_city">{errors.bcity}</p>}
                                            </div>
                                            <div className="form_row">
                                                <div className="form_group">
                                                    <select id="hear-aboutus" onChange={handleInputChange} name="bstate" className="form_control">
                                                        {/* <option selected>State</option> */}
                                                        <option>LA</option>
                                                        <option>Las Vegas</option>
                                                        <option>California</option>
                                                        <option>Texas</option>
                                                    </select>
                                                </div>
                                                <div className={`form_group w-50 ${errors.bPostalcode ? 'error' : ''}`}>
                                                    <input
                                                        className="form_control"
                                                        type="text"
                                                        name="bPostalcode"
                                                        placeholder="Postal Code*"
                                                        value={formData.bPostalcode}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    {errors.bPostalcode && <p className="error_message">{errors.bPostalcode}</p>}
                                                </div>
                                            </div>
                                            {/* <div className="form_group">
                                                <label>
                                                    <input name="save-information" type="checkbox" />
                                                    Save this information for next time
                                                </label>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}  
                            className="checkout-pay"
                            disabled={loading} 
                        >
                            {loading ? 'Processing...' : 'PAY NOW'}
                        </button>
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
                                            <td class="product-price">${selectedShippingMethodPrice}</td>
                                        </tr>
                                        <tr className='product-total'>
                                            <td>Order Total</td>
                                            <td></td>
                                            <td class="product-price">${totalAmount + parseInt(selectedShippingMethodPrice)}</td>
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
