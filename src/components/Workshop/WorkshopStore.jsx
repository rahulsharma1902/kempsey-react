import React, { useState } from 'react';
import storeimg1 from '../../images/store_img1.png';
import storeimg2 from '../../images/store_img2.png';
import storeimg3 from '../../images/store_img3.png';
import storeimg4 from '../../images/store_img4.png';
import storeimg5 from '../../images/store_img5.png';
import storeimg6 from '../../images/store_img6.png';

// Store data
const stores = [
    { id: 1, image: storeimg1, distance: '100 km', title: 'Kempsey Store - Airport South', info: 'Loren ipsum' },
    { id: 2, image: storeimg2, distance: '120 km', title: 'Kempsey Store - Central Plaza', info: 'Loren ipsum' },
    { id: 3, image: storeimg3, distance: '90 km', title: 'Kempsey Store - Downtown', info: 'Loren ipsum' },
    { id: 4, image: storeimg4, distance: '110 km', title: 'Kempsey Store - Riverside', info: 'Loren ipsum' },
    { id: 5, image: storeimg5, distance: '80 km', title: 'Kempsey Store - North Hill', info: 'Loren ipsum' },
    { id: 6, image: storeimg6, distance: '105 km', title: 'Kempsey Store - East Side', info: 'Loren ipsum' },
];

// WorkshopStore Component
const WorkshopStore = ({ handleNext }) => {
    return (
        <div className='store_wrapper_outer'>
            <div className='Module_head text-center'>
                <h2 className='size46'>Stores Near You</h2>
            </div>
            <div className='store_row'>
                {stores.map(store => (
                    <div className='store_col' key={store.id}>
                        <div className='store_box' onClick={handleNext}>
                            <div className='store_thumb'>
                                <img src={store.image} alt={store.title} />
                            </div>
                            <div className='store_card_inner'>
                                <span className='dis_tag'>{store.distance}</span>
                                <h3 className='store_title'>{store.title}</h3>
                                <p className='store_info'>{store.info}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkshopStore;
