import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { Services, removeService } from '../../../api/apiService';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../Animation/FormSkeleton';
import ExpandedRowComponent from './Types/ServiceTypeList';

const ServicesList = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    const getServicesData = async () => {
      try {
        const response = await Services();
        if (Array.isArray(response.data)) {
          setServicesData(response.data);
        } else {
          setServicesData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Services:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getServicesData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredServices = servicesData.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedServiceId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedServiceId(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this service?')) {
      try {
        await removeService(selectedServiceId);
        toast.success('Service removed successfully');
        setServicesData((prevServices) => prevServices.filter((service) => service.id !== selectedServiceId));
      } catch (error) {
        toast.error('Failed to remove service');
      }
    }
    handleClose();
  };

  const columns = [
    {
      name: 'Sno.',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <IconButton onClick={(event) => handleClick(event, row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedServiceId === row.id}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={`edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleRemove}>
              Remove
            </MenuItem>
            <MenuItem component={Link} to={`/admin-dashboard/service-types/add`} onClick={handleClose}>
              Add Service Type
            </MenuItem>
            <MenuItem component={Link} to={`/admin-dashboard/service-options/add`} onClick={handleClose}>
              Add Service Options
            </MenuItem>
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
            <Typography variant="h5">Services</Typography>
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
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="add">
                  Add Service
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <div className="card-inner">
        <div className="card card-bordered card-preview">
          <DataTable
            columns={columns}
            data={filteredServices}
            progressPending={loading}
            progressComponent={<FormSkeleton />}
            pagination
            highlightOnHover
            expandableRows
            expandableRowsComponent={ExpandedRowComponent}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServicesList;
