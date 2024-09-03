import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { getProductById,updateProduct } from '../../../api/apiProducts';
import { categories } from '../../../api/apiCategories';
import { Brands } from '../../../api/apiBrands';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import FormSkeleton from '../../Animation/FormSkeleton';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    IconButton,
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
    Box,
    
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

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
        existingImages:[],
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]);
    const [existingImagePreviews, setExistingImagePreviews] = useState([]);
    const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, brandsResponse] = await Promise.all([categories(), Brands()]);
    
                if (Array.isArray(categoriesResponse.data)) {
                    setParentCategories(categoriesResponse.data);
                } else {
                    setParentCategories([]);
                    console.error('Unexpected response format:', categoriesResponse.data);
                }
    
                if (Array.isArray(brandsResponse.data)) {
                    setBrandsData(brandsResponse.data);
                } else {
                    setBrandsData([]);
                    console.error('Unexpected response format:', brandsResponse.data);
                }
    
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await getProductById(id);
                    if (response.data) {
                        setFormData({
                            ...response.data,
                            selected_filters_options: JSON.parse(response.data.selected_filters_options || '{}'),
                            images: [],
                        });
                        setExistingImagePreviews(JSON.parse(response.data.images));
                        handleThumbnailChange('existing', response.data.thumbnail_index);
                       
                        const parsedFilters = JSON.parse(response.data.selected_filters_options);
                        setSelectedOptions(parsedFilters);
                        selectedFilterChange(parsedFilters, response.data.category_id);
                    } else {
                        toast.error('Failed to fetch Product details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch product details.');
                }
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [id, ParentCategories]);
    
    const selectedFilterChange = (filterData, categoryID) => {
        if (categoryID && ParentCategories.length > 0) {
            const selectedCategory = ParentCategories.find(cat => cat.id === parseInt(categoryID));
            if (selectedCategory) {
                let filtersToSet = [];
    
                if (selectedCategory.parent_id) {
                    const parentCategory = ParentCategories.find(cat => cat.id === selectedCategory.parent_id);
                    filtersToSet = parentCategory ? parentCategory.filters : selectedCategory.filters;
                } else {
                    filtersToSet = selectedCategory.filters;
                }
    
                setFilters(filtersToSet || []);
                setSelectedOptions((filtersToSet || []).reduce((acc, filter) => {
                    acc[filter.id] = '';
                    return acc;
                }, {}));
            } else {
                setFilters([]);
                setSelectedOptions({});
            }
        } else {
            setFilters([]);
            setSelectedOptions({});
        }
    
        const jsonObject = JSON.parse(filterData);
        Object.entries(jsonObject).forEach(([key, value]) => {
            setOptionForFilter(key, value);
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
            images: [...prevFormData.images, ...files]
        }));

        // Generate image previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
    };

    const handleThumbnailChange = (type, index) => {
        setSelectedThumbnailIndex({ type, index });
    };

    const handleImageRemove = (index) => {
        setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
        setFormData(prevFormData => ({
            ...prevFormData,
            images: prevFormData.images.filter((_, i) => i !== index)
        }));
    };
    const handleExistingImageRemove = (index) => {
        existingImagePreviews.splice(index, 1);
        setExistingImagePreviews([...existingImagePreviews]);
        console.log(existingImagePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'product name is required';
        }
        if (!formData.price.trim()) {
            errors.price = 'product price is required';
        }
        if (!formData.stock) {
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
        form.append('id', id);
        form.append('slug', formData.slug);
        form.append('category_id', formData.category_id);
        form.append('brand_id', formData.brand_id);
        form.append('selected_filters_options', JSON.stringify(selectedOptions)); // Convert selected options to JSON string
        form.append('description', formData.description);
        form.append('details', formData.details);
        form.append('price', formData.price);
        form.append('stock', formData.stock);
        form.append('weight', formData.weight);
        form.append('existingImages', JSON.stringify(existingImagePreviews));

        // Append all selected images to the FormData object
        if (formData.images) {
            console.warn(formData.images);
            Array.from(formData.images).forEach((file, index) => {
                form.append(`images[${index}]`, file);
            });
        }
      
        if (selectedThumbnailIndex !== null) {
            form.append('thumbnail_index', JSON.stringify(selectedThumbnailIndex));
        }

        try {
            const response = await updateProduct(form);
            toast.success(response.message);
            console.log(response.data);
           
            setImagePreviews([]);
            setExistingImagePreviews([])
            setSelectedThumbnailIndex(null);
            setExistingImagePreviews(JSON.parse(response.product.images));
            handleThumbnailChange('existing', response.product.thumbnail_index);
            // setFilters([]);
            // setSelectedOptions({});
            setValidationErrors({});
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast.error(err.message || 'Error adding product');
        }
    };

    return (
        <AdminLayout>
  
   


            <Container>
                {loading ? (
                        <FormSkeleton />
                ) : (
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
                                    <Typography variant="h6">Filters</Typography>
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
                                                        <MenuItem disabled>No filter options available</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        ))
                                    ) : (
                                        <Typography>No filters available for this category</Typography>
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
                                        <Typography variant="h6">Upload New Images</Typography>
                                        <input
                                            accept="image/*"
                                            id="product-images"
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="product-images">
                                            <Button variant="outlined" component="span">
                                                Upload New Images
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Existing Images:</Typography>
                                        <Grid container spacing={2}>
                                            {existingImagePreviews.map((url, index) => (
                                                <Grid item key={index} xs={4} md={3}>
                                                    <Card>
                                                        <CardContent>
                                                            <img src={url} alt={`Product ${index}`} style={{ width: '100%' }} />
                                                            <IconButton onClick={() => handleThumbnailChange('existing', index)}>
                                                                <Typography
                                                                    variant="body2"
                                                                    color={
                                                                        selectedThumbnailIndex.type === 'existing' && selectedThumbnailIndex.index === index
                                                                            ? 'primary'
                                                                            : 'inherit'
                                                                    }
                                                                >
                                                                    Set Thumbnail
                                                                </Typography>
                                                            </IconButton>
                                                            <IconButton onClick={() => handleExistingImageRemove(index)}>
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                            {imagePreviews.map((url, index) => (
                                                <Grid item key={index} xs={4} md={3}>
                                                    <Card>
                                                        <CardContent>
                                                            <img src={url} alt={`Product ${index}`} style={{ width: '100%' }} />
                                                            <IconButton onClick={() => handleThumbnailChange('new', index)}>
                                                                <Typography
                                                                    variant="body2"
                                                                    color={
                                                                        selectedThumbnailIndex.type === 'new' && selectedThumbnailIndex.index === index
                                                                            ? 'primary'
                                                                            : 'inherit'
                                                                    }
                                                                >
                                                                    Set Thumbnail
                                                                </Typography>
                                                            </IconButton>
                                                            <IconButton onClick={() => handleImageRemove(index)}>
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" type="submit" fullWidth>
                                            Update Product
                                        </Button>
                                    </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
                )}
            </Container>
        </AdminLayout>
    );
};

export default ProductUpdate;
