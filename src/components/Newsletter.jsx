import React, { useState } from 'react';
import newsleterbg from '../images/newsleter_bg.png';
import whitearrow from '../images/white_arrow.svg';
import { toast } from 'react-toastify'; // Optional: For displaying feedback messages
import axios from 'axios'; // Assuming you are using axios for the API call

const Newsletter = ({ data }) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    // Handle email input change
    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    // Simple email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        if (!validateEmail(email)) {
            setErrors('Please enter a valid email address.');
            return;
        }

        setErrors(''); // Clear any previous errors
        // try {
        //         const response = await axios.post('/api/contact', email);
        //         toast.success('Subscribed successfully!');
                
        //     } catch (error) {
        //         toast.error('Failed to Subscribed. Please try again later.');
        //     }
        setEmail('');
        toast.success('Subscribed successfully!'); // Display a success message
    };

    return (
        <div 
            className="newsleter_section dark" 
            style={{ backgroundImage: `url(${newsleterbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="container">
                <div className="newsleter_inner text-center">
                    <h2 className="size65">
                        {data?.text ?? 'Join our mailing list to stay up to date on the latest trends and new arrivals.'}
                    </h2>
                    <form className="newsletter_form mt-40" onSubmit={handleSubmit}>
                        <div className='news_wrap'>
                            <input 
                                type="email" 
                                className="newsletter_input" 
                                placeholder="Your Email" 
                                value={email}
                                onChange={handleInputChange}
                                required 
                            />
                            <button 
                                type="submit" 
                                className="newsletter_button"
                            >
                                <img src={whitearrow} alt="Submit" />
                            </button>
                        </div>
                        {errors && <p className="error_message error-text">{errors}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
