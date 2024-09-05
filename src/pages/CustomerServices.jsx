import React from 'react';
import Layout from '../components/Layout';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import CustomerServicePolicy from '../components/CustomerServices/CustomerServicePolicy'
import {useStorefrontContent } from '../contexts/StoreFrontContext.js';

const CustomerServices = () => {
  const { CSdata, loading } = useStorefrontContent();
    return (
      <Layout>
        <div className='body_inner'>
          <div className='page'>
            <InnerpageBanner data={{ 'image': CSdata?.banner_image_url,'heading':CSdata?.heading,'sub_heading':CSdata?.sub_heading }}/>
            <CustomerServicePolicy/>
          </div>
        </div>
      </Layout>
    );
}

export default CustomerServices;
