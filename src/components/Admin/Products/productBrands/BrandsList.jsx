import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../AdminLayout';
import { Brands, removeBrand } from '../../../../api/apiBrands';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BrandsList = () => {
  const [brandsData, setBrandsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    const getBrandsData = async () => {
      try {
        const response = await Brands();
        if (Array.isArray(response.data)) {
          setBrandsData(response.data);
        } else {
          setBrandsData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Brands:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getBrandsData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = brandsData.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedBrandId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedBrandId(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this brand?')) {
      try {
        await removeBrand(selectedBrandId);
        toast.success('Brand removed successfully');
        setBrandsData((prevBrands) => prevBrands.filter((brand) => brand.id !== selectedBrandId));
      } catch (error) {
        toast.error('Failed to remove brand');
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
      name: 'Slug',
      selector: (row) => row.slug,
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
            open={Boolean(anchorEl) && selectedBrandId === row.id}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={`edit/${row.id}`} onClick={handleClose}>
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
    <AdminLayout>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Brands</Typography>
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
                  Add Brand
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
              data={filteredBrands}
              progressPending={loading}
              pagination
              highlightOnHover
            />
          </div>
        </div>
    </AdminLayout>
  );
};

export default BrandsList;
