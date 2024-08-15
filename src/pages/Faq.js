import React from 'react';
import Layout from '../components/Layout';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import Faqdetail from '../components/Faq/Faqdetail.js';
const Faq = () => {
    return (
        <Layout>
            <div className='body_inner '>
                <div className='page'>
                    <div className='banner_section'>
                        <InnerpageBanner />
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