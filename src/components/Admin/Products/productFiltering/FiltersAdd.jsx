import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { addFilter } from '../../../../api/apiFilters';
import { activeParentCategories } from '../../../../api/apiCategories';
import { toast } from 'react-toastify';
import {
    TextField,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    MenuItem,
    CircularProgress
} from '@mui/material';

const FiltersAdd = () => {
    const [ParentCategories, setParentCategories] = useState([]);
    const [options, setOptions] = useState(['']); // Initialize with one empty option
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category_id: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
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
        setOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = value;
            return updatedOptions;
        });
    };

    const addOption = () => {
        setOptions(prevOptions => [...prevOptions, '']);
    };

    const removeOption = (index) => {
        if (options.length > 1) {
            setOptions(prevOptions => {
                const updatedOptions = [...prevOptions];
                updatedOptions.splice(index, 1);
                return updatedOptions;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = {};
    
        if (!formData.name.trim()) {
            errors.name = 'Filter name is required';
        }
    
        if (!String(formData.category_id).trim()) {
            errors.category_id = 'Filter Category is required';
        }
    
        // Check if there is at least one valid option
        const validOptions = options.filter(option => option.trim());
        if (validOptions.length === 0) {
            errors.option = 'At least one option is required';
        } else if (validOptions.length < options.length) {
            errors.option = 'All options must have a valid name';
        }
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        const form = new FormData();
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('category_id', formData.category_id);
        form.append('options', JSON.stringify(options)); // Convert options to JSON string
    
        try {
            const response = await addFilter(form);
            // Clear form data
            setFormData({
                name: '',
                slug: '',
                category_id: '',
            });
            setOptions(['']); // Reset options to have one empty string
            toast.success(response.message);
    
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding filter');
        }
    };
    
    
    return (
        <AdminLayout>
            <Container maxWidth="md">
                {loading ? (
                    <div className="text-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Filter Details
                            </Typography>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                                --select category for filter--
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
                                        {options.map((option, index) => (
                                            <Grid container spacing={1} key={index} alignItems="center">
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                        placeholder={`Option ${index + 1}`}
                                                        variant="outlined"
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => removeOption(index)}
                                                        disabled={options.length === 1}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        ))}
                                        {validationErrors.option && (
                                            <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
                                                {validationErrors.option}
                                            </Typography>
                                        )}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={addOption}
                                            style={{ marginTop: '16px' }}
                                        >
                                            Add New Option
                                        </Button>
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    style={{ marginTop: '16px' }}
                                >
                                    Save Filter
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </AdminLayout>
    );
};

export default FiltersAdd;
