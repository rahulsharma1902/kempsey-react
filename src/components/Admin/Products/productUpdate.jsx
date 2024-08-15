import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { getProductById,addProduct } from '../../../api/apiProducts';
import { categories } from '../../../api/apiCategories';
import { Brands } from '../../../api/apiBrands';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Container,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from '@mui/material';

const ProductUpdate = () => {
    const { id } = useParams();
    const [ParentCategories, setParentCategories] = useState([]);
    const [BrandsData, setBrandsData] = useState([]);
    const [filters, setFilters] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slug: '',
        category_id: '',
        brand_id: '',
        selected_filters_options: '',
        description: '',
        details: '',
        price: '',
        stock: '',
        weight: '',
        images: [],
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await categories();
                if (Array.isArray(response.data)) {
                    setParentCategories(response.data);
                    console.log(ParentCategories);
                } else {
                    setParentCategories([]);
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
            }
        };
        getParentCategory();
    
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
            }
        };
        getBrandsData();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await getProductById(id);
                    if (response.data) {
                        console.log(response);
                      setFormData({
                        ...response.data,
                        // Assuming selected_filters_options is a JSON string
                        selected_filters_options: JSON.parse(response.data.selected_filters_options || '{}'),
                    });

                        setSelectedOptions(response.data.selected_filters_options);
                        selectedFilterChange(response.data.selected_filters_options,response.data.category_id);
                        console.warn(response.data.selected_filters_options );
                    } else {
                        toast.error('Failed to fetch Product details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch product details.');
                }
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);
    const selectedFilterChange = (filterData,categroyID) => {
        
        if (categroyID) {
            const selectedCategory = ParentCategories.find(cat => cat.id === parseInt(categroyID));
            if (selectedCategory) {
                let filtersToSet = [];
    
                // Check if the selected category has a parent category
                if (selectedCategory.parent_id) {
                    const parentCategory = ParentCategories.find(cat => cat.id === selectedCategory.parent_id);
                    filtersToSet = parentCategory ? parentCategory.filters : selectedCategory.filters;
                } else {
                    filtersToSet = selectedCategory.filters;
                }
                setFilters(filtersToSet || []); // Ensure it's an array
                setSelectedOptions((filtersToSet || []).reduce((acc, filter) => {
                    acc[filter.id] = ''; 
                    return acc;
                }, {}));
            } else {
                setFilters([]); // Ensure it's an array
                setSelectedOptions({});
            }
        } else {
            // Clear filters and selected options if no category is selected
            setFilters([]); // Ensure it's an array
            setSelectedOptions({});
        }

        // Parse the JSON string
        const jsonObject = JSON.parse(filterData);
        const jsonObject2 = JSON.parse(jsonObject);
        console.warn(jsonObject2);
        
        

    // Iterate through the entries and log the filterId and optionId
    Object.entries(jsonObject2).forEach(([key, value]) => {
        setOptionForFilter(key,value)
    });
    };
    const setOptionForFilter = (filterId, optionId) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [filterId]: optionId
        }));
    };
    
  
    

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '-') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-'); // Remove duplicate hyphens
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            ...(name === 'name' && { slug: generateSlug(value) })
        }));
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            category_id: categoryId,
        }));
    
        if (categoryId) {
            const selectedCategory = ParentCategories.find(cat => cat.id === parseInt(categoryId));
            if (selectedCategory) {
                let filtersToSet = [];
    
                // Check if the selected category has a parent category
                if (selectedCategory.parent_id) {
                    const parentCategory = ParentCategories.find(cat => cat.id === selectedCategory.parent_id);
                    filtersToSet = parentCategory ? parentCategory.filters : selectedCategory.filters;
                } else {
                    filtersToSet = selectedCategory.filters;
                }
    
                setFilters(filtersToSet || []); // Ensure it's an array
                setSelectedOptions((filtersToSet || []).reduce((acc, filter) => {
                    acc[filter.id] = ''; // Initialize selected options for each filter
                    return acc;
                }, {}));
            } else {
                setFilters([]); // Ensure it's an array
                setSelectedOptions({});
            }
        } else {
            // Clear filters and selected options if no category is selected
            setFilters([]); // Ensure it's an array
            setSelectedOptions({});
        }
    };
    
    

    const handleFilterChange = (filterId, value) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [filterId]: value
        }));
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    const handleDetailChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, details: data });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevFormData => ({
            ...prevFormData,
            images: files
        }));

        // Generate image previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleThumbnailChange = (index) => {
        setSelectedThumbnailIndex(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'product name is required';
        }
        if (!formData.price.trim()) {
            errors.price = 'product price is required';
        }
        if (!formData.stock.trim()) {
            errors.stock = 'product stock is required';
        }
        if (!formData.weight.trim()) {
            errors.weight = 'product weight is required';
        }
        if (!formData.category_id) {
            errors.category_id = 'product category is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('category_id', formData.category_id);
        form.append('brand_id', formData.brand_id);
        form.append('selected_filters_options', JSON.stringify(selectedOptions)); // Convert selected options to JSON string
        form.append('description', formData.description);
        form.append('details', formData.details);
        form.append('price', formData.price);
        form.append('stock', formData.stock);
        form.append('weight', formData.weight);

        // Append all selected images to the FormData object
        if (formData.images) {
            Array.from(formData.images).forEach((file, index) => {
                form.append(`images[${index}]`, file);
            });
        }

        if (selectedThumbnailIndex !== null) {
            form.append('thumbnail_index', selectedThumbnailIndex);
        }

        try {
            const response = await addProduct(form);
            toast.success(response.message);
            console.log(response);
            // Clear form data after successful submission
            // setFormData({
            //     name: '',
            //     slug: '',
            //     category_id: '',
            //     brand_id: '',
            //     selected_filters_options: '',
            //     description: '',
            //     details: '',
            //     price: '',
            //     stock: '',
            //     weight: '',
            //     images: [] // Clear images as well
            // });
            setImagePreviews([]);
            setSelectedThumbnailIndex(null);
            setFilters([]);
            setSelectedOptions({});
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding product');
        }
    };

    return (
        <AdminLayout>
            <Container>
                <Card>
                    <CardHeader title="Product Details Update" />
                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={!!validationErrors.name}
                                        helperText={validationErrors.name}
                                    />
                                </Grid>
                                    <input
                                        type="hidden"
                                        name="slug"
                                        onChange={handleChange}
                                        value={formData.slug}
                                    />
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        error={!!validationErrors.price}
                                        helperText={validationErrors.price}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Stock"
                                        name="stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        error={!!validationErrors.stock}
                                        helperText={validationErrors.stock}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Weight (LBS)"
                                        name="weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        error={!!validationErrors.weight}
                                        helperText={validationErrors.weight}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Brand</InputLabel>
                                        <Select
                                            name="brand_id"
                                            value={formData.brand_id}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="" disabled>--Select Brand--</MenuItem>
                                            {BrandsData.map(brand => (
                                                <MenuItem key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleCategoryChange}
                                            error={!!validationErrors.category_id}
                                            helperText={validationErrors.category_id}
                                        >
                                            <MenuItem value="" disabled>--Select Category--</MenuItem>
                                            {ParentCategories.map(category => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Filters</Typography> {/* Label for Filters */}
                                    {filters.length > 0 ? (
                                        filters.map(filter => (
                                            <FormControl fullWidth key={filter.id} margin="normal">
                                                <InputLabel>{filter.name}</InputLabel>
                                                <Select
                                                    value={selectedOptions[filter.id] || ''}
                                                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                                >
                                                    <MenuItem value="">--Select Option--</MenuItem>
                                                    {filter.filter_options && filter.filter_options.length > 0 ? (
                                                        filter.filter_options.map(option => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.name}
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <MenuItem disabled>No filter options available</MenuItem> // Message when no options are available
                                                    )}
                                                </Select>
                                            </FormControl>
                                        ))
                                    ) : (
                                        <Typography>No filters available for this category</Typography> // Message when no filters are available
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                <Typography variant="h6">Product Description</Typography>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.description}
                                        onChange={handleDescriptionChange}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Typography variant="h6">Product Description</Typography>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.description}
                                        onChange={handleDescriptionChange}
                                    />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Typography variant="h6">Product Details</Typography>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.details}
                                        onChange={handleDetailChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        id="product-images"
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="product-images">
                                        <Button variant="outlined"  component="span">
                                            Upload Images
                                        </Button>
                                    </label>
                                    <div>
                                        {imagePreviews.length > 0 && (
                                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                                {imagePreviews.map((preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview}
                                                        alt={`Preview ${index}`}
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            margin: '0 5px',
                                                            border: index === selectedThumbnailIndex ? '2px solid blue' : '2px solid transparent'
                                                        }}
                                                        onClick={() => handleThumbnailChange(index)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" fullWidth>
                                        Save Product
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default ProductUpdate;
