import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../AdminLayout';
import { Coupons, removeCoupon } from '../../../../api/apiCoupons';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../../Animation/FormSkeleton';
const CouponList = () => {
  const [couponsData, setCouponsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  useEffect(() => {
    const getCouponsData = async () => {
      try {
        const response = await Coupons();
        if (Array.isArray(response.data)) {
          setCouponsData(response.data);
        } else {
          setCouponsData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Coupons:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getCouponsData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoupons = couponsData.filter((coupon) =>
  coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (window.confirm('Are you sure you want to remove this coupon?')) {
      try {
        await removeCoupon(selectedCouponId);
        toast.success('Coupon removed successfully');
        setCouponsData((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== selectedCouponId));
      } catch (error) {
        toast.error('Failed to remove coupon');
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
      name: 'Coupon Code',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: 'Descount Type',
      selector: (row) => row.discount_type,
      sortable: true,
    },
    {
        name: 'Descount Value',
        selector: (row) => row.discount_value,
        sortable: true,
      },
      {
        name: 'Start Date',
        selector: (row) => row.start_date,
        sortable: true,
      },
      {
        name: 'End Date',
        selector: (row) => row.end_date,
        sortable: true,
      },
      {
        name: 'Min Order',
        selector: (row) => row.minimum_order,
        sortable: true,
      },
      {
        name: 'Maximum Discount',
        selector: (row) => row.maximum_discount,
        sortable: true,
      },
      {
        name: 'Limit',
        selector: (row) => row.usage_limit,
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
            open={Boolean(anchorEl) && selectedCouponId === row.id}
            onClose={handleClose}
          >
            {/* <MenuItem component={Link} to={`edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem> */}
            <MenuItem onClick={handleRemove}>
              Remove
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
            <Typography variant="h5">Coupons</Typography>
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
                  Add Coupon
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
              data={filteredCoupons}
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
