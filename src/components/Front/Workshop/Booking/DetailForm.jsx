import React, { useState, useEffect } from 'react';

const DetailForm = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        hearAboutUs: '',
    });

    useEffect(() => {
        // Retrieve the existing booking data from local storage
        const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
        const storedDetails = storedBooking.userDetails || {};

        // Set initial form data from the stored booking data
        setFormData(storedDetails);
    }, []);

    useEffect(() => {
        // Update the booking data in local storage with the new user details
        const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
        storedBooking.userDetails = formData;
        localStorage.setItem('booking', JSON.stringify(storedBooking));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the form data state
        setFormData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value,
            };

            // Update the booking data in local storage
            const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
            storedBooking.userDetails = newData;
            localStorage.setItem('booking', JSON.stringify(storedBooking));

            return newData;
        });
    };

    return (
        <form className='detail-form'>
            <div className='detail-form-box'>
                <div className='detail-form_row form_row'>
                    <div className='detail-form_col form_group w-50'>
                        <input
                            className='form_control'
                            type='text'
                            id='fname'
                            name='fname'
                            placeholder='First Name'
                            value={formData.fname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='detail-form_col form_group w-50'>
                        <input
                            className='form_control'
                            type='text'
                            id='lname'
                            name='lname'
                            placeholder='Last Name'
                            value={formData.lname}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='form_group'>
                    <input
                        type='email'
                        className='form_control'
                        id='inputEmail4'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='form_group'>
                    <input
                        type='tel'
                        className='form_control'
                        id='inputEmail5'
                        name='phone'
                        placeholder='Phone Number'
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className='form_group'>
                    <select
                        id='hear-aboutus'
                        className='form_control'
                        name='hearAboutUs'
                        value={formData.hearAboutUs}
                        onChange={handleChange}
                    >
                        <option value='' disabled>
                            How did you hear about us?
                        </option>
                        <option value='Good'>Good</option>
                        <option value='Bad'>Bad</option>
                        <option value='Never hear'>Never heard</option>
                        <option value='Something moderate'>Something moderate</option>
                    </select>
                </div>
            </div>
        </form>
    );
};

export default DetailForm;
