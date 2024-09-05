import React, { useState, useEffect } from 'react';
import { useServiceContent } from '../../../../contexts/WorkshopContext';

// Function to calculate distance
const toRadians = (degree) => degree * (Math.PI / 180);

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const WorkshopStore = ({ handleNext }) => {
  const { storeContent, loading } = useServiceContent();
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    if (storeContent && storeContent.data) {
      const filteredStores = storeContent.data.map(store => {
        const distance = calculateDistance(
          userLocation.latitude || 0,
          userLocation.longitude || 0,
          store.latitude,
          store.longitude
        );
        return { ...store, distance };
      }).sort((a, b) => a.distance - b.distance);

      setStores(filteredStores);
    }
  }, [storeContent, userLocation]);

  const handleStoreClick = (storeId) => {
    // Clear existing booking data
    localStorage.setItem('booking', JSON.stringify({
      storeId,
      services: [],
      bikeDetail: ''
    }));

    handleNext(storeId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='store_wrapper_outer'>
      <div className='Module_head text-center'>
        <h2 className='size46'>Stores Near You</h2>
      </div>
      <div className='store_row'>
        {stores.map(store => (
          <div className='store_col' key={store.id}>
            <div className='store_box' onClick={() => handleStoreClick(store.id)}>
              <div className='store_thumb'>
                <img src={store.image} alt={store.name} />
              </div>
              <div className='store_card_inner'>
                <span className='dis_tag'>{store.distance.toFixed(1)} km</span>
                <h3 className='store_title'>{store.name}</h3>
                <p className='store_info' dangerouslySetInnerHTML={{ __html: store?.details ?? '' }}  />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopStore;
