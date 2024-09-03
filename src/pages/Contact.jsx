import React from 'react';
import Layout from '../components/Layout.jsx';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import ContactSection from '../components/Contact/ContactSection.jsx'


const Contact = () => {

    return (
        <Layout>
        <div className='body_inner '>
            <div className='page'>
                <div className='banner_section'>
                    <InnerpageBanner />
                </div>
                <ContactSection />
            </div>
        </div>
        </Layout>
    );
};

export default Contact;
