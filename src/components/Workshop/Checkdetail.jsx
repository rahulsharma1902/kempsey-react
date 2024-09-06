import React, { useEffect, useState } from 'react';
import { getServiceTypes } from '../../api/apiService'; // Import the API call function
import {ServiceContentContext} from '../../contexts/WorkshopContext';
const CheckDetail = ({ Types }) => {
    const [bikeBrand, setBikeBrand] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Types) {
            const fetchServiceTypes = async () => {
                try {
                    const response = await getServiceTypes();
                    if (response.data) {
                        setServiceTypes(response.data);
                    } else {
                        console.error('Failed to fetch service types.');
                    }
                } catch (error) {
                    console.error('Failed to fetch service types.', error);
                }
            };

            const bookingData = JSON.parse(localStorage.getItem('booking')) || {};
            setBikeBrand(bookingData.bikeDetail?.bikeBrand || '');
            console.log(bikeBrand);
            setSelectedDate(bookingData.serviceDate || '');
            setSelectedTypes(bookingData.types || []);

            fetchServiceTypes();
        }
    }, [Types]);

    // Calculate total price based on selected types
    const calculateTotalPrice = () => {
        return selectedTypes.reduce((total, typeId) => {
            const serviceType = serviceTypes.find(type => type.id === typeId);
            const price = serviceType ? parseFloat(serviceType.club_price) : 0; // Convert price to a number
            return total + price;
        }, 0);
    };

    // Format the total price to have two decimal places
    const formattedTotalPrice = calculateTotalPrice().toFixed(2);

    return (
        <div className='summary-bill'>
            <div className='summary-bill-box'>
                <h2 className='size46'>Check Details And Confirm</h2>
                <div className="summary-bill-detail">
                    <table>
                        <tbody>
                            <tr>
                                <td>{selectedDate}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Bike Brand</td>
                                <td>{bikeBrand}</td>
                            </tr>
                            {serviceTypes
                                .filter(type => selectedTypes.includes(type.id))
                                .map((type) => (
                                    <tr key={type.id}>
                                        <td>{type.name}</td>
                                        <td>${parseFloat(type.club_price).toFixed(2)}</td> {/* Format price */}
                                    </tr>
                                ))}
                            <tr className='total-price'>
                                <td>Total</td>
                                <td>${formattedTotalPrice}</td> {/* Display formatted total price */}
                            </tr>
                        </tbody>
                    </table>
                    <div className="cupon-btn">
                        <form method="post" className="d-flx">
                            <input type="text" name="coupon" id="coupon" placeholder="Add coupon or gift code" className="form_control" />
                            <button type="submit" className="cuppn-btn cta">Apply</button>
                        </form>
                    </div>
                    <div className="summary-bill-deatial">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckDetail;
