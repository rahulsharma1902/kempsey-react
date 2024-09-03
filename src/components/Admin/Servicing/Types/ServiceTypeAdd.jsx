import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addServiceType, Services } from '../../../../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSkeleton from '../../../Animation/FormSkeleton';
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
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        service_id: '',
        details: '',
        full_price: '',
        club_price: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await Services();
                if (Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    setServices([]);
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error.message);
            } finally {
                setLoading(false); // Ensure loading is set to false after data fetching attempt
            }
        };
    
        getServices();
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


    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, details: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        Object.keys(formData).forEach(key => {
            if (!formData[key] && key !== 'details') {
                errors[key] = `${key.replace(/_/g, ' ')} is required`;
            }
        });
        

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('full_price', formData.full_price);
        form.append('club_price', formData.club_price);
        form.append('service_id', formData.service_id);
        form.append('details', formData.details);

        try {
            const response = await addServiceType(form);
            // console.log(response);

            // Clear form data
            setFormData({
                name: '',
                slug: '',
                service_id: '',
                full_price: '',
                club_price: '',
                details: '',
            });


            toast.success(response.message);
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding category');
        }
    };

    return (
        <AdminLayout>
            {loading ? (
                <FormSkeleton />
            ) : (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                       Services Type Details
                    </Typography>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!validationErrors.name}>
                                    <TextField
                                        label="Service Type Name"
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
                                <FormControl fullWidth variant="outlined" error={!!validationErrors.service_id}>
                                    <InputLabel>Services</InputLabel>
                                    <Select
                                        name="service_id"
                                        value={formData.service_id}
                                        onChange={handleChange}
                                        label="Parent Service Type"
                                    >
                                        <MenuItem value="">
                                            <em>--NONE--</em>
                                        </MenuItem>
                                        {services.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {validationErrors.service_id && (
                                        <FormHelperText>{validationErrors.service_id}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!validationErrors.full_price}>
                                    <TextField
                                        type='number'
                                        label="Service Type Full Price"
                                        name="full_price"
                                        value={formData.full_price}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={!!validationErrors.full_price}
                                        fullWidth
                                        helperText={validationErrors.full_price}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!validationErrors.club_price}>
                                    <TextField
                                        type='number'
                                        label="Service Type Club Price"
                                        name="club_price"
                                        value={formData.club_price}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={!!validationErrors.club_price}
                                        fullWidth
                                        helperText={validationErrors.club_price}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.details}
                                        onChange={handleDescriptionChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Save Service Type
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            )}
            <ToastContainer />
        </AdminLayout>
    );
};

export default CategoriesAdd;
