import React from 'react';
import Layout from '../components/Layout.jsx';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import ContactSection from '../components/Contact/ContactSection.jsx'
import {useStorefrontContent } from '../contexts/StoreFrontContext.js';

const Contact = () => {
    const { contactUs, loading } = useStorefrontContent();
    // console.log(contactUs);

    return (
        <Layout>
        <div className='body_inner '>
            <div className='page'>
                <div className='banner_section'>
                    <InnerpageBanner data={{ 'image': contactUs?.banner_image_url,'heading':contactUs?.heading,'sub_heading':contactUs?.sub_heading }}/>
                </div>
                <ContactSection />
            </div>
        </div>
        </Layout>
    );
};

export default Contact;
