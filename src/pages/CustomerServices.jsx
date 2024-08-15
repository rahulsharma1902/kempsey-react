import React from 'react';
import Layout from '../components/Layout';
import InnerpageBanner from '../components/InnerpageBanner.jsx';
import CustomerServicePolicy from '../components/CustomerServices/CustomerServicePolicy'
function CustomerServices() {
  return (
    <Layout>
      <div className='body_inner'>
        <div className='page'>
          <InnerpageBanner />
          <CustomerServicePolicy/>
        </div>
      </div>
    </Layout>
  );
}

export default CustomerServices;
