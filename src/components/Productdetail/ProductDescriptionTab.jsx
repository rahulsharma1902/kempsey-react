import React, { useState } from 'react';

const ProductDescriptionTab = () => {
    const [activeTab, setActiveTab] = useState('description');

    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return <div className='product_tab_content'>
                    <div className='content_inner'>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident,</p>
                    </div>
                </div>;
            case 'details':
                return <div className='product_tab_content'>
                <div className='content_inner'>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>
            </div>;
            case 'reviews':
                return <div className='product_tab_content'>
                <div className='content_inner'>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,</p>
                </div>
            </div>;
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
                        <li 
                            className={activeTab === 'reviews' ? 'active' : ''} 
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </li>
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
