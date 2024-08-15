import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import WorkshopBanner from '../components/Workshop/WorkshopBanner';
import Servicing from '../components/Workshop/Servicing';

const Workshop = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const goToStep = (step) => {
        setCurrentStep(step);
    };

    return (
        <Layout>
            <div className='body_inner'>
                <div className='page'>
                    <div className='workshop_main'>
                        <div className={`step step_main ${currentStep === 1 ? '' : 'hidden'}`}>
                            <div className='banner_section'>
                                <WorkshopBanner />
                            </div>
                            <div className='faq_section certificates_section'>
                                <Servicing />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Workshop;
