import React, { useRef, useEffect, useState } from "react";

const Accordion = ({ title, content, isOpen, onToggle }) => {
    const contentRef = useRef(null);
    const [isContentVisible, setIsContentVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsContentVisible(true);
        } else {
            // Delay hiding content to allow the transition to complete
            const timeout = setTimeout(() => setIsContentVisible(false), 300); // Match the duration of max-height transition
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : "0px";
        }
    }, [isOpen]);

    return (
        <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
            <button
                className="accordion-title"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${title}`}
            >
                {title}
                <span className={`tab-icon ${isOpen ? 'open' : ''}`}>
                <i class="fa-solid fa-angle-down"></i>
                </span>
            </button>
            <div
                ref={contentRef}
                id={`accordion-content-${title}`}
                className={`accordion-content ${isContentVisible ? 'visible' : 'hidden'}`}
            >
                <p>{content}</p>
            </div>
        </div>
    );
};

export default Accordion;
