import React from 'react';
import newsleterbg from '../images/newsleter_bg.png';
import whitearrow from '../images/white_arrow.svg';

const Newsletter = () => {
    return (
        <div className="newsleter_section dark" style={{ backgroundImage: `url(${newsleterbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container">
                <div className="newsleter_inner text-center">
                    <h2 className="size65">Join our mailing list to stay up to date on <br /> the latest trends and new arrivals.</h2>
                    <form className="newsletter_form mt-40">
                       <div className='news_wrap'>
                        <input 
                                type="email" 
                                className="newsletter_input" 
                                placeholder="Your Email" 
                                required 
                            />
                            <button 
                                type="submit" 
                                className="newsletter_button"
                            >
                                <img src={whitearrow} alt="image arrow"/>
                            </button>
                       </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
