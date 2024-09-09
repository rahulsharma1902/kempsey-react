import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdminLayout from '../AdminLayout';
import DataTable from 'react-data-table-component';
import { Bookings, completeBooking } from '../../../api/apiBookings';
import FormSkeleton from '../../Animation/FormSkeleton';

const BrandsList = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    const getBookingData = async () => {
      try {
        const response = await Bookings();
        console.log(response);
        if (Array.isArray(response.data)) {
          setBookingData(response.data);
        } else {
          setBookingData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Bookings:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getBookingData();
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedBrandId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBrandId(null);
  };

  const handleBookingDone = async () => {
    if (window.confirm('Are you sure you want to mark this booking as done?')) {
      try {
        await completeBooking(selectedBrandId);
        toast.success('Booking marked as done successfully');
        setBookingData((prevData) => prevData.filter((booking) => booking.id !== selectedBrandId));
      } catch (error) {
        toast.error('Failed to mark booking as done');
      }
    }
    handleCloseMenu();
  };

  const filteredBookings = bookingData.filter((booking) =>
    booking.booking_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ExpandableRowComponent = ({ data }) => {
    // Safely extract related_services_with_types from the data
    {console.log(data)}
    const relatedServices = data?.data?.related_services_with_types || [];
    
    // Ensure relatedServices is an array
    const servicesArray = Array.isArray(relatedServices) ? relatedServices : [];
  
    if (servicesArray.length === 0) {
      return <Typography>No services available</Typography>;
    }
  
    return (
      <Box sx={{ padding: 2 }}>
        {servicesArray.map((service) => {
          // Normalize service.types to an array
          const typesArray = Array.isArray(service.types) ? service.types : [service.types].filter(Boolean);
  
          return (
            <Box key={service.id} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">{service.name || 'No service name'}</Typography>
              {typesArray.length > 0 ? (
                typesArray.map((type) => (
                  <Box key={type.id} sx={{ marginBottom: 1 }}>
                    <Typography variant="body2">
                      {type?.name || 'No type name'} - ${type?.club_price || 'No price'}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No service types available</Typography>
              )}
            </Box>
          );
        })}
      </Box>
    );
  };
  
  

  const columns = [
    {
      name: 'Booking Number',
      selector: (row) => row?.booking_number,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => `${row.user_fname} ${row.user_lname}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row?.user_email,
      sortable: true,
    },
    {
      name: 'Brand',
      selector: (row) => row.bike_brand,
      sortable: true,
    },
    {
      name: 'Model',
      selector: (row) => row.bike_model,
      sortable: true,
    },
    {
      name: 'Service Date',
      selector: (row) => row.service_date,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <IconButton onClick={(event) => handleMenuClick(event, row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedBrandId === row.id}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleBookingDone}>Booking Done</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Service Bookings</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <div className="card-inner">
        <div className="card card-bordered card-preview">
          <DataTable
            columns={columns}
            data={filteredBookings}
            progressPending={loading}
            progressComponent={<FormSkeleton />}
            pagination
            highlightOnHover
            expandableRows
            expandableRowsComponent={(row) => <ExpandableRowComponent data={row} />}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default BrandsList;
