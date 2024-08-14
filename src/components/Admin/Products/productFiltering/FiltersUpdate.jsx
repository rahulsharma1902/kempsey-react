import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { getFilterById, updateFilter } from '../../../../api/apiFilters';
import { activeParentCategories } from '../../../../api/apiCategories';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Container, Card, CardContent, Typography, Grid, MenuItem, CircularProgress } from '@mui/material';


const FiltersUpdate = () => {
    const { id } = useParams();
    const [ParentCategories, setParentCategories] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slug: '',
        category_id: '',
        options: [],
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

        const fetchFilter = async () => {
            if (id) {
                try {
                    const response = await getFilterById(id);
                    if (response.data) {
                        const optionsWithFlags = response.data.filter_options.map(option => ({
                            id: option.id || null,
                            name: option.name,
                            fromDatabase: true
                        }));
                        setFormData({
                            id: response.data.id,
                            name: response.data.name,
                            slug: response.data.slug,
                            category_id: response.data.category_id || '',
                            options: optionsWithFlags,
                        });
                    } else {
                        toast.error('Failed to fetch filter details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch filter details.');
                }
            }
            setLoading(false);
        };

        getParentCategory();
        fetchFilter();
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

    const handleOptionChange = (index, value) => {
        setFormData(prevFormData => {
            const updatedOptions = [...prevFormData.options];
            updatedOptions[index] = { ...updatedOptions[index], name: value };
            return { ...prevFormData, options: updatedOptions };
        });
    };

    const addOption = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            options: [...prevFormData.options, { id: null, name: '', fromDatabase: false }]
        }));
    };

    const removeOption = (index) => {
        if (formData.options.length > 1) {
            setFormData(prevFormData => {
                const updatedOptions = [...prevFormData.options];
                updatedOptions.splice(index, 1);
                return { ...prevFormData, options: updatedOptions };
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = {};
    
        if (!formData.name.trim()) {
            errors.name = 'Filter name is required';
        }
        if (!formData.category_id) {
            errors.category_id = 'Filter Category is required';
        }
    
        const invalidOptions = formData.options.filter(option => !option.name.trim());
        if (invalidOptions.length > 0) {
            errors.option = 'All options must have a valid name';
        }
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        const form = new FormData();
        form.append('id', formData.id);
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('category_id', formData.category_id);
        form.append('options', JSON.stringify(formData.options.map(option => ({
            id: option.id || null,
            name: option.name,
        }))));
    
        try {
            const response = await updateFilter(form);
            if (response && response.message) {
                toast.success(response.message);
                navigate('/admin-dashboard/products/filters');
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Failed to update filter.');
            }
        } catch (err) {
            console.error('Error updating filter:', err.message);
            toast.error(err.message || 'Error updating filter');
        }
    };

    return (
        <AdminLayout>
            {loading ? (
                <div className="text-center">
                    <CircularProgress />
                </div>
            ) : (
                <Container maxWidth="md">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Filter Details
                            </Typography>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="id" value={formData.id} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Filter Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={!!validationErrors.name}
                                            helperText={validationErrors.name}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <input
                                        type="hidden"
                                        name="slug"
                                        value={formData.slug}
                                    />
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Category"
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            error={!!validationErrors.category_id}
                                            helperText={validationErrors.category_id}
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            <MenuItem value="" disabled>
                                                --NONE--
                                            </MenuItem>
                                            {ParentCategories.map(category => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Options
                                        </Typography>
                                        {formData.options.map((option, index) => (
                                            <Grid container spacing={1} key={index} alignItems="center">
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        value={option.name}
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                        placeholder={`Option ${index + 1}`}
                                                        variant="outlined"
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                <Button
                                                    variant="contained"
                                                    color={option.fromDatabase ? 'warning' : 'error'}
                                                    onClick={() => removeOption(index)}
                                                    disabled={formData.options.length === 1}
                                                    style={{ marginTop: '8px' }}
                                                    >
                                                    Remove
                                                </Button>
                                               


                                                </Grid>
                                            </Grid>
                                        ))}
                                        
                                        {validationErrors.option && (
                                            <Typography color="error" variant="caption">
                                                {validationErrors.option}
                                            </Typography>
                                        )}
                                        <br />
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={addOption}
                                            style={{ marginTop: '16px' }}
                                        >
                                            Add New Option
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            fullWidth
                                            style={{ marginTop: '16px' }}
                                        >
                                            Update Filter
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            )}
        </AdminLayout>
    );
};

export default FiltersUpdate;
