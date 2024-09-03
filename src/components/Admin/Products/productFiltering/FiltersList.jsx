import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../AdminLayout';
import { Filters, removeFilter } from '../../../../api/apiFilters';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../../Animation/FormSkeleton';
const FiltersList = () => {
  const [filtersData, setFiltersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilterId, setSelectedFilterId] = useState(null);

  useEffect(() => {
    const getFiltersData = async () => {
      try {
        const response = await Filters();
        if (Array.isArray(response.data)) {
          setFiltersData(response.data);
        } else {
          setFiltersData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Filters:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getFiltersData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Custom filter function
  const filteredFilters = filtersData.filter((filter) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      filter.name.toLowerCase().includes(searchTermLower) ||
      filter.categorie.name.toLowerCase().includes(searchTermLower) ||
      filter.filter_options.some(option =>
        option.name.toLowerCase().includes(searchTermLower)
      )
    ) && (selectedCategory ? filter.categorie.name === selectedCategory : true);
  });

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedFilterId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFilterId(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this filter?')) {
      try {
        await removeFilter(selectedFilterId);
        toast.success('Filter removed successfully');
        setFiltersData((prevFilters) => prevFilters.filter((filter) => filter.id !== selectedFilterId));
      } catch (error) {
        toast.error('Failed to remove filter');
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
      name: 'Category',
      selector: (row) => row.categorie.name,
      sortable: true,
    },
    {
      name: 'Total Options',
      selector: (row) => row.filter_options.length,
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
            open={Boolean(anchorEl) && selectedFilterId === row.id}
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
            <Typography variant="h5">Filters</Typography>
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
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MuiMenuItem value="">All Categories</MuiMenuItem>
                    {Array.from(new Set(filtersData.map(filter => filter.categorie.name))).map((category) => (

                      <MuiMenuItem key={category} value={category}>
                                {category}
                      </MuiMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="add">
                  Add Filter
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
              data={filteredFilters}
              progressPending={loading}
              progressComponent={<FormSkeleton />}
              highlightOnHover
              pagination
            />
          </div>
        </div>
    </AdminLayout>
  );
};

export default FiltersList;
