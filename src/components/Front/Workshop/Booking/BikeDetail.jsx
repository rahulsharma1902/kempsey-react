import React, { useState, useEffect } from 'react';

const BikeDetailForm = () => {
    const [formData, setFormData] = useState({
        bikeBrand: '',
        bikeModel: '',
        bikeType: '',
        bikeColor: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load bike details from local storage and set initial form data
        const storedBikeDetails = JSON.parse(localStorage.getItem('booking'))?.bikeDetails || {};
        setFormData(storedBikeDetails);
    }, []);

    useEffect(() => {
        // Update bike details in 'booking' local storage
        const bookingData = JSON.parse(localStorage.getItem('booking')) || {};
        localStorage.setItem('booking', JSON.stringify({ ...bookingData, bikeDetails: formData }));
    }, [formData]);

    const validateForm = () => {
        const { bikeBrand, bikeType } = formData;
        const newErrors = {};
        if (!bikeBrand) newErrors.bikeBrand = 'Bike brand is required';
        if (!bikeType) newErrors.bikeType = 'Bike type is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <div className='bikedetail-form-container'>
            <form className='bikedetail-form'>
                <div className='bikedetail-form-box'>
                    <div className='form_group'>
                        <input
                            type='text'
                            className={`form_control ${errors.bikeBrand ? 'error' : ''}`}
                            id='bikeBrand'
                            placeholder='Bike brand* eg. Specialized/Giant'
                            value={formData.bikeBrand}
                            onChange={handleChange}
                        />
                        {errors.bikeBrand && <p className='error-message'>{errors.bikeBrand}</p>}
                    </div>
                    <div className='form_group'>
                        <input
                            type='text'
                            className='form_control'
                            id='bikeModel'
                            placeholder='Model eg. S-Works/Anthem (optional)'
                            value={formData.bikeModel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form_group'>
                        <select
                            id='bikeType'
                            className={`form_control ${errors.bikeType ? 'error' : ''}`}
                            value={formData.bikeType}
                            onChange={handleChange}
                        >
                            <option value='' disabled>
                                Your bike type
                            </option>
                            <option>Road Bikes</option>
                            <option>Mountain Bikes</option>
                            <option>Hybrid Bikes</option>
                            <option>Commuter Bikes</option>
                            <option>Cruiser Bikes</option>
                            <option>Folding Bikes</option>
                            <option>Electric Bikes</option>
                        </select>
                        {errors.bikeType && <p className='error-message'>{errors.bikeType}</p>}
                    </div>
                    <div className='form_group'>
                        <input
                            type='text'
                            className='form_control'
                            id='bikeColor'
                            placeholder='Colour (optional)'
                            value={formData.bikeColor}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BikeDetailForm;
