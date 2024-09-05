import React, { useState, useEffect } from 'react';
import { useServiceContent } from '../../../contexts/WorkshopContext';
import CheckImage from '../../../images/check.png';

const Servicing = () => {
  const { serviceContent, loading } = useServiceContent();
  const [serviceContentData, setServiceContentData] = useState([]);

  useEffect(() => {
    if (serviceContent && Array.isArray(serviceContent.data)) {
      console.log('Service Content:', serviceContent);
      setServiceContentData(serviceContent.data);
    } else {
      console.log('No valid service content data found.');
    }
  }, [serviceContent]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="servicing_table">
      {serviceContentData.length > 0 ? (
        serviceContentData.map((data, index) => {
          const serviceTypes = data.service_types || [];
          const serviceOptions = data.service_options || [];
          const numTypesToDisplay = 4; // Adjust as needed
          const displayedServiceTypes = serviceTypes.slice(0, numTypesToDisplay);

          return (
            <table key={index} style={{ marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th style={{ width: "35%" }}>
                    <h3>{data.name}</h3>
                    <p>Buy Club Membership</p>
                  </th>
                  {displayedServiceTypes.map(type => (
                    <th key={type?.id} className="list-table">
                      <h4>{type?.name}</h4>
                      <p>Full Price <b>${type?.price}</b></p>
                      <span>Club Price <b>${type?.club_price}</b></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceOptions.map(option => (
                  <tr key={option?.id}>
                    <th>{option?.name}</th>
                    {displayedServiceTypes.map(type => (
                      <td key={type.id}>
                        {type.serviceOptions && type.serviceOptions.some(o => o.id === option.id)
                          ? <img src={CheckImage} alt="Check" style={{ width: '20px' }} /> 
                          : null
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })
      ) : (
        <p>No service content available.</p>
      )}
    </div>
  );
};

export default Servicing;
