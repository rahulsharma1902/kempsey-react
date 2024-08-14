import React, { useState, useEffect } from 'react';
import AdminLayout from '../../AdminLayout';
import { parentCategories, childCategories, removeCategory } from '../../../../api/apiCategories';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filterType, setFilterType] = useState('all'); // State for filter type

  // State for managing menu anchor and selected category
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const parentResponse = await parentCategories();
        const childResponse = await childCategories();
        
        const parentData = Array.isArray(parentResponse.data) ? parentResponse.data : [];
        const childData = Array.isArray(childResponse.data) ? childResponse.data : [];
        
        setCategories([...parentData, ...childData]);
        setFilteredCategories([...parentData, ...childData]);
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category => {
      if (filterType === 'all') return true;
      if (filterType === 'parent') return !category.parent;
      if (filterType === 'child') return category.parent;
      return true;
    }).filter(category =>
      category.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCategories(filtered);
  }, [searchTerm, filterType, categories]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCategoryId(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this category?')) {
      try {
        await removeCategory(selectedCategoryId);
        setCategories(prevCategories => prevCategories.filter(category => category.id !== selectedCategoryId));
        setFilteredCategories(prevCategories => prevCategories.filter(category => category.id !== selectedCategoryId));
      } catch (error) {
        console.error('Failed to remove category:', error.message);
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
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Parent Category',
      selector: row => row.parent ? row.parent.name : 'N/A',
      sortable: true,
    },
    {
      name: 'Visibility',
      selector: row => row.visibility,
      cell: row => (
        <span className={`badge ${row.visibility === 'enabled' ? 'bg-success' : 'bg-warning'}`}>
          {row.visibility}
        </span>
      ),
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
            open={Boolean(anchorEl) && selectedCategoryId === row.id}
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
    }
  ];

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Category</Typography>
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
                    value={filterType}
                    onChange={handleFilterChange}
                    label="Category"
                  >
                    <MuiMenuItem value={'all'}>
                      All Categories
                    </MuiMenuItem>
                    <MuiMenuItem value={'parent'}>
                        Parent Categories
                    </MuiMenuItem>
                    <MuiMenuItem value={'child'}>
                      Child Categories
                    </MuiMenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="add">
                  Add Category
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
              data={filteredCategories}
              progressPending={loading}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30]}
              paginationComponentOptions={{ rowsPerPageText: 'Rows per page:' }}
            />
          </div>
        </div>
    </AdminLayout>
  );
};

export default CategoriesList;
