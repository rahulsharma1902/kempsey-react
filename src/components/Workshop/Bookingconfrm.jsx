import React from 'react';
import calenderimage from '../../images/Confrm-icon.svg'

const BookingConfirm = () => {


    return (
        <div className="booking-confirm">
            <div className='booking-confirm-img'>
                <img src={calenderimage} alt="image"  className='calender_image'/>
            </div>
            <div className='booking-confirm-text text-center'>
                <h2 className='size46'>Booking Confirmed</h2>
                <p>Your service booking has been confirmed. Please check your email for a copy of your order details.</p>
            </div>
            <div className='booking-confirm-refrence-number text-center'>
                <h5>Service Reference Number</h5>
                <p>for your HONDA - HT:1232</p>
            </div>
        </div>
    );
};

export default BookingConfirm;
