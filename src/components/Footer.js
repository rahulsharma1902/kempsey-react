import React from 'react';
import { Link } from 'react-router-dom';
import card1 from '../images/card1.png';
import card2 from '../images/card2.png';
import card3 from '../images/card3.png';
import card4 from '../images/card4.png';
import card5 from '../images/card5.png';
import card6 from '../images/card6.png';
import card7 from '../images/card7.png';
import chat from '../images/chat.png';
import easy from '../images/easy.png';
import Instagrammodule from '../components/Instagrammodule';
import Newsletter from '../components/Newsletter'


const Footer = () => {
    return (
        <footer>
            <Newsletter />
            <Instagrammodule />
            <div className="footer-content">
                <div className="footer_links">
                    <div className="container">
                        <div className="footer_row">
                            <div className="footer_col">
                                <div className="footer_link">
                                    <div className="footer_grid">
                                        <div className="footer_contnt">
                                            <h5>Quick Links</h5>
                                            <div className="link_list">
                                                <ul className="foter_txt">
                                                    <li><Link to="#">Home</Link></li>
                                                    <li><Link to="#">Camping</Link></li>
                                                    <li><Link to="#">Fishing</Link></li>
                                                    <li><Link to="#">Bike shop</Link></li>
                                                    <li><Link to="#">Gun Shop</Link></li>
                                                </ul>
                                                <ul className="foter_txt">
                                                    <li><Link to="/about-us">About Us</Link></li>
                                                    <li><Link to="#">FAQ</Link></li>
                                                    <li><Link to="#">Customer Service</Link></li>
                                                    <li><Link to="#">My Account</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="footer_contnt cont2">
                                            <h5>Follow on</h5>
                                            <ul>
                                                <li>
                                                    <Link to="#"><i className="fa-brands fa-facebook-f"></i> Facebook</Link>
                                                </li>
                                                <li>
                                                    <Link to="#"><i className="fa-brands fa-instagram"></i> Instagram</Link>
                                                </li>
                                                <li>
                                                    <Link to="#"><i className="fa-brands fa-twitter"></i> Twitter</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer_rt_txt">
                                        <p>
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                            when an unknown printer took a galley of type and scrambled it to make a type
                                            specimen book.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="footer_col">
                                <div className="footer_contnt mt_ft">
                                    <ul>
                                        <li>
                                            <strong>Address:</strong>
                                            8975 W Charleston Blvd. Suite 190 Las Vegas, NV 89117
                                        </li>
                                        <li><strong>Phone:</strong> <a href="tel:01234567890">0 123 4567 890</a></li>
                                        <li><strong>Email:</strong> <a href="mailto:contact@KempseyOutdoors.com">contact@KempseyOutdoors.com</a></li>
                                    </ul>
                                    <ul className="cards">
                                        <li>
                                            <img src={card1} alt="Card 1" />
                                        </li>
                                        <li>
                                            <img src={card2} alt="Card 2" />
                                        </li>
                                        <li>
                                            <img src={card3} alt="Card 3" />
                                        </li>
                                        <li>
                                            <img src={card4} alt="Card 4" />
                                        </li>
                                        <li>
                                            <img src={card5} alt="Card 5" />
                                        </li>
                                        <li>
                                            <img src={card6} alt="Card 6" />
                                        </li>
                                        <li>
                                            <img src={card7} alt="Card 7" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat_box">
                        {/* <Link to="#"><img src={chat} alt="Chat" /></Link> */}
                    </div>
                </div>
                <div className="footer_marquee">
                    <div className="container">
                        <div className="marquee">
                            <div className="marq-img">
                                <img src={easy} alt="Easy" />
                            </div>
                            <div className="marq-img">
                                <img src={easy} alt="Easy" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_btm">
                    <div className="container">
                        <div className="cpy_rgt">
                            <p>© 2024 Kempsey Outdoors, All rights reserved.</p>
                            <ul className="footer_bt_rt">
                                <li><Link to="#">Privacy Policy</Link></li>
                                <li><Link to="#">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
