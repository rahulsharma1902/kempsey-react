import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'; // Use StaticDatePicker for inline calendar
import dayjs from 'dayjs';

const ServiceDate = () => {
    const [selectedDate, setSelectedDate] = useState(() => {
        // Initialize from localStorage if available
        const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
        return storedBooking.serviceDate ? dayjs(storedBooking.serviceDate) : null;
    });

    const [disabledDates] = useState([
        dayjs('2024-09-10'),
        dayjs('2024-09-15')
    ]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);

        // Save selected date to session storage
        const bookingData = JSON.parse(localStorage.getItem('booking')) || {};
        bookingData.serviceDate = newDate ? newDate.format('YYYY-MM-DD') : null;
        localStorage.setItem('booking', JSON.stringify(bookingData));
    };

    const shouldDisableDate = (date) => {
        // Disable all dates before the current date
        if (date.isBefore(dayjs(), 'day')) {
            return true;
        }

        // Disable specific dates
        return disabledDates.some(disabledDate => date.isSame(disabledDate, 'day'));
    };

    return (
        <div className='store_wrapper_outer'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    label="Select a date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    shouldDisableDate={shouldDisableDate}
                />
            </LocalizationProvider>
        </div>
    );
};

export default ServiceDate;
