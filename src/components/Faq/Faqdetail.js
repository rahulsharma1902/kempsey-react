import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";
import { Faqcategories } from '../../api/apiStorefront';

const Faqdetail = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [tabs, setTabs] = useState([]);

    // const tabs = [
    //     {
    //         id: 0,
    //         title: "Create an Account",
    //         content: [
    //             { id: 0, title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 1, title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 2, title: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 3, title: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 4, title: "On the other hand, we denounce with righteous indignation and dislike ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." }
    //         ]
    //     },
    //     {
    //         id: 1,
    //         title: "Finding Products",
    //         content: [
    //             { id: 0, title: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 1, title: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 2, title: "On the other hand, we denounce with righteous indignation and dislike ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 3, title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 4, title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },

    //         ]
    //     },
    //     {
    //         id: 2,
    //         title: "Payment Options and Security",
    //         content: [
    //             { id: 0, title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 1, title: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 2, title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 3, title: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    //             { id: 4, title: "On the other hand, we denounce with righteous indignation and dislike ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." }
    //         ]
    //     }
    // ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await Faqcategories();
                const fetchedCategories = response.data; 
    
                const mappedTabs = fetchedCategories
                    .filter(category => category.faqs && category.faqs.length > 0) // Filter out categories without FAQs
                    .map((category, index) => ({
                        id: index,
                        title: category.category_name, 
                        content: category.faqs.map((faq, faqIndex) => ({
                            id: faqIndex,
                            title: faq.question,
                            content: faq.answer,
                        })),
                    }));
    
                setTabs(mappedTabs);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
    
        fetchCategories();
    }, []);

    useEffect(() => {
        // Close all accordions when the active tab changes
        setActiveAccordion(null);
    }, [activeTab]);

    return (
        <div className="faq-section p-130">
            <div className="container">
                <div className="faq-wrapper">
                    <div className="faq-heading">
                        <h2 className="size76">Frequently Asked Questions</h2>
                    </div>
                    {tabs.length > 0 ? ( 
                        <div className="tab-wrapper">
                            <div className="tabs">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={tab.id}
                                        className={`tab-button ${activeTab === index ? 'active' : ''}`}
                                        onClick={() => setActiveTab(index)}
                                        aria-selected={activeTab === index}
                                        role="tab"
                                    >
                                        {tab.title}
                                    </button>
                                ))}
                            </div>
                            <div className="tab-content">
                                {tabs[activeTab].content.map((accordion, index) => (
                                    <Accordion
                                        key={accordion.id}
                                        id={accordion.id}
                                        title={accordion.title}
                                        content={accordion.content }
                                        isOpen={activeAccordion === accordion.id}
                                        onToggle={() => setActiveAccordion(activeAccordion === accordion.id ? null : accordion.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No FAQs available at the moment.</p>  
                    )}
                </div>
            </div>
        </div>
    );
}

export default Faqdetail;
