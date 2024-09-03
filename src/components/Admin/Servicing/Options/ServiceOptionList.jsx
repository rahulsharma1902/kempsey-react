import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import DataTable from 'react-data-table-component';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { removeServiceOption } from '../../../../api/apiService'; // Ensure this path is correct
import { toast } from 'react-toastify';

const ServiceOptionsTable = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [servicesData, setServicesData] = useState(data.serviceOptions || []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedServiceId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedServiceId(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this service option?')) {
      try {
        await removeServiceOption(selectedServiceId);
        toast.success('Service Option removed successfully');
        setServicesData((prevServices) => prevServices.filter((service) => service.id !== selectedServiceId));
      } catch (error) {
        toast.error('Failed to remove service option');
      }
    }
    handleClose();
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
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
            <MenuItem component={Link} to={`/admin-dashboard/service-options/edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleRemove}>Remove</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6">Service Options:</Typography>
      {servicesData.length > 0 ? (
        <DataTable
          columns={columns}
          data={servicesData}
          pagination
          highlightOnHover
        />
      ) : (
        <Typography>No service options available.</Typography>
      )}
    </Box>
  );
};

export default ServiceOptionsTable;
