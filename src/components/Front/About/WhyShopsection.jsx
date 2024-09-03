import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useAboutContent } from '../../../contexts/AboutContentContext';

const WhyShopsection = () => {
    const { aboutContent, loading } = useAboutContent();
    
    // Assuming aboutContent has a property 'about_us_shop_details' that is a JSON string
    const details = loading ? [] : JSON.parse(aboutContent?.about_us_shop_details ?? '[]');

    return (
        <div className="WhyShopsection light p-130 pt-0">
            <div className='container'>
                <div className='section_head text-center'>
                    {loading ? (
                        <Skeleton 
                            variant="text" 
                            width="60%" 
                            height={80} 
                            style={{ textAlign: 'center' }}
                        />
                    ) : (
                        <h2 className='size76'>{aboutContent?.about_us_shop_title ?? ''}</h2>
                    )}
                </div>
                <div className='why_uis_inner mt-30'>
                    <div className='hover_box_row'>
                        {loading ? (
                            <>
                                <div className='hover_box_col'>
                                    <Skeleton variant="rectangular" width={400} height={400} />
                                    
                                </div>
                                <div className='hover_box_col'>
                                    <Skeleton variant="rectangular" width={400} height={400} />
                                    
                                </div>
                                <div className='hover_box_col'>
                                    <Skeleton variant="rectangular" width={400} height={400} />
                                    
                                </div>
                            </>
                        ) : (
                            details.map((item, index) => (
                                <div key={index} className='hover_box_col'>
                                    <div className='icon_box'>
                                        <div className='icon_boix_inner'>
                                            <div className='icon'>
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyShopsection;
