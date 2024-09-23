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
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdminLayout from '../AdminLayout';
import DataTable from 'react-data-table-component';
import { Bookings, completeBooking ,removeBooking } from '../../../api/apiBookings';
import FormSkeleton from '../../Animation/FormSkeleton';

const BrandsList = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // Status filter state
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

  const handleStatusFilterChange = (event) => setStatusFilter(event.target.value);

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedBrandId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBrandId(null);
  };

  const handleRemoveBooking = async () => {
    if (window.confirm('Are you sure you want to remove this booking ?')) {
      try {
        await removeBooking(selectedBrandId);
        // setBookingData(prevData => prevData.map(booking => 
        //   booking.id === selectedBrandId ? { ...booking, status: true } : booking
        // ));
        toast.success('Booking removed successfully');
        setBookingData((prevData) => prevData.filter((booking) => booking.id !== selectedBrandId));
      } catch (error) {
        toast.error('Failed to remove booking as done');
      }
    }
    handleCloseMenu();
  };

  const handleBookingDone = async () => {
    if (window.confirm('Are you sure you want to mark this booking as done?')) {
      try {
        await completeBooking(selectedBrandId);
        setBookingData(prevData => prevData.map(booking => 
          booking.id === selectedBrandId ? { ...booking, status: true } : booking
        ));
        toast.success('Booking marked as done successfully');
        // setBookingData((prevData) => prevData.filter((booking) => booking.id !== selectedBrandId));
      } catch (error) {
        toast.error('Failed to mark booking as done');
      }
    }
    handleCloseMenu();
  };

  // Filter the bookings based on searchTerm and statusFilter
  const filteredBookings = bookingData
    .filter((booking) => 
      booking.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || (statusFilter === 'done' && booking.status) || (statusFilter === 'pending' && !booking.status))
    );

  const ExpandableRowComponent = ({ data }) => {
    // Safely extract related_services_with_types from the data
    const relatedServices = data?.data?.related_services_with_types || [];
  
    // Ensure relatedServices is an array
    const servicesArray = Array.isArray(relatedServices) ? relatedServices : [];
  
    if (servicesArray.length === 0) {
      return <Typography>No services available</Typography>;
    }
  
    return (
      <Box sx={{ display: 'flex', padding: 2 }}>
        
        <Box sx={{ marginBottom: 2 }}>
          {/* Services list - displayed for each service */}
          {servicesArray.map((service) => {
            // Normalize service.types to an array
            const typesArray = Array.isArray(service.types) ? service.types : [service.types].filter(Boolean);
    
            return (
              <Box key={service.id} sx={{ marginLeft:3,marginRight:3, marginBottom: 2, alignItems: 'flex-start' }}>
                {/* Service Details */}
                <Box sx={{ flex: 1, marginRight: 2 }}>
                  <Typography variant="h6">{service.name || 'No service name'}</Typography>
                  {typesArray.length > 0 ? (
                    typesArray.map((type) => (
                      <Box key={`${service.id}-${type.id}`} sx={{ marginBottom: 1 }}>
                        <Typography variant="body2">
                          {type?.name || 'No type name'} - ${type?.club_price ?? 'No price'}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography>No service types available</Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* Bike details - displayed once */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1"><strong>Details</strong></Typography>
          <Box sx={{ marginBottom: 1 }}>
            <Typography variant="body2">
              {data?.data?.bike_brand && (
                <>
                  <strong>Bike Brand:</strong> {data?.data?.bike_brand}
                  <br />
                </>
              )}
              {data?.data?.bike_type && (
                <>
                  <strong>Bike Type:</strong> {data?.data?.bike_type}
                  <br />
                </>
              )}
              {data?.data?.bike_model && (
                <>
                  <strong>Bike Model:</strong> {data?.data?.bike_model}
                  <br />
                </>
              )}
              {data?.data?.bike_colour && (
                <>
                  <strong>Bike Colour:</strong> {data?.data?.bike_colour}
                  <br />
                </>
              )}
              {data?.data?.bike_detail && (
                <>
                  <strong>Details:</strong> {data?.data?.bike_detail}
                  <br />
                </>
              )}
            </Typography>
          </Box>
        </Box>
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
      name: 'Status',
      selector: (row) => row.status ? 'Done' : 'Pending',
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
            <MenuItem onClick={handleRemoveBooking}>Remove</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1, mb: 3,mt:3 }}>
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
              <Grid item >
                <FormControl variant="outlined" size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    label="Status"
                  >
                    <SelectMenuItem value="all">All</SelectMenuItem>
                    <SelectMenuItem value="done">Done</SelectMenuItem>
                    <SelectMenuItem value="pending">Pending</SelectMenuItem>
                  </Select>
                </FormControl>
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
