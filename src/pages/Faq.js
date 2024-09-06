import React from 'react';
import Layout from '../components/Layout.jsx';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import Faqdetail from '../components/Faq/Faqdetail.js';
import {useStorefrontContent } from '../contexts/StoreFrontContext.js';

const Faq = () => {
    const { faq, loading } = useStorefrontContent();
    console.log(faq);
    return (
        <Layout>

            <div className='body_inner '>
                <div className='page'>
                    <div className='banner_section'>
                        <InnerpageBanner data={{ 'image': faq?.banner_image_url,'heading':faq?.heading,'sub_heading':faq?.sub_heading }} />
                    </div>

                    <div className='faq_section'>
                        <Faqdetail/>
                    </div>

                </div>
            </div>
        </Layout>
    )

}

export default Faq;