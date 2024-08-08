import React from 'react';
import { Link } from 'react-router-dom';
import arrivalmain from '../images/arrival_main.png';
import arrivaldarkbg from '../images/arrival_darkbg.png';
import greenlogo from '../images/green_logo.svg';

const Newarrivalmodule = () => {
    return (
        <div className="new_arrival dark">
            <div className='full_grid'>
                <div className='full_grid_col media_col'>
                    <img src={arrivalmain} className='main_image'/>
                </div>
                <div className='full_grid_col text_side' style={{ backgroundImage: `url(${arrivaldarkbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className='grid_inner text-center'>
                        <img src={greenlogo} className='logo_cir'/>
                        <h2 className='size65'>New Arrivals Weekly</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <div className='button_wrap mt-20'>
                            <Link to="/" className="cta cta_trans">View The Collection</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newarrivalmodule;
