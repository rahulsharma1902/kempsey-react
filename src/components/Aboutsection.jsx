
import React from 'react';
import { Link } from 'react-router-dom';
import aboutthumb from '../images/about_thumb.png';
import greenlogo from '../images/green_logo.svg';



const Aboutsection = () => {


    return (
        <div className='about_section p-130 light'>
            <div className='container'>
                <div className='about_section_head'>
                    <h2 className='size76'>Easy and affordable way 
                    for the whole family</h2>

                    <img src={greenlogo} className='green_logoe' />
                </div>
                <div className='about_grid mt-60' >
                    <div className='about_grid_col aboutext_col'>
                        <p className='size32'>Camping World and Compleat Angler Kempsey & Barney’s Bikes and Kempsey Firearms</p>
                        <p>We stock all the leading brands and we have everything you need for your camping and outdoor adventure: From Tents to Tent pegs, Furniture, Bedding, Lighting and Cooking equipment, Ice boxes, Coolers, Fridges, Kayaks, Rods, Reels, Lures, Lines, even Bikes & Bikes accessories</p>
                        <p>Camping is a fun, easy and affordable way for the whole family to relax together, get back to nature and enjoy the simple things in life.</p>

                        <p>We stock a wide range of firearm accessories for gun, shooting, reloading, optics, safes & ammunition.</p>
                        <div className='button_div mt-30'>
                            <Link to="/" className='cta'>Contact Us</Link>
                        </div>
                    </div>
                    <div className='about_grid_col about_media_col'>
                        <div className='about_thumb'>
                            <img src={aboutthumb} className='about_main_thumb' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aboutsection;
