import React from 'react';
import Layout from '../components/Layout';
import WorkshopBanner from '../components/Workshop/WorkshopBanner';
import Servicing from '../components/Front/Workshop/Servicing';

const Workshop = () => {


    return (
        <Layout>
            <div className='body_inner'>
                <div className='page'>
                        <div className='banner_section'>
                            <WorkshopBanner />
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
