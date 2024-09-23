import React, { useState, useEffect } from 'react';
import calenderimage from '../../../../images/Confrm-icon.svg';
import failedImage from '../../../../images/failed-icon.png';
import { addBooking } from '../../../../api/apiBookings';

const BookingConfirm = ({ confirmed }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingResponse, setBookingResponse] = useState(null);
    const [bookingMessage, setBookingMessage] = useState(null);

    useEffect(() => {
        console.log('sdf');
        const confirmBooking = async () => {
            if (confirmed) {
                setLoading(true);
                const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
                
                try {
                    const response = await addBooking(storedBooking);
                    console.log(response);
                    if (response.data) {
                        setBookingMessage(response?.message);
                        setBookingResponse(response?.data);
                    } else {
                        setError('Failed to confirm the booking. Please try again.');
                    }
                } catch (error) {
                    console.error('Failed to fetch store details.', error);
                    setError('An error occurred while confirming your booking.');
                } finally {
                    setLoading(false);
                }
            }
        };

        confirmBooking();
    }, [confirmed]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="booking-failed text-center">
                <img src={failedImage} alt="Booking Failed" className='failed-image' />
                <h2>Booking Failed</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="booking-confirm">
            <div className='booking-confirm-img'>
                <img src={calenderimage} alt="Booking Confirmed" className='calender_image' />
            </div>
            <div className='booking-confirm-text text-center'>
                <h2 className='size46'>Booking Confirmed</h2>
                <p>{bookingMessage}</p>
            </div>
            <div className='booking-confirm-reference-number text-center'>
                <h5>Service Reference Number</h5>
                <p>{bookingResponse ? `For your ${bookingResponse.bike_brand} - ${bookingResponse.booking_number}` : 'Reference details not available.'}</p>
            </div>
        </div>
    );
};

export default BookingConfirm;
