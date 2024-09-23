import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconphone from '../../images/icon_phone.svg';
import iconemail from '../../images/icon_emailk.svg';
import iconaddress from '../../images/icon_address.svg';
import {useStorefrontContent } from '../../contexts/StoreFrontContext.js';

const ContactSection = () => {
    const { contactUs, loading } = useStorefrontContent();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.message) errors.message = 'Message is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted:', formData);
            // Submit the form data to the server or perform other actions
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="ContactSection light p-130">
            <div className='container'>
                <div className='contact_row'>
                    <div className='contact_col address_col'>
                        <div className='section_head'>
                            <h2 className='size46'>{ contactUs?.content_heading ?? 'Let’s See How We Can Help You!'}</h2>
                            <p>{ contactUs?.content_sub_heading ??  'To speak about how I can help capture your essence in film, get in touch.'}</p>
                        </div>

                        <div className='address_info'>
                            <div className='address_box'>
                                <div className='addreess_icon'>
                                    <img src={iconphone} alt="Phone Icon"/>
                                </div>
                                <div className='address_text'>
                                    <p><b>Phone:</b></p>
                                    <p><Link to="tel:0 123 4567 890 ">0 123 4567 890</Link></p>
                                </div>
                            </div>
                            <div className='address_box'>
                                <div className='addreess_icon'>
                                    <img src={iconemail} alt="Email Icon"/>
                                </div>
                                <div className='address_text'>
                                    <p><b>Email:</b></p>
                                    <p><Link to="mailto:contact@KempseyOutdoors.com">contact@KempseyOutdoors.com</Link></p>
                                </div>
                            </div>
                            <div className='address_box'>
                                <div className='addreess_icon'>
                                    <img src={iconaddress} alt="Address Icon"/>
                                </div>
                                <div className='address_text'>
                                    <p><b>Address:</b></p>
                                    <p>8975 W Charleston Blvd. Suite 190
                                    Las Vegas, NV 89117</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='contact_col'>
                        <div className='contact_form'>
                            <form onSubmit={handleSubmit}>
                                <div className="form_row">
                                    <div className={`form_group w-50 ${errors.firstName ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name*"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.firstName && <p className="error_message">{errors.firstName}</p>}
                                    </div>
                                    <div className={`form_group w-50 ${errors.lastName ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name*"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.lastName && <p className="error_message">{errors.lastName}</p>}
                                    </div>
                                    <div className={`form_group ${errors.phoneNumber ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="Phone Number*"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.phoneNumber && <p className="error_message">{errors.phoneNumber}</p>}
                                    </div>
                                    <div className={`form_group ${errors.email ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="email"
                                            name="email"
                                            placeholder="Email Id*"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.email && <p className="error_message">{errors.email}</p>}
                                    </div>
                                    <div className={`form_group ${errors.message ? 'error' : ''}`}>
                                        <textarea
                                            className="form_control"
                                            name="message"
                                            placeholder="Message*"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.message && <p className="error_message">{errors.message}</p>}
                                    </div>
                                    <div className="form_group">
                                        <button className="cta">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
