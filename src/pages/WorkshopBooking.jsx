import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import WorkshopStore from '../components/Front/Workshop/Booking/WorkshopStore';
import StoreService from '../components/Front/Workshop/Booking/StoreService';
import ServiceDate from '../components/Front/Workshop/Booking/ServiceDate';
import DetailForm from '../components/Front/Workshop/Booking/DetailForm';
import BikeDetailForm from '../components/Front/Workshop/Booking/BikeDetail';
import CheckDetail from '../components/Front/Workshop/Booking/Checkdetail';
import BookingConfirm from '../components/Front/Workshop/Booking/Bookingconfrm';

const WorkshopBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storeId, setStoreId] = useState(null);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  

  const validateStep = () => {
    const bookingData = JSON.parse(localStorage.getItem('booking')) || {};
    switch (currentStep) {
      case 2:
        if (!Array.isArray(bookingData.types) || bookingData.types.length === 0) {
          setError('At least one service type is required.');
          return false;
        }
        break;
      case 3:
        if (!bookingData.serviceDate) {
          setError('Select a valid date for your service.');
          return false;
        }
        break;
      case 4:
        if (!bookingData.userDetails || 
            !bookingData.userDetails.fname || 
            !bookingData.userDetails.lname || 
            !bookingData.userDetails.email || 
            !bookingData.userDetails.phone || 
            !bookingData.userDetails.hearAboutUs) {
          setError('All user details are required.');
          return false;
        }
        break;
      case 5:
        if (!bookingData.bikeDetails || 
            !bookingData.bikeDetails.bikeBrand || 
            !bookingData.bikeDetails.bikeType) {
          setError('Bike brand and type are required.');
          return false;
        }
        setTypes(bookingData.types || []);
        break;
      default:
        break;
    }
    setError('');
    return true;
  };

  const handleNext = (data) => {
    if (!validateStep()) return;
    if (data && typeof data === 'number') setStoreId(data);
    console.log(currentStep);
    if(currentStep === 6){
        setConfirmed(true);
        console.log('here is your 6th final step you can update you code here if you want ...');
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prevStep) => prevStep - 1)
};

  const getProgressWidth = () => `${(currentStep / 6) * 100}%`;

  const steps = [
    { component: <WorkshopStore handleNext={handleNext} />, title: "Find Your Nearest Workshop", description: "Select Your Shop" },
    { component: <StoreService storeId={storeId} />, title: "Which Services Would You Like To Book?", description: "Services" },
    { component: <ServiceDate />, title: "Select A Service Date", description: "Select Service Date" },
    { component: <DetailForm />, title: "Your Details", description: "Your Details" },
    { component: <BikeDetailForm />, title: "Bike Details", description: "Bike Details" },
    { component: <CheckDetail Types={types} />, title: "Check Details And Confirm", description: "Summary" },
    { component: <BookingConfirm confirmed={confirmed} />, title: "", description: "Confirm" }
  ];

  return (
    <Layout>
      <div className='body_inner'>
        <div className='page'>
          <div className='workshop_form_section p-130 light'>
            <div className='workshop_main'>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`workshop_step step_${index + 1} ${currentStep === index + 1 ? 'active' : 'hidden'}`}
                >
                  <div className='container'>
                    <div className='step_inner'>
                      <div className='section_head text-center'>
                        <div className='step_progress'>
                          <p>{step.description}</p>
                          <div className='custom_progress'>
                            <div className='progress_thumb' style={{ width: getProgressWidth() }}></div>
                          </div>
                        </div>
                        {step.title && <h2 className='size46'>{step.title}</h2>}
                      </div>
                      <div className='store_wrapper'>
                        {step.component}
                        
                      </div>
                      <div className='error_wrap'>
                        {error && <p className='error-text'>{error}</p>}
                      </div>
                      {index < steps.length - 1 && (
                        <div className='button_flex text-center mt-60'>
                          {currentStep > 1 && (
                            <Link to="#" onClick={handleBack} className='cta step_back'>Back</Link>
                          )}
                          <Link to="#" onClick={() => handleNext()} className='cta step_next'>Next</Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkshopBooking;
