import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconphone from '../../images/icon_phone.svg';
import iconemail from '../../images/icon_emailk.svg';
import iconaddress from '../../images/icon_address.svg';
import { toast } from 'react-toastify';
import axios from 'axios'; // Assuming you are using axios for the API call

const ContactSection = ({ contactUs }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            toast.success('Your message has been sent successfully!');
            setFormData({
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        email: '',
                        message: '',
                    });
                    setLoading(false);
            // try {
            //     const response = await axios.post('/api/contact', formData);
            //     setLoading(false);
            //     toast.success('Your message has been sent successfully!');
            //     setFormData({
            //         firstName: '',
            //         lastName: '',
            //         phoneNumber: '',
            //         email: '',
            //         message: '',
            //     });
            // } catch (error) {
            //     setLoading(false);
            //     toast.error('Failed to send your message. Please try again.');
            // }
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
                                            
                                        />
                                        {errors.firstName && <p className="error_message error-text">{errors.firstName}</p>}
                                    </div>
                                    <div className={`form_group w-50 ${errors.lastName ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name*"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            
                                        />
                                        {errors.lastName && <p className="error_message error-text">{errors.lastName}</p>}
                                    </div>
                                    <div className={`form_group ${errors.phoneNumber ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="Phone Number*"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            
                                        />
                                        {errors.phoneNumber && <p className="error_message error-text">{errors.phoneNumber}</p>}
                                    </div>
                                    <div className={`form_group ${errors.email ? 'error' : ''}`}>
                                        <input
                                            className="form_control"
                                            type="email"
                                            name="email"
                                            placeholder="Email Id*"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            
                                        />
                                        {errors.email && <p className="error_message error-text">{errors.email}</p>}
                                    </div>
                                    <div className={`form_group ${errors.message ? 'error' : ''}`}>
                                        <textarea
                                            className="form_control"
                                            name="message"
                                            placeholder="Message*"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            
                                        />
                                        {errors.message && <p className="error_message error-text">{errors.message}</p>}
                                    </div>
                                    <div className="form_group">
                                        <button className="cta" type="submit" disabled={loading}>
                                            {loading ? 'Sending...' : 'Send'}
                                        </button>
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
