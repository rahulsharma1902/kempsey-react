import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { parentCategories, removeCategory } from '../../../api/apiCategories';
import { products,removeProduct } from '../../../api/apiProducts';
import { Brands } from '../../../api/apiBrands';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../Animation/FormSkeleton';
const ProductsList = () => {
  const [Products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleRemoveProduct = async () => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        await removeProduct(selectedProductId);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== selectedProductId));
      } catch (error) {
        console.error('Failed to remove product:', error.message);
      }
    }
    handleClose();
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await products();
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    const getCategories = async () => {
      try {
        const response = await parentCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      }
    };

    const getBrands = async () => {
      try {
        const response = await Brands();
        setBrands(response.data);
      } catch (error) {
        console.error('Failed to fetch brands:', error.message);
      }
    };

    getProducts();
    getCategories();
    getBrands();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const filteredProducts = Products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.categorie.name === selectedCategory : true) &&
      (selectedBrand ? product.brand.name === selectedBrand : true)
    );
  });

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
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.categorie.name,
      sortable: true,
    },
    {
      name: 'Brand',
      selector: (row) => row.brand.name,
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
            open={Boolean(anchorEl) && selectedProductId === row.id}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={`edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleRemoveProduct}>
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
            <Typography variant="h5">Products</Typography>
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
                    {Categories.map((category) => (
                      <MuiMenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MuiMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    label="Brand"
                  >
                    <MuiMenuItem value="">All Brands</MuiMenuItem>
                    {brands.map((brand) => (
                      <MuiMenuItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </MuiMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="add">
                  Add Product
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
            data={filteredProducts}
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

export default ProductsList;
