import React from 'react';

const BikeDetailForm = () => {

// export default function Bikedetailform () {


    return (
        <form className='bikedetail-form'>
            <div className='bikedetail-form-box'>
                <div className="bikedetail-form-btn">
                    <a className='addbike-btn' href='#'>Add Bike</a>
                </div>
                <div class="form_group">
                    <input type="text" class="form_control" id="bikebrand" placeholder="Bike brand* eg. Specialized/Giant"/>
                </div>
                <div class="form_group">
                    <input type="text" class="form_control" id="bikemodel" placeholder="Model eg. S-Works/Anthem (optional)"/>
                </div>
                <div class="form_group">
                    <select id="hear-aboutus" class="form_control">
                        <option selected>Your bike type</option>
                        <option>Road Bikes</option>
                        <option>Mountain Bikes</option>
                        <option>Hybrid Bikes</option>
                        <option>Commuter Bikes</option>
                        <option>Cruiser Bikes </option>
                        <option>Folding Bikes</option>
                        <option>Electric Bikes</option>
                    </select>
                </div>
                <div class="form_group">
                    <input type="text" class="form_control" id="bikecolor" placeholder="Colour (optional)"/>
                </div>
                <div className="bikedetail-form-btn">
                    <a className='savebike-btn' href='#'>Save Bike</a>
                </div>
            </div>  
        </form>
    );
};

export default BikeDetailForm;