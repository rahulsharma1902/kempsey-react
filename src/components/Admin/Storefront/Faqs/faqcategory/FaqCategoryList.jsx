import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../AdminLayout';
import { Faqcategories ,removeFaqCategory} from '../../../../../api/apiStorefront';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../../../Animation/FormSkeleton';
const FaqCategoriesList = () => {
  const [faqcategoriesData, setfaqcategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFaqCategoryId, setSelectedFaqCategoryId] = useState(null);

  useEffect(() => {
    const getFaqCategoriesData = async () => {
      try {
        const response = await Faqcategories();
        if (Array.isArray(response.data)) {
            setfaqcategoriesData(response.data);
        } else {
            setfaqcategoriesData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Brands:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getFaqCategoriesData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = faqcategoriesData.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedFaqCategoryId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFaqCategoryId(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this Category?')) {
      try {
        await removeFaqCategory(selectedFaqCategoryId);
        toast.success('Category removed successfully');
        setfaqcategoriesData((prevFaqCategories) => prevFaqCategories.filter((category) => category.id !== selectedFaqCategoryId));
      } catch (error) {
        toast.error('Failed to remove Category');
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
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: 'Slug',
      selector: (row) => row.category_slug,
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
            open={Boolean(anchorEl) && selectedFaqCategoryId === row.id}
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
            <Typography variant="h5">Faq Categories</Typography>
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
                  Add Faq Category
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
              progressComponent={<FormSkeleton />}
              pagination
              highlightOnHover
            />
          </div>
        </div>
    </AdminLayout>
  );
};

export default FaqCategoriesList;
