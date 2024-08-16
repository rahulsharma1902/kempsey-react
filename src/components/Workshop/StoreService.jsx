import React, { useState } from 'react';

const StoreService = () => {
    // State to manage which section is open
    const [openSection, setOpenSection] = useState(null);

    // State to manage selected service
    const [selectedService, setSelectedService] = useState('');

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className='store_wrapper_outer'>
            <div className='service_inner'>
                <div className='service_select_wrapper'>
                    <div className='servicetoggle_head' onClick={() => toggleSection('major')}>
                        <p>Major Service</p>
                        <span className={`toggle_icon ${openSection === 'major' ? 'open' : ''}`}>
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                    </div>
                    <div className={`service_select_content ${openSection === 'major' ? 'open' : 'closed'}`}>
                        <div className='service_content_wrapp'>
                              <div className='service_radio_row'>
                                    <div className='service_radio_col'>
                                        <label className="checkcontainer">
                                            <input
                                                type="radio"
                                                name="MajorService"
                                                value="FirstFreeTuneup"
                                                checked={selectedService === 'FirstFreeTuneup'}
                                                onChange={handleServiceChange}
                                            />
                                            <span className="radiobtn"></span>
                                            <div className='radio_info'>
                                                <p>First Free Tune-up</p>
                                                <p className='service_price'>$0</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='service_radio_col'>
                                        <label className="checkcontainer">
                                            <input
                                                type="radio"
                                                name="MajorService"
                                                value="General Assessment"
                                                checked={selectedService === 'General Assessment'}
                                                onChange={handleServiceChange}
                                            />
                                            <span className="radiobtn"></span>
                                            <div className='radio_info'>
                                                <p>General Assessment</p>
                                                <p className='service_price'>$50</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='service_radio_col'>
                                        <label className="checkcontainer">
                                            <input
                                                type="radio"
                                                name="MajorService"
                                                value="Standard Plus Service"
                                                checked={selectedService === 'Standard Plus Service'}
                                                onChange={handleServiceChange}
                                            />
                                            <span className="radiobtn"></span>
                                            <div className='radio_info'>
                                                <p>Standard Plus Service</p>
                                                <p className='service_price'>$169</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='service_radio_col'>
                                        <label className="checkcontainer">
                                            <input
                                                type="radio"
                                                name="MajorService"
                                                value="Standard  Service"
                                                checked={selectedService === 'Standard  Service'}
                                                onChange={handleServiceChange}
                                            />
                                            <span className="radiobtn"></span>
                                            <div className='radio_info'>
                                                <p>Standard  Service</p>
                                                <p className='service_price'>$119</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='service_radio_col'>
                                        <label className="checkcontainer">
                                            <input
                                                type="radio"
                                                name="MajorService"
                                                value="Tune Up"
                                                checked={selectedService === 'Tune Up'}
                                                onChange={handleServiceChange}
                                            />
                                            <span className="radiobtn"></span>
                                            <div className='radio_info'>
                                                <p>Tune Up</p>
                                                <p className='service_price'>$79</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='service_radio_col'>
                                        <label className="checkcontainer">
                                            <input
                                                type="radio"
                                                name="MajorService"
                                                value="Ultimate Service"
                                                checked={selectedService === 'Ultimate Service'}
                                                onChange={handleServiceChange}
                                            />
                                            <span className="radiobtn"></span>
                                            <div className='radio_info'>
                                                <p>Ultimate Service</p>
                                                <p className='service_price'>$119</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='service_select_wrapper'>
                    <div className='servicetoggle_head' onClick={() => toggleSection('secondary')}>
                        <p>Secondary Service</p>
                        <span className={`toggle_icon ${openSection === 'secondary' ? 'open' : ''}`}>
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                    </div>
                    <div className={`service_select_content ${openSection === 'secondary' ? 'open' : 'closed'}`}>
                        <div className='service_content_wrapp'>
                            <div className='secondry_service_wrap'>
                                <p>Please give us any details which will help us to understand any issues on your bike</p>
                                <textarea className='form_control' placeholder='For example, my back brake is squeaking...'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreService;
