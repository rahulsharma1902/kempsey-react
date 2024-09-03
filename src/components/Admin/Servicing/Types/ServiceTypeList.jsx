import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import DataTable from 'react-data-table-component';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { removeServiceType } from '../../../../api/apiService';
import { toast } from 'react-toastify';
import ExpandedTypeComponent from './../Options/ServiceOptionList';

const ServiceTypesTable = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [servicesData, setServicesData] = useState(data || []);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredServiceTypes = servicesData.filter((serviceType) =>
    serviceType.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (window.confirm('Are you sure you want to remove this service type?')) {
      try {
        await removeServiceType(selectedServiceId);
        toast.success('Service Type removed successfully');
        setServicesData((prevServices) => prevServices.filter((service) => service.id !== selectedServiceId));
      } catch (error) {
        toast.error('Failed to remove service type');
      }
    }
    handleClose();
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Club Price',
      selector: row => row.club_price,
      sortable: true,
    },
    {
      name: 'Full Price',
      selector: row => row.full_price,
      sortable: true,
    },
    {
      name: 'Actions',
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
            <MenuItem component={Link} to={`/admin-dashboard/service-types/edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleRemove}>
              Remove
            </MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6">Service Types:</Typography>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px' }}
      />
      {filteredServiceTypes.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredServiceTypes}
          pagination
          highlightOnHover
          expandableRows
          expandableRowsComponent={ExpandedTypeComponent}
        />
      ) : (
        <Typography>No service types available.</Typography>
      )}
    </Box>
  );
};

const ExpandedRowComponent = ({ data }) => {
  return (
    <div style={{ padding: '10px 20px' }}>
      <ServiceTypesTable data={data.service_types} />
    </div>
  );
};

export default ExpandedRowComponent;
