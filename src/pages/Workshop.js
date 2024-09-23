import React from 'react';
import Layout from '../components/Layout';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import Servicing from '../components/Front/Workshop/Servicing';
import {useStorefrontContent } from '../contexts/StoreFrontContext.js';

const Workshop = () => {
    const { workshopContent, loading } = useStorefrontContent();
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <Layout>
            <div className='body_inner'>
                <div className='page'>
                        <div className='banner_section'>
                            <InnerpageBanner data={{ 'image': workshopContent?.banner_image_url,'heading':workshopContent?.heading,'sub_heading':workshopContent?.sub_heading }} />
                        </div>
                        <div className='faq_section certificates_section'>
                            <Servicing />
                        </div>
                </div>
            </div>
        </Layout>
    );
};

export default Workshop;
