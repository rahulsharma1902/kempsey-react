import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import WorkshopStore from '../components/Workshop/WorkshopStore';
import StoreService from '../components/Workshop/StoreService';
import ServiceDate from '../components/Workshop/ServiceDate';
import DetailForm from '../components/Workshop/DetailForm';
import BikeDetailForm from '../components/Workshop/BikeDetail';
import CheckDetail from '../components/Workshop/Checkdetail';
import BookingConfirm from '../components/Workshop/Bookingconfrm';


const WorkshopBooking = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const getProgressWidth = () => {
        switch (currentStep) {
            case 1:
                return '16%';
            case 2:
                return '32%';
            case 3:
                return '48%';
            case 4:
                return '60%';
            case 5:
                return '80%';
            case 6:
                return '100%';
        }
    };

    return (
        <Layout>
            <div className='body_inner'>
                <div className='page'>
                    <div className='workshop_form_section p-130 light'>
                        <div className='workshop_main'>
                            <div className={`workshop_step step_1 ${currentStep === 1 ? 'active' : 'hidden'}`}>
                                <div className='container'>
                                    <div className='step_inner'>
                                        <div className='section_head text-center'>
                                            <div className='step_progress'>
                                                <p>Select Your Shop</p>
                                                <div className='custom_progress'>
                                                    <div className='progress_thumb' style={{ width: getProgressWidth() }}></div>
                                                </div>
                                            </div>
                                            <h2 className='size46'>Find Your Nearest Workshop</h2>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                        </div>
                                        <div className='store_wrapper'>
                                            <WorkshopStore handleNext={handleNext} />
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <div className={`workshop_step store_service_step step_2 ${currentStep === 2 ? 'active' : 'hidden'}`}>
                                <div className='container'>
                                    <div className='step_inner'>
                                        <div className='section_head text-center'>
                                            <div className='step_progress'>
                                                <p>Services</p>
                                                <div className='custom_progress'>
                                                    <div className='progress_thumb' style={{ width: getProgressWidth() }}></div>
                                                </div>
                                            </div>
                                            <h2 className='size46'>Which Services Would You Like To Book?</h2>
                                        </div>

                                        <div className='store_wrapper'>
                                            <StoreService />
                                        </div>

                                        <div className='button_flex text-center mt-60'>
                                            <Link to="#" onClick={handleBack} className='cta step_back'>Back</Link>
                                            <Link to="#" onClick={handleNext} className='cta step_next'>Next</Link>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className={`workshop_step calender_step step_3 ${currentStep === 3 ? 'active' : 'hidden'}`}>
                                <div className='container'>
                                    <div className='step_inner'>
                                        <div className='section_head text-center'>
                                            <div className='step_progress'>
                                                <p>Select Service Date</p>
                                                <div className='custom_progress'>
                                                    <div className='progress_thumb' style={{ width: getProgressWidth() }}></div>
                                                </div>
                                            </div>
                                            <h2 className='size46'>Select A Service Date</h2>
                                        </div>
                                        <div className='store_wrapper'>
                                            <ServiceDate />
                                        </div>
                                        <div className='button_flex text-center mt-60'>
                                        <Link to="#" onClick={handleBack} className='cta step_back'>Back</Link>
                                        <Link to="#" onClick={handleNext} className='cta step_next'>Next</Link>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className={`workshop_step detailform_step  step_4 ${currentStep === 4 ? 'active' : 'hidden'}`}>
                                <div className='container'>
                                    <div className='step_inner'>
                                        <div className='section_head text-center'>
                                            <div className='step_progress'>
                                                <p>Your Details</p>
                                                <div className='custom_progress'>
                                                    <div className='progress_thumb' style={{ width: getProgressWidth() }}></div>
                                                </div>
                                            </div>
                                            <h2 className='size46'>Your Details</h2>
                                        </div>
                                        <div className='store_wrapper'>
                                            <DetailForm/>
                                        </div>
                                        <div className='button_flex text-center mt-60'>
                                        <Link to="#" onClick={handleBack} className='cta step_back'>Back</Link>
                                        <Link to="#" onClick={handleNext} className='cta step_next'>Next</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`workshop_step bikedetailform_step  step_5 ${currentStep === 5 ? 'active' : 'hidden'}`}>
                                <div className='container'>
                                    <div className='step_inner'>
                                        <div className='section_head text-center'>
                                            <div className='step_progress'>
                                                <p>Bike Details</p>
                                                <div className='custom_progress'>
                                                    <div className='progress_thumb' style={{ width: getProgressWidth() }}></div>
                                                </div>
                                            </div>
                                            <h2 className='size46'>Bike Details</h2>
                                        </div>
                                        <div className='store_wrapper'>
                                            <BikeDetailForm/>
                                        </div>
                                        <div className='button_flex text-center mt-60'>
                                        <Link to="#" onClick={handleBack} className='cta step_back'>Back</Link>
                                        <Link to="#" onClick={handleNext} className='cta step_next'>Next</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`workshop_step summary_step  step_6 ${currentStep === 6 ? 'active' : 'hidden'}`}>
                                <div className='container'>
                                    <div className='step_inner'>
                                        <div className='section_head text-center'>
                                            <div className='step_progress'>
                                                <p>Summary</p>
                                                <div className='custom_progress'>
                                                    <div className='progress_thumb' style={{ width: getProgressWidth() }}></div>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div className="summary_step-box">
                                            {/* <h2 className='size46'>Check Details And Confirm</h2>                                         */}
                                            <div className='store_wrapper'>
                                                <CheckDetail/>
                                            </div>
                                        </div>
                                        <div className='button_flex text-center mt-60'>
                                        <Link to="#" onClick={handleBack} className='cta step_back'>Back</Link>
                                        <Link to="#" onClick={handleNext} className='cta step_next'>Next</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <div className={`workshop_step confrm_step  step_7 ${currentStep === 7 ? 'active' : 'hidden'}`}>
                                <div className='container'>
                                    <div className='step_inner'>
                                        <div className="confrm_step-box">
                                            {/* <h2 className='size46'>Check Details And Confirm</h2>                                         */}
                                            <div className='store_wrapper'>
                                                <BookingConfirm/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div> 
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WorkshopBooking;
