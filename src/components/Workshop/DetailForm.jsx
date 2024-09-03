import React from 'react';

const DetailForm = () => {

// export default function detailform () {


    return (
        <form className='detail-form'>
          <div className='detail-form-box'>
                <div className='detail-form_row form_row'>
                    <div className='detail-form_col form_group  w-50'>
                        <input className="form_control" type="text" id="fname" name="fname" placeholder='First Name'/>
                    </div>  
                    <div className='detail-form_col form_group  w-50'>
                        <input className="form_control" type="text" id="lname" name="lname" placeholder='Last Name'/>
                    </div>
                </div> 
                <div class="form_group">
                    <input type="email" class="form_control" id="inputEmail4" placeholder="Email"/>
                </div>
                <div class="form_group">
                    <input type="tel" class="form_control" id="inputEmail5" placeholder="Phone Number"/>
                </div>
                <div class="form_group">
                    <select id="hear-aboutus" class="form_control">
                        <option selected>How did you hear about us?</option>
                        <option>Good</option>
                        <option>Bad</option>
                        <option>Never hear</option>
                        <option>Something moderate</option>
                    </select>
                </div>
            </div>  
        </form>
    );
};

export default DetailForm;