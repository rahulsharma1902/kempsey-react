import React, { useState, useEffect } from 'react';

const BikeDetailForm = () => {
    const [formData, setFormData] = useState({
        bikeBrand: '',
        bikeModel: '',
        bikeType: '',
        bikeColor: '',
    });
    const [bikeList, setBikeList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedBikes, setSelectedBikes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load the list of bikes and form data from local storage
        const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
        const storedBikeDetails = storedBooking.bikeDetails || [];
        const storedSelectedBikes = storedBooking.selectedBikes || [];

        // Set initial form data and bike list
        setBikeList(storedBikeDetails);
        setSelectedBikes(storedSelectedBikes);
    }, []);

    useEffect(() => {
        // Update the booking data in local storage with the new bike details and selected bikes
        const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
        storedBooking.bikeDetails = bikeList;
        storedBooking.selectedBikes = selectedBikes;
        localStorage.setItem('booking', JSON.stringify(storedBooking));
    }, [bikeList, selectedBikes]);

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

    const handleSaveBike = () => {
        if (validateForm()) {
            // Save the bike details and update the bike list
            setBikeList((prevList) => [...prevList, formData]);

            // Clear form data
            setFormData({
                bikeBrand: '',
                bikeModel: '',
                bikeType: '',
                bikeColor: '',
            });
            setShowForm(false); // Hide the form
        }
    };

    const handleAddBikeClick = () => {
        setShowForm(true); // Show the form
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedBikes((prevSelected) =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter((bike) => bike !== value)
        );
    };

    return (
        <div className='bikedetail-form-container'>
            {showForm ? (
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
                        <div className='bikedetail-form-btn'>
                            <a className='savebike-btn' href='#' onClick={handleSaveBike}>
                                Save Bike
                            </a>
                        </div>
                    </div>
                </form>
            ) : (
                <div className='bikedetail-list'>
                    <div className='bikedetail-form-btn'>
                        <a className='addbike-btn' href='#' onClick={handleAddBikeClick}>
                            Add Bike
                        </a>
                    </div>
                    <div className='form_group'>
                        <h3>Select Bikes</h3>
                        {bikeList.length > 0 ? (
                            bikeList.map((bike, index) => (
                                <label className='checkcontainer' key={index} >
                                                <input
                                                    type='checkbox'
                                                    id={`MajorService-${index}`}
                                                    name={`MajorService-${index}`}
                                                    value={index}
                                                    checked={selectedBikes.includes(JSON.stringify(bike))}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span className='radiobtn'></span>
                                                <div className='radio_info'>
                                                    <p>{`${bike.bikeBrand} ${bike.bikeModel}`}</p>
                                                </div>
                                            </label>
                                // <div key={index} className='form_group'>
                                //     <input
                                //         type='checkbox'
                                //         value={JSON.stringify(bike)}
                                //         checked={selectedBikes.includes(JSON.stringify(bike))}
                                //         onChange={handleCheckboxChange}
                                //     />
                                //     <label>{`${bike.bikeBrand} ${bike.bikeModel}`}</label>
                                // </div>
                            ))
                        ) : (
                            <p>No bikes available</p>
                        )}
                    </div>
                    {selectedBikes.length > 0 && (
                        <div className='bikedetail-form-btn'>
                            <a className='save-selected-bikes-btn' href='#' onClick={() => {
                                // Handle saving selected bikes
                            }}>
                                Save Selected Bikes
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BikeDetailForm;
