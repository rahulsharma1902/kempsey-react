import React from 'react';
import Layout from '../components/Layout.jsx';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import Aboutsection from '../components/Front/About/AboutMainSection.jsx';
import Reviewsection from '../components/Reviewsection.jsx';
import Outdoorcloset from '../components/Front/About/Outdoorcloset.jsx';
import WhyShopsection from '../components/Front/About/WhyShopsection.jsx'
import { useAboutContent } from '../contexts/AboutContentContext';


const AboutusPage = () => {
    const { aboutContent, loading } = useAboutContent();

    return (
        <Layout>
        <div className='body_inner '>
            <div className='page'>
                <div className='banner_section'>
                    <InnerpageBanner data={{ 'image': aboutContent?.about_us_banner_image,'heading':aboutContent?.about_us_banner_title,'sub_heading':aboutContent?.about_us_banner_sub_title }}/>
                </div>
                <Aboutsection />
                <WhyShopsection />
                <Outdoorcloset />
                <Reviewsection />
            </div> 
        </div>
        </Layout>
    );
};

export default AboutusPage;
