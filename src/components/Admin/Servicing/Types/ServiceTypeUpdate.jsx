import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addServiceType, Services ,getServiceTypeById } from '../../../../api/apiService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import FormSkeleton from '../../../Animation/FormSkeleton';
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

const ServiceTypeUpdate = () => {
    const { id } = useParams();  // Extract id from URL parameters
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slug: '',
        service_id: '',
        full_price: '',
        club_price: '',
        details: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await Services();
                if (response.data && Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    setServices([]);
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
                toast.error('Failed to fetch parent categories.');
            }
        };
        getServices();
    }, []);

    useEffect(() => {
        const fetchServiceType = async () => {
            if (id) {
                try {
                    const response = await getServiceTypeById(id);
                    if (response.data) {
                        setFormData({
                            id: response.data.id,
                            name: response.data.name,
                            slug: response.data.slug,
                            service_id: response.data.service_id || '',
                            full_price: response.data.full_price || '',
                            club_price: response.data.club_price || '',
                            details: response.data.details || '',
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

        fetchServiceType();
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



    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, details: data });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'ServiceType name is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('id', formData.id);
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('service_id', formData.service_id);
        form.append('full_price', formData.full_price);
        form.append('club_price', formData.club_price);
        form.append('details', formData.details);

        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await addServiceType(form);
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
                <FormSkeleton />
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5">ServiceType Details</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="name"
                                        label="ServiceType Name"
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
                                        {services.map((service) => (
                                            <MenuItem key={service.id} value={service.id}>
                                                {service.name}
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
                                        fullWidth
                                        type='number'
                                        label="Service Type Full Price"
                                        name="full_price"
                                        value={formData.full_price}
                                        onChange={handleChange}
                                        error={!!validationErrors.full_price}
                                        helperText={validationErrors.full_price}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!validationErrors.club_price}>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        label="Service Type Club Price"
                                        name="club_price"
                                        value={formData.club_price}
                                        onChange={handleChange}
                                        error={!!validationErrors.club_price}
                                        helperText={validationErrors.club_price}
                                    />
                                </FormControl>
                            </Grid>
                                
                                <Grid item xs={12}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.details}
                                        onChange={handleDescriptionChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" fullWidth>
                                        Update Service Type
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

export default ServiceTypeUpdate;
