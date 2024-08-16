import React from 'react';
import { Link } from 'react-router-dom';
import CheckImage from '../../images/check.png';




const Servicing = () => {
    return (
        <div className="servicing_section light p-130">
            <div className="container">
                <div className="servicing_heading">
                    <span>workshop</span>
                    <h2 className="size76">Bike Servicing</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <Link to="/workshop-booking" className='cta'>book a service</Link>

                </div>

                <div className="servicing_table">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "35%" }}><h3>Servicing</h3><p>Buy Club Membership</p></th>
                                <th className="list-table"><h4>Tune-Up</h4><p>Full Price <b>$99</b></p><span>Club Price <b>$79</b> </span></th>
                                <th className="list-table"><h4>Standard</h4><p>Full Price <b>$139</b></p><span>Club Price <b>$119</b> </span></th>
                                <th className="list-table"><h4>Standard</h4><p>Full Price <b>$199</b></p><span>Club Price <b>$169</b> </span></th>
                                <th className="list-table"><h4>Ultimate</h4><p>Full Price <b>$360</b></p><span>Club Price <b>$299</b> </span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Service Report</th>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Safety Check</th>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Frame Wipe Down</th>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>All Bolts Tightened & Checked</th>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Brakes Tuned</th>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Gears Tuned</th>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Lubricate Chain & Cables</th>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Three Standard Parts Installed </th>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Spoke Tensions Checked</th>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Full Drivetrain Degrease & Clean</th>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Wheels Trued & Spokes Tensioned</th>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Wheel Hubs Check & Adjusted</th>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Detail Polish Frame & Wheels</th>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Headset Inspected & Adjusted</th>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Bottom Bracket Inspected & Adjusted</th>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>New Cables</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Bike Stripped to Bare Frame</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Brake Bleed</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr>
                                <th>Headset, Bottom Bracket & Hubs Greased</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                            <tr className="last_tr">
                                <th>Suspension Adjustment</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><img src={CheckImage} alt="Check" style={{ width: '20px' }} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="workshop_wrapper">
                    <div className="workshop_content">
                        <h3 className="size46">Kempsey Workshop Servicing & Bike Repairs</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                            desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.</p>

                    </div>
                    <div className="workshop_content">
                        <h3 className="size46">Electric Bikes</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                    </div>
                    <div className="workshop_content">
                        <h3 className="size46">Bike Maintenance Classes</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>

                    </div>
                    <div className="workshop_content">
                        <h3 className="size46">Bike Fitting</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                    </div>
                    <div className="workshop_content">
                        <h3 className="size46">Bike Build (from box)</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>

                    </div>
                    <div className="workshop_content">
                        <h3 className="size46">Bike Maintenance Classes</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Servicing;
