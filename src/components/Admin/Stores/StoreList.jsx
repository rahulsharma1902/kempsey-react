import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { Stores } from '../../../api/apiStore';
import DataTable from 'react-data-table-component';
import { IconButton, Menu, MenuItem, Button, Grid, Box, Typography, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../Animation/FormSkeleton';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState([]);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedStoreId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedStoreId(null);
  };

  const handleRemoveStore = async () => {
    if (window.confirm('Are you sure you want to remove this store?')) {
      try {
        // Remove store logic here
        setStores((prevStores) => prevStores.filter((store) => store.id !== selectedStoreId));
      } catch (error) {
        console.error('Failed to remove store:', error.message);
      }
    }
    handleClose();
  };

  useEffect(() => {
    const getStores = async () => {
      try {
        const response = await Stores();
        console.log('API Response:', response);

        if (response.success && Array.isArray(response.data)) {
          setStores(response.data);
          setFilteredStores(response.data); // Initialize filtered stores
        } else {
          setStores([]);
          setFilteredStores([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch stores:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  }, [searchTerm, stores]);

  const columns = [
    {
      name: 'Store Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: 'Latitude',
      selector: (row) => row.latitude,
      sortable: true,
    },
    {
      name: 'Longitude',
      selector: (row) => row.longitude,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: 'Country',
      selector: (row) => row.country,
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
            open={Boolean(anchorEl) && selectedStoreId === row.id}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={`edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleRemoveStore}>
              Remove
            </MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  const expandedRowComponent = ({ store_services = [] }) => {

    if (!Array.isArray(store_services) || store_services.length === 0) {
      return <Typography>No services available</Typography>;
    }

    return (
      <Box sx={{ padding: 2 }}>
        {store_services.map((service) => {

          return (
            <Box key={service.id} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">{service.service?.name || 'No service name'}</Typography>
              {service.service_type && Array.isArray(service.service_type) ? (
                service.service_type.map((type) => (
                  <Box key={type.id} sx={{ marginBottom: 1 }}>
                    <Typography variant="body2">
                      {type.service_type_data?.name || 'No type name'} - {type.service_type_data?.full_price || 'No price'}
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

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Stores</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
              <Grid item>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="add">
                  Add Store
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
            data={filteredStores}
            progressPending={loading}
            progressComponent={<FormSkeleton />}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            expandableRows
            // expandableRowsComponent={expandedRowComponent}
            expandableRowsComponent={(row) => expandedRowComponent(row.data)}

            // Add custom sorting if needed
            sortServer
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default StoreList;
