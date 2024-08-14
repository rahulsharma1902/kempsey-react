import React, { useState } from 'react';
import reviewstarimage from '../../images/reviews.png';
import hearticon from '../../images/icon_heart.svg';
import eyeicon from '../../images/eyedvg.svg';
import itmsoldicon from '../../images/item_soldvg.svg';
import { Link } from 'react-router-dom';

const Productdetailmodule = () => {
    const [quantity, setQuantity] = useState(1);

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
            <p className='category_text'>Camping</p>
            <h2 className='size36 product_title'>Product Name 01</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            <div className='product_review'>
                <img src={reviewstarimage} className='review_star' alt="Review Stars"/>
                <p><span className='revies_count'>10</span> Reviews</p>
            </div>
            <div className='product_price'>$149.00</div>

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
                        <Link to="/cart" className='cta'>Add TO cART</Link>
                    </div>
                    <div className='fav_col'>
                        <div className='fav_button'><img src={hearticon} /></div>
                    </div>
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
