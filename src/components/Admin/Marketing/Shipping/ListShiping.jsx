import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../AdminLayout';
import { ShippingMethods, removeShippingMethod } from '../../../../api/apiShippingMethods';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import {
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../../Animation/FormSkeleton';

const CouponList = () => {
  const [shippingMethodData, setShippingMethodsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedShippingMethodId, setSelectedCouponId] = useState(null);

  useEffect(() => {
    const getShippingMethodData = async () => {
      try {
        const response = await ShippingMethods();
        if (Array.isArray(response.data)) {
          setShippingMethodsData(response.data);
        } else {
          setShippingMethodsData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch ShippingMethods:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getShippingMethodData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredShippingMethods = shippingMethodData.filter((shippingMethod) =>
    shippingMethod.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedCouponId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCouponId(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this shippingMethod?')) {
      try {
        await removeShippingMethod(selectedShippingMethodId);
        toast.success('Coupon removed successfully');
        setShippingMethodsData((prevShippingMethods) =>
          prevShippingMethods.filter((shippingMethod) => shippingMethod.id !== selectedShippingMethodId)
        );
      } catch (error) {
        toast.error('Failed to remove shippingMethod');
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
      name: 'Shipping Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Details',
      selector: (row) => row.details,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: 'Free Shipping',
      selector: (row) => (
        <Chip
          label={row.is_free_shipping_enabled ? 'Enabled' : 'Disabled'}
          color={row.is_free_shipping_enabled ? 'success' : 'default'}
          size="small"
        />
      ),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <Chip
          label={row.is_active ? 'Active' : 'Inactive'}
          color={row.is_active ? 'success' : 'default'}
          size="small"
        />
      ),
      sortable: true,
    },
    {
      name: 'Free Shipping Over',
      selector: (row) => `$${row?.free_shipping_over ?? '-'}`,
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
            open={Boolean(anchorEl) && selectedShippingMethodId === row.id}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={`edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleRemove}>Remove</MenuItem>
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
            <Typography variant="h5">Shipping Methods</Typography>
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
                  Add Shipping
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
            data={filteredShippingMethods}
            progressPending={loading}
            progressComponent={<FormSkeleton />}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CouponList;
