import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import workshopicon from '../images/wrk_shop.svg';
import contacticon from '../images/contact_icon.svg';
import usericon from '../images/icon_user.svg';
import hearticon from '../images/icon_heart.svg';
import carticon from '../images/icon_cart.svg';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search logic here, e.g., redirect or filter results
        console.log('Search query:', searchQuery);
    };

    return (
        <div>
            <header className='site_header'>
                <div className='top_bar'>
                    <p>Need help finding something? <Link to="/">Let us know!</Link></p>
                </div>
                <div className='middle_header'>
                    <div className='container_full'>
                        <div className='top_navigation'>
                            <div className='logo_col'>
                                <Link className='site_brand' to="/login"><img src={logo} alt="logo" /></Link>
                            </div>
                            <div className='search_col'>
                                <form className='site_search' onSubmit={handleSearchSubmit}>
                                    <div className='search_wrap'>
                                        <input
                                            type="text"
                                            className="search_input"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                        <button type="submit" className="search_button">
                                            <i className="fas fa-search"></i> {/* Use Font Awesome or your own icon */}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className='header_icons_col'>
                                <div className='workshop_links'>
                                    <div className="links_wrap">
                                        <Link to="/" className="icon_text_link"><img src={workshopicon} alt="icon" /> Workshop</Link>
                                        <Link to="/" className="icon_text_link"><img src={contacticon} alt="icon" /> Contact Us</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='icon_links_col'>
                                <div className='icon_links'>
                                    <Link to="/" className="icon_link"><img src={usericon} alt="icon" /></Link>
                                    <Link to="/" className="icon_link"><img src={hearticon} alt="icon" /></Link>
                                    <Link to="/" className="icon_link"><img src={carticon} alt="icon" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
