import React, { useEffect, useState } from 'react';
import AdminLayout from '.././../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addCategory, activeParentCategories } from '../../../../api/apiCategories';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Grid,
    Card,
    CardContent,
    Typography,
} from '@mui/material';

const CategoriesAdd = () => {
    const [ParentCategories, setParentCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        parent_id: '',
        image: null,
        description: '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await activeParentCategories();
                if (Array.isArray(response.data)) {
                    setParentCategories(response.data);
                } else {
                    setParentCategories([]);
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
            }
        };
        getParentCategory();
    }, []);

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
        let newFormData = { ...formData, [name]: value };
        if (name === 'name') {
            newFormData.slug = generateSlug(value);
        }
        setFormData(newFormData);
        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Category name is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('parent_id', formData.parent_id);
        form.append('description', formData.description);

        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await addCategory(form);
            console.log(response);

            // Clear form data
            setFormData({
                name: '',
                slug: '',
                parent_id: '',
                image: null,
                description: '',
            });

            // Clear file input
            document.getElementById('image-upload').value = '';

            toast.success(response.message);
            // Clear validation errors
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding category');
        }
    };

    return (
        <AdminLayout>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Category Details
                    </Typography>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!validationErrors.name}>
                                    <TextField
                                        label="Category Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={!!validationErrors.name}
                                        fullWidth
                                        helperText={validationErrors.name}
                                    />
                                </FormControl>
                            </Grid>
                            <input
                                type="hidden"
                                name="slug"
                                
                                value={formData.slug}
                             />
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" error={!!validationErrors.parent_id}>
                                    <InputLabel>Parent Category</InputLabel>
                                    <Select
                                        name="parent_id"
                                        value={formData.parent_id}
                                        onChange={handleChange}
                                        label="Parent Category"
                                    >
                                        <MenuItem value="">
                                            <em>--NONE--</em>
                                        </MenuItem>
                                        {ParentCategories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {validationErrors.parent_id && (
                                        <FormHelperText>{validationErrors.parent_id}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!validationErrors.image}>
                                    <TextField
                                        accept="image/*"
                                        type="file"
                                        id="image-upload"
                                        onChange={handleFileChange}
                                        label="Category Image"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    {validationErrors.image && (
                                        <FormHelperText>{validationErrors.image}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.description}
                                        onChange={handleDescriptionChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Save Category
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </AdminLayout>
    );
};

export default CategoriesAdd;
