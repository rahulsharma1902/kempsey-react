import React from 'react';
import innbanner from '../images/inn_banner_img.png';

const Outdoorcloset = () => {
    return (
        <div className='inn_banner_section outdoor_closet dark'>
                    <img src={innbanner} alt="banner image" className='banner_image'/>
                   <div className='inner'>
                        <div className='innbanner_content_right'>
                            <h2 className='size86'>Browse Kempsey <br></br> Outdoors Closet</h2>
                        </div>
                   </div>
                </div>
    );
};

export default Outdoorcloset;

