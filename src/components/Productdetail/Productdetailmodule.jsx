import React, { useState, useEffect,useContext } from 'react';
import reviewstarimage from '../../images/reviews.png';
import hearticon from '../../images/icon_heart.svg';
import eyeicon from '../../images/eyedvg.svg';
import itmsoldicon from '../../images/item_soldvg.svg';
import { Link } from 'react-router-dom';
import { addCart } from '../../api/apiCarts';
import { toast } from 'react-toastify';
import { CartContext } from '../../contexts/CartContext.js';

const Productdetailmodule = (data) => {
    const { setCartCount } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);
    const [tempId, setTempId] = useState(localStorage.getItem('user_temp_id') || '');


    // useEffect(() => {
    //     const fetchTempId = async () => {
    //         try {
    //             const response = await fetch('https://sagmetic.site/2023/laravel/kempsey/public/api/generate-temp-id');
    //             const result = await response.json();
    //             const newTempId = result.temp_id;
    //             setTempId(newTempId);
    //             localStorage.setItem('user_temp_id', newTempId);
    //         } catch (error) {
    //             console.error('Failed to fetch temporary ID:', error);
    //         }
    //     };

    //     if (!tempId) {
    //         fetchTempId();
    //     }
    // }, [tempId]);

    const handleAddToCart = async () => {
        try {
            const response = await addCart({
                product_id: data?.data?.id || '',
                quantity,
                tempId,
            });

            if (response.success) {
                toast.success('Product successfully added to cart');
            } else {
                toast.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Something went wrong.');
        }
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else if (e.target.value === '') {
            setQuantity('');
        }
    };

    return (
        <div className='Product_detail_component'>
            <p className='category_text'>{ data?.data?.category_name }</p>
            <h2 className='size36 product_title'>{ data?.data?.name ??  'Product Name 01'}</h2>
            <p dangerouslySetInnerHTML={{ __html: data?.data?.detail ?? '' }} />
            {/* <div className='product_review'>
                <img src={reviewstarimage} className='review_star' alt="Review Stars"/>
                <p><span className='revies_count'>10</span> Reviews</p>
            </div> */}
            <div className='product_price'>${ data?.data?.price ?? '149.00'}</div>

            <div className='quantity_cart_wrapper'>
                <p className='quantity_label'>Quantity:</p>
                <div className='quantity_cart_wrap'>
                    <div className='quantity_incr_wrapper'>
                        <div className='quantity_box'>
                            <span className='quantity_toggle quantity_decr' onClick={handleDecrement}>
                                <i className="fa-solid fa-minus"></i>
                            </span>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleInputChange}
                                min="1"
                                className="quantity_input"
                            />
                            <span className='quantity_toggle quantity_incr' onClick={handleIncrement}>
                                <i className="fa-solid fa-plus"></i>
                            </span>
                        </div>
                    </div>
                    <div className='cart_btn_wrapper'>
                        <button onClick={handleAddToCart} className='cta'>
                            Add to Cart
                        </button>
                    </div>
                    {/* <div className='fav_col'>
                        <div className='fav_button'>
                            <img src={hearticon} />
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='share_product'>
                <label>Share:</label>
                <div className='share_icons'>
                    <Link to="/"><i class="fa-brands fa-facebook-f"></i></Link>
                    <Link to="/"><i class="fa-brands fa-instagram"></i></Link>
                    <Link to="/"><i class="fa-brands fa-twitter"></i></Link>
                    <Link to="/"><i class="fa-brands fa-pinterest-p"></i></Link>
                </div>
            </div>
            <div className='sale_info_wrap'>
                <div className='slaeinfo_text'>
                    <img src={eyeicon} className='sale_info_icon' /> <p><span className='people_view_count'>2</span> people are viewing this product right now</p>
                 </div>
                 <div className='slaeinfo_text'>
                    <img src={itmsoldicon} className='sale_info_icon' /> <p><span className='item_sold_count'>5</span> items sold in last 12 hours</p>
                 </div>
            </div>

        </div>
    );
};

export default Productdetailmodule;
