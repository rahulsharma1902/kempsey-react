import React from 'react';
import iconboximage1 from '../../images/icon_why_shop1.svg'
import iconboximage2 from '../../images/icon_why_shop2.svg'
import iconboximage3 from '../../images/icon_why_shop3.svg'
const WhyShopsection = () => {

    return (
        <div className="WhyShopsection light p-130 pt-0">
            <div className='container'>
                <div className='section_head text-center'>
                    <h2 className='size76'>Why shop with us</h2>
                </div>
                <div className='why_uis_inner mt-30'>
                    <div className='hover_box_row'>
                        <div className='hover_box_col'>
                            <div className='icon_box'>
                                <div className='icon_boix_inner'>
                                    <div className='icon'>
                                        <img src={iconboximage1} alt="image"/>
                                    </div>
                                    <h3>Widest Range</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </div>
                        <div className='hover_box_col'>
                            <div className='icon_box'>
                                <div className='icon_boix_inner'>
                                    <div className='icon'>
                                        <img src={iconboximage2} alt="image"/>
                                    </div>
                                    <h3>Lowest Prices</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </div>
                        <div className='hover_box_col'>
                            <div className='icon_box'>
                                <div className='icon_boix_inner'>
                                    <div className='icon'>
                                        <img src={iconboximage3} alt="image"/>
                                    </div>
                                    <h3>Customer Service</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyShopsection;
