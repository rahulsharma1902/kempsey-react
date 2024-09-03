import React from 'react';
import Layout from '../components/Layout.jsx';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import Aboutsection from '../components/Front/About/AboutMainSection.jsx';
import Reviewsection from '../components/Reviewsection.jsx';
import Outdoorcloset from '../components/Front/About/Outdoorcloset.jsx';
import WhyShopsection from '../components/Front/About/WhyShopsection.jsx'


const AboutusPage = () => {

    return (
        <Layout>
        <div className='body_inner '>
            <div className='page'>
                <div className='banner_section'>
                    <InnerpageBanner />
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
