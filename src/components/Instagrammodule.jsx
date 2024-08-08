import React from 'react';
import instacard1 from '../images/insta_post7.png';
import instacard2 from '../images/insta_post6.png';
import instacard3 from '../images/insta_post5.png';
import instacard4 from '../images/insta_post4.png';
import instacard5 from '../images/insta_post3.png';
import instacard6 from '../images/insta_post2.png';
import instacard7 from '../images/insta_post1.png';

const instagramPosts = [
    instacard1,
    instacard2,
    instacard3,
    instacard4,
    instacard5,
    instacard6,
    instacard7
];

const Instagrammodule = () => {
    return (
        <div>
            <div className='instagram_section'>
                <div className='container_full'>
                    <div className='inner'>
                        <div className='section_head text-center'>
                            <div className='insta_head'>
                                <div className='insta_icon'><i className="fa-brands fa-instagram"></i></div>
                                <p>@KempseyOutdoors</p>
                            </div>
                        </div>
                        <div className='insta_flex'>
                            {instagramPosts.map((post, index) => (
                                <div className='insta_post' key={index}>
                                    <div className='ins_post_card'>
                                        <img src={post} alt={`insta post ${index + 1}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instagrammodule;