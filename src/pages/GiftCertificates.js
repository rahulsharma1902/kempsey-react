import React from 'react';
import Layout from '../components/Layout';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import FormCertificate from '../components/Certificates/FormCertificate.js';
const GiftCertificates = () => {
    return (
        <Layout>
            <div className='body_inner '>
                <div className='page'>
                    <div className='banner_section'>
                        <InnerpageBanner/>
                    </div>

                    <div className='faq_section certificates_section'>
                        <FormCertificate/>
                    </div>

                </div>
            </div>
        </Layout>
    )

}

export default GiftCertificates;