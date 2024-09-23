import React, { useEffect, useState } from 'react';
import { getStoreById } from '../../../../api/apiStore';

const StoreService = ({storeId}) => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [openSection, setOpenSection] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [bikeDetail, setBikeDetail] = useState('');
    // const [storeId, setStoreId] = useState(storeId);
    useEffect(() => {
        // const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
        // setStoreId(storedBooking?.storeId || '')
        const fetchStoreDetails = async () => {
            if (storeId) {
                try {
                    const response = await getStoreById(storeId);
                    if (response.data) {
                        const storeData = response?.data?.store_services;
                        setServices(storeData);
                        // console.log(services);

                        // Sync the selected services with the newly fetched services
                        const storedBooking = JSON.parse(localStorage.getItem('booking')) || {};
                        if (storedBooking.services) {
                            setSelectedServices(storedBooking.services);
                        }
                    } else {
                        console.error('Failed to fetch store details.');
                    }
                } catch (error) {
                    console.error('Failed to fetch store details.', error);
                }
                setLoading(false);
            }
        };
        fetchStoreDetails();
    }, [storeId]);

    useEffect(() => {
        handleStoreData();
    }, [selectedServices, bikeDetail]); // Trigger handleStoreData on changes to selectedServices or bikeDetail

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handleCheckboxChange = (serviceId, typeId) => {
        setSelectedServices((prevSelectedServices) => {
            const serviceIndex = prevSelectedServices.findIndex(service => service.id === serviceId);
            if (serviceIndex >= 0) {
                const updatedTypes = prevSelectedServices[serviceIndex].types.includes(typeId)
                    ? prevSelectedServices[serviceIndex].types.filter(type => type !== typeId)
                    : [...prevSelectedServices[serviceIndex].types, typeId];
                
                return prevSelectedServices.map((service, index) =>
                    index === serviceIndex
                        ? { ...service, types: updatedTypes }
                        : service
                );
            } else {
                return [...prevSelectedServices, { id: serviceId, types: [typeId] }];
            }
        });
    };

    const handleStoreData = () => {
        const bookingData = JSON.parse(localStorage.getItem('booking')) || {};

        // Extract selected type IDs and service IDs
        const typeIds = selectedServices.flatMap(service => service.types);
        const serviceIds = selectedServices.map(service => service.id);

        bookingData.services = selectedServices;
        bookingData.bikeDetail = bikeDetail;
        bookingData.types = typeIds; // Add all selected type IDs
        bookingData.servicesIds = serviceIds; // Add all selected service IDs

        localStorage.setItem('booking', JSON.stringify(bookingData));
    };

    const handleTextareaChange = (e) => {
        setBikeDetail(e.target.value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='store_wrapper_outer'>
            <div className='service_inner'>
                {services.map((service, index) => (
                    
                    <div className='service_select_wrapper' key={service.service_id}>
                        <div
                            className='servicetoggle_head'
                            onClick={() => toggleSection(`major-${index}`)}
                        >
                            <p>{service?.service?.name}</p>
                            <span
                                className={`toggle_icon ${
                                    openSection === `major-${index}` ? 'open' : ''
                                }`}
                            >
                                <i className='fa-solid fa-chevron-down'></i>
                            </span>
                        </div>
                        <div
                            className={`service_select_content ${
                                openSection === `major-${index}` ? 'open' : 'closed'
                            }`}
                        >
                            <div className='service_content_wrapp'>
                                <div className='service_radio_row'>
                                    {service.service_type.map((type) => (
                                        <div className='service_radio_col' key={type.service_type_id}>
                                            <label className='checkcontainer'>
                                                <input
                                                    type='checkbox'
                                                    id={`MajorService-${index}-${type.service_type_id}`}
                                                    name={`MajorService-${index}`}
                                                    value={type.service_type_id}
                                                    checked={
                                                        selectedServices.some(
                                                            (selectedService) =>
                                                                selectedService.id === service.service_id &&
                                                                selectedService.types.includes(type.service_type_id)
                                                        )
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxChange(service.service_id, type.service_type_id)
                                                    }
                                                />
                                                <span className='radiobtn'></span>
                                                <div className='radio_info'>
                                                    <p>{type?.service_type_data?.name}</p>
                                                    <p className='service_price'>
                                                        ${type?.service_type_data?.club_price}
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='service_select_wrapper'>
                    <div className='service_content_wrapp'>
                        <div className='secondry_service_wrap'>
                            <p>
                                Please give us any details which will help us to understand any
                                issues on your bike
                            </p>
                            <textarea
                                className='form_control'
                                placeholder='For example, my back brake is squeaking...'
                                value={bikeDetail}
                                onChange={handleTextareaChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreService;
