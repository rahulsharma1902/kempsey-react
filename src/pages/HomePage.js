import React from 'react';
import { Link } from 'react-router-dom';
import Bannerslider from '../components/Bannerslider.js';
import kempspattern from '../images/kemps_pattern.png';
import Layout from '../components/Layout.jsx';
import Newarrivalmodule from '../components/Newarrivalmodule.jsx';
import Newproductmodule from '../components/Newproductmodule.jsx';
import Categoryslider from '../components/Categoryslider.jsx';
import CategorySection from '../components/CategorySection.jsx';
import CategoryMarquee from '../components/CategoryMarquee.jsx';
import Aboutsection from '../components/Aboutsection.jsx';
import Reviewsection from '../components/Reviewsection.jsx';
import Outdoorcloset from '../components/Outdoorcloset.jsx';


const HomePage = () => {

    return (
        <Layout>
        <div className='body_inner '>
            <div className='page'>
                <div className='banner_section'>
                    <Bannerslider />
                </div>
                <Categoryslider />
                <CategoryMarquee />
                <div className='closet_section light'>
                    <div className='closet_module p-130'>
                        <div className='container'>
                            <div className='section_inner text-center'>
                                <p className='green_subhead'>Our Closet is Your Closet</p>
                                <h2 className='size76'>Lorem Ipsum is simply dummy text of the printing and</h2>
                                <div className='button_wrap mt-30'><Link to="/" className="cta cta_dark"> Contact Us</Link></div>
                            </div>
                        </div>
                        <img src={kempspattern} alt="banner image" className='abs_right'/>
                        
                    </div>
                </div>
                <Outdoorcloset />
                <CategorySection />
                <Newarrivalmodule />
                <Newproductmodule />
                <Reviewsection />
                <Aboutsection />
            </div>
        </div>
        </Layout>
    );
};

export default HomePage;
