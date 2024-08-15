import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { activeParentCategories, getCategoryById, addCategory } from '../../../../api/apiCategories';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    CircularProgress,
    Typography
} from '@mui/material';

const CategoriesUpdate = () => {
    const { id } = useParams();  // Extract id from URL parameters
    const [ParentCategories, setParentCategories] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slug: '',
        parent_id: '',
        image: null,
        description: '',
        visibility:'',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await activeParentCategories();
                if (response.data && Array.isArray(response.data)) {
                    setParentCategories(response.data);
                } else {
                    setParentCategories([]);
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
                toast.error('Failed to fetch parent categories.');
            }
        };
        getParentCategory();
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            if (id) {
                try {
                    const response = await getCategoryById(id);
                    if (response.data) {
                        setFormData({
                            id: response.data.id,
                            name: response.data.name,
                            slug: response.data.slug,
                            parent_id: response.data.parent_id || '',
                            image: null,
                            description: response.data.description || '',
                            visibility: response.data.visibility || 'enabled',
                        });
                    } else {
                        toast.error('Failed to fetch category details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch category details.');
                }
            }
            setLoading(false);
        };

        fetchCategory();
    }, [id]);

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
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

    const handleVisibilityChange = (e) => {
        setFormData({ ...formData, visibility: e.target.checked ? 'enabled' : 'disabled' });
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
        form.append('id', formData.id);
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('parent_id', formData.parent_id);
        form.append('description', formData.description);
        form.append('visibility', formData.visibility);

        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await addCategory(form);
            if (response && response.message) {
                toast.success(response.message);
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Failed to update category.');
            }
        } catch (err) {
            console.error('Error updating category:', err.message);
            toast.error(err.message || 'Error updating category');
        }
    };

    return (
        <AdminLayout>
            {loading ? (
                <div className="text-center">
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Category Details</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="name"
                                        label="Category Name"
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
                                    <FormControl fullWidth>
                                        <InputLabel id="parent-category-label">Parent Category</InputLabel>
                                        <Select
                                            labelId="parent-category-label"
                                            name="parent_id"
                                            value={formData.parent_id}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">--NONE--</MenuItem>
                                            {ParentCategories.map(category => (
                                                category.id !== formData.id && (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </MenuItem>
                                                )
                                            ))}
                                        </Select>
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
                                        {/* <InputLabel id="visibility-label">Visibility</InputLabel> */}
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.visibility === 'enabled'}
                                                    onChange={handleVisibilityChange}
                                                />
                                            }
                                            label={formData.visibility === 'enabled' ? 'Category is visible' : 'Category is hidden'}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.description}
                                        onChange={handleDescriptionChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" fullWidth>
                                        Save Category
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            )}
            <ToastContainer />
        </AdminLayout>
    );
};

export default CategoriesUpdate;
