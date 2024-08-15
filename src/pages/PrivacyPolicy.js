import React from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyPolicy/PrivacyBanner';
import PolicyData from '../components/PrivacyPolicy/PolicyData.js';
const PrivacyPolicy = () => {
    return (
        <Layout>
            <div className='body_inner '>
                <div className='page'>
                    <div className='banner_section'>
                        <PrivacyBanner />
                    </div>

                    <div className='faq_section'>
                        <PolicyData/>
                    </div>

                </div>
            </div>
        </Layout>
    )

}

export default PrivacyPolicy;