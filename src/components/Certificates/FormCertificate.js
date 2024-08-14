import React, { useState, useEffect } from "react";

const FormCertificate = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: 0,
            title: "purchase gift certificate",
            content: (
                <form>
                    <h3>purchase gift certificate</h3>
                    <div className="d-flex">
                        <div class="form_group w-50">
                            <input class="form_control" type="text" name="first_name" placeholder="First Name" />
                        </div>
                        <div class="form_group w-50">
                            <input class="form_control" type="text" name="last_name" placeholder="Last Name" />
                        </div>
                    </div>
                    <div class="form_group">
                        <input class="form_control" type="email" name="email" placeholder="Email Address" />
                    </div>
                    <div class="form_group">
                        <input class="form_control" type="text" name="text" placeholder="Recipient’s Name " />
                    </div>
                    <div class="form_group">
                        <input class="form_control" type="email" name="text" placeholder="Recipient’s Email" />
                    </div>
                    <div class="form_group">
                        <input class="form_control" type="text" name="text" placeholder="Amount" />
                    </div>
                    <div class="check_box_row">
                        <div class="check_col">
                            <label class="form_check">
                                <input type="checkbox" name="showPassword" />
                                <span class="check_custom">✔</span>I agree that Gift Certificates are nonrefundable
                            </label>
                        </div>
                    </div>
                    <div class="form_group">
                        <textarea placeholder="Optional Message"></textarea>
                    </div>
                    <div className="form_group radio-btn">
                    <p>Gift Certificate Theme *</p>
                    <div className="custom-radio">
                    <div class="form_group">
                    <input type="radio" id="html" name="fav_language" value="HTML"/>
                     <label for="html">Birthday</label>
                     </div>
                     <div class="form_group">
                     <input type="radio" id="css" name="fav_language" value="CSS"/>
                     <label for="css">Boy</label>
                     </div>
                     <div class="form_group">
                     <input type="radio" id="javascript" name="fav_language" value="JavaScript"/>
                    <label for="javascript">Celebration</label>
                    </div>
                    <div class="form_group">
                     <input type="radio" id="java" name="fav_language" value="java"/>
                    <label for="java">Christmas</label>
                    </div>
                    <div class="form_group">
                    <input type="radio" id="script" name="fav_language" value="script"/>
                     <label for="script">General Girl</label>
                     </div>
                    </div>
                    </div>

                    <div className="form_btnn">
                        <button className="preview_btn">preview</button>
                        <button>add gift certificate to cart</button>

                    </div>
                </form>

            )
        },
        {
            id: 1,
            title: "redeem gift certificate",
            content: (
                <form>
                <h3>redeem gift certificate</h3>
                <div className="d-flex">
                    <div class="form_group w-50">
                        <input class="form_control" type="text" name="first_name" placeholder="First Name" />
                    </div>
                    <div class="form_group w-50">
                        <input class="form_control" type="text" name="last_name" placeholder="Last Name" />
                    </div>
                </div>
                <div class="form_group">
                    <input class="form_control" type="email" name="email" placeholder="Email Address" />
                </div>
                <div class="form_group">
                    <input class="form_control" type="text" name="text" placeholder="Recipient’s Name " />
                </div>
                <div class="form_group">
                    <input class="form_control" type="email" name="text" placeholder="Recipient’s Email" />
                </div>
                <div class="form_group">
                    <input class="form_control" type="text" name="text" placeholder="Amount" />
                </div>
                <div class="check_box_row">
                    <div class="check_col">
                        <label class="form_check">
                            <input type="checkbox" name="showPassword" />
                            <span class="check_custom">✔</span>I agree that Gift Certificates are nonrefundable
                        </label>
                    </div>
                </div>
                <div class="form_group">
                    <textarea placeholder="Optional Message"></textarea>
                </div>
                <div className="form_group radio-btn">
                <p>Gift Certificate Theme *</p>
                <div className="custom-radio">
                <div class="form_group">
                <input type="radio" id="html" name="fav_language" value="HTML"/>
                 <label for="html">Birthday</label>
                 </div>
                 <div class="form_group">
                 <input type="radio" id="css" name="fav_language" value="CSS"/>
                 <label for="css">Boy</label>
                 </div>
                 <div class="form_group">
                 <input type="radio" id="javascript" name="fav_language" value="JavaScript"/>
                <label for="javascript">Celebration</label>
                </div>
                <div class="form_group">
                 <input type="radio" id="java" name="fav_language" value="java"/>
                <label for="java">Christmas</label>
                </div>
                <div class="form_group">
                <input type="radio" id="script" name="fav_language" value="script"/>
                 <label for="script">General Girl</label>
                 </div>
                </div>
                </div>

                <div className="form_btnn">
                    <button className="preview_btn">preview</button>
                    <button>add gift certificate to cart</button>

                </div>
            </form>
            )
        },
        {
            id: 2,
            title: "check gift certificate balance",
            content: (
                <form>
                <h3>check gift certificate balance</h3>
                <div className="d-flex">
                    <div class="form_group w-50">
                        <input class="form_control" type="text" name="first_name" placeholder="First Name" />
                    </div>
                    <div class="form_group w-50">
                        <input class="form_control" type="text" name="last_name" placeholder="Last Name" />
                    </div>
                </div>
                <div class="form_group">
                    <input class="form_control" type="email" name="email" placeholder="Email Address" />
                </div>
                <div class="form_group">
                    <input class="form_control" type="text" name="text" placeholder="Recipient’s Name " />
                </div>
                <div class="form_group">
                    <input class="form_control" type="email" name="text" placeholder="Recipient’s Email" />
                </div>
                <div class="form_group">
                    <input class="form_control" type="text" name="text" placeholder="Amount" />
                </div>
                <div class="check_box_row">
                    <div class="check_col">
                        <label class="form_check">
                            <input type="checkbox" name="showPassword" />
                            <span class="check_custom">✔</span>I agree that Gift Certificates are nonrefundable
                        </label>
                    </div>
                </div>
                <div class="form_group">
                    <textarea placeholder="Optional Message"></textarea>
                </div>
                <div className="form_group radio-btn">
                <p>Gift Certificate Theme *</p>
                <div className="custom-radio">
                <div class="form_group">
                <input type="radio" id="html" name="fav_language" value="HTML"/>
                 <label for="html">Birthday</label>
                 </div>
                 <div class="form_group">
                 <input type="radio" id="css" name="fav_language" value="CSS"/>
                 <label for="css">Boy</label>
                 </div>
                 <div class="form_group">
                 <input type="radio" id="javascript" name="fav_language" value="JavaScript"/>
                <label for="javascript">Celebration</label>
                </div>
                <div class="form_group">
                 <input type="radio" id="java" name="fav_language" value="java"/>
                <label for="java">Christmas</label>
                </div>
                <div class="form_group">
                <input type="radio" id="script" name="fav_language" value="script"/>
                 <label for="script">General Girl</label>
                 </div>
                </div>
                </div>

                <div className="form_btnn">
                    <button className="preview_btn">preview</button>
                    <button>add gift certificate to cart</button>

                </div>
            </form>
            )
        }
    ];

    return (
        <div className="faq-section certificate_form light p-130">
            <div className="container">
                <div className="faq-wrapper">
                    <div className="tab-wrapper">
                        {/* Tab buttons */}
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

                        {/* Tab content */}
                        <div className="tab-content">
                            {tabs[activeTab].content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormCertificate;
