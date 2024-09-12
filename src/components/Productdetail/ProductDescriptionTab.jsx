import React, { useState } from 'react';

const ProductDescriptionTab = (data) => {
    const [activeTab, setActiveTab] = useState('description');

    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return <div className='product_tab_content'>
                    <div className='content_inner' dangerouslySetInnerHTML={{ __html: data?.data?.description ?? '' }}  />
                </div>;
            case 'details':
                return <div className='product_tab_content'>
                    <div className='content_inner' dangerouslySetInnerHTML={{ __html: data?.data?.details ?? '' }}  />
            </div>;
            // case 'reviews':
            //     return <div className='product_tab_content'>
            //     <div className='content_inner'>
            //         <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,</p>
            //     </div>
            // </div>;
            default:
                return null;
        }
    };

    return (
        <div className='product_des_section'>
            <div className='container'>
                <div className='description_tab_wrap'>
                    <ul className='tab_links'>
                        <li 
                            className={activeTab === 'description' ? 'active' : ''} 
                            onClick={() => setActiveTab('description')}>Description
                        </li>
                        <li 
                            className={activeTab === 'details' ? 'active' : ''} 
                            onClick={() => setActiveTab('details')}
                        >
                            Details
                        </li>
                        {/* <li 
                            className={activeTab === 'reviews' ? 'active' : ''} 
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </li> */}
                    </ul>
                    <div className='tab_content'>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDescriptionTab;
