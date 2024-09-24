import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import workshopicon from '../images/wrk_shop.svg';
import contacticon from '../images/contact_icon.svg';
import usericon from '../images/icon_user.svg';
import logout from '../images/logout1.svg';
import hearticon from '../images/icon_heart.svg';
import carticon from '../images/icon_cart.svg';
import { useCategories } from '../contexts/CategoryContext';
import { AuthContext} from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const Header = () => {
    const { user } = useContext(AuthContext); 
    const { cartCount } = useContext(CartContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [navOpen, setNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // State for search bar toggle
    const { ParentCategories, loading } = useCategories();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search logic here, e.g., redirect or filter results
        console.log('Search query:', searchQuery);
    };

    const toggleNavigation = () => {
        setNavOpen(!navOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <header className='site_header'>
            <div className='top_bar'>
                <p>Need help finding something? <Link to="/">Let us know!</Link></p>
            </div>
            <div className='middle_header'>
                <div className='container_full'>
                    <div className='top_navigation'>
                        <div className="mobile_toggle_col">
                            <button 
                                className={`navigation_toggle ${navOpen ? 'open' : ''}`} 
                                onClick={toggleNavigation}
                            >
                                <span className='bar bar1'></span>
                                <span className='bar bar2'></span>
                                <span className='bar bar3'></span>
                            </button>
                            <button className={`search_toggle ${searchOpen ? 'open' : ''}`} onClick={toggleSearch}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        <div className='logo_col'>
                            <Link className='site_brand' to="/"><img src={logo} alt="logo" /></Link>
                        </div>
                        <div className={`search_col ${searchOpen ? 'open' : ''}`}>
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
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='header_icons_col'>
                            <div className='workshop_links'>
                                <div className="links_wrap">
                                    <Link to="/Workshop" className="icon_text_link"><img src={workshopicon} alt="icon" /> Workshop</Link>
                                    <Link to="/Contact-us" className="icon_text_link"><img src={contacticon} alt="icon" /> Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className='icon_links_col'>
                            <div className='icon_links'>
                            {user ? (
                                <Link to="/logout" className="icon_link">
                                    <img style={{ height: '33px', marginTop: '5px'}} src={logout} alt="logout icon" />
                                </Link>
                            ) : (
                                <Link to="/login" className="icon_link">
                                    <img src={usericon} alt="login icon" />
                                </Link>
                            )}
                                {/* <Link to="/login" className="icon_link"><img src={usericon} alt="icon" /></Link>
                                <Link to="/logout" className="icon_link">
                                    <img style={{ height: '35px' }} src={logout} alt="icon" />
                                </Link> */}
                                {/* <Link to="/" className="icon_link fav_link"><img src={hearticon} alt="icon" /> <span className='value'><span className='value_text'>100</span></span></Link> */}
                                {/* <Link to="/cart" className="icon_link"><img src={carticon} alt="icon" />
                                     <span className='value'><span className='value_text'>{cartCount}</span></span>
                                </Link> */}
                                {(!user || (user && user.user_type !== 'admin')) ? (
                                    
                                    <Link to="/cart" className="icon_link">
                                        <img src={carticon} alt="icon" />
                                        {/* <span className='value'><span className='value_text'>{cartCount}</span></span> */}
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`navigation_header ${navOpen ? 'open' : ''}`}>
                <div className='container'>
                    <div className='main_navigation'>
                        <div className="navigation_wrap ">
                            <div className='header_nav'>
                                <ul className='navigation'>
                                    <li className='list_item'>
                                        <Link to="/" className='nav_link'>Home</Link>
                                    </li>
                                    {ParentCategories?.map(category => (
                                        <li className='list_item' key={category.id}>
                                            <Link to={`/shop/${category.slug}`} className='nav_link'>{category.name}</Link>
                                        </li>
                                    ))}
                                    <li className='list_item'>
                                        <Link to="/about-us" className='nav_link'>About Us</Link>
                                    </li>
                                    <li className='list_item'>
                                        <Link to="/Faq" className='nav_link'>FAQ</Link>
                                    </li>
                                    <li className='list_item'>
                                        <Link to="/customer-services" className='nav_link'>Customer Service</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className='navigation_button_col'>
                                <Link to="/GiftCertificates" className='blue_link'>Gift Certificate</Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
