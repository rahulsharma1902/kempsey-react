import React from 'react';
import { Link } from 'react-router-dom';
import Bannerslider from '../components/Front/Home/Bannerslider.js';
import kempspattern from '../images/kemps_pattern.png';
import Layout from '../components/Layout.jsx';
import Newarrivalmodule from '../components/Newarrivalmodule.jsx';
import Newproductmodule from '../components/Newproductmodule.jsx';
import Categoryslider from '../components/Front/Home/Categoryslider.jsx';
import CategorySection from '../components/CategorySection.jsx';
import CategoryMarquee from '../components/Front/Home/CategoryMarquee.jsx';
import Aboutsection from '../components/Aboutsection.jsx';
import Reviewsection from '../components/Reviewsection.jsx';
import Outdoorcloset from '../components/Front/Home/Outdoorcloset.jsx';
import {useHomeContent } from '../contexts/HomeContentContext.js';

const HomePage = () => {
    const { homeContent, loading } = useHomeContent();
    console.log(homeContent);
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
                            <p className="green_subhead">{homeContent?.closet_section_sub_heading ?? ''}</p>
                                <h2 className='size76'>{homeContent?.closet_section_heading ?? ''}</h2>
                                <div className='button_wrap mt-30'><Link to={homeContent?.closet_section_btn_link ?? ''} className="cta cta_dark">{homeContent?.closet_section_btn ?? ''}</Link></div>
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
