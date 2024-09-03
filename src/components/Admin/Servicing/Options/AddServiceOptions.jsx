import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { addServiceOption, Services } from '../../../../api/apiService';
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

const ServiceOptionAdd = () => {
    const [services, setServices] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        service_id: '',
        service_type_ids: [],
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
                setLoading(false);
            }
        };

        getServices();
    }, []);

    const handleServiceChange = async (e) => {
        const serviceId = e.target.value;
        setFormData((prevData) => ({ ...prevData, service_id: serviceId, service_type_ids: [] }));
        setValidationErrors({ ...validationErrors, service_id: '' });

        if (serviceId) {
            const selectedService = services.find((service) => service.id == serviceId);
            if (selectedService) {
                setServiceTypes(selectedService.service_types);
            } else {
                setServiceTypes([]);
                setFormData((prevData) => ({ ...prevData, service_type_ids: [] }));
            }
        } else {
            setServiceTypes([]);
            setFormData((prevData) => ({ ...prevData, service_type_ids: [] }));
        }
    };

    const handleServiceTypeChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({ ...prevData, service_type_ids: value }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        Object.keys(formData).forEach((key) => {
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
        form.append('service_id', formData.service_id);
        form.append('service_type_ids', JSON.stringify(formData.service_type_ids)); // Correctly serialize the array

        try {
            const response = await addServiceOption(form);
            setFormData({ name: '', slug: '', service_id: '', service_type_ids: [] });
            toast.success(response.message);
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding service option');
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
                                            label="Service Option Name"
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
                                <input type="hidden" name="slug" value={formData.slug} />
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined" error={!!validationErrors.service_id}>
                                        <InputLabel>Services</InputLabel>
                                        <Select
                                            name="service_id"
                                            value={formData.service_id}
                                            onChange={handleServiceChange}
                                            label="Parent Service Option"
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

                                {formData.service_id && serviceTypes.length > 0 && (
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Service Types</InputLabel>
                                            <Select
                                                name="service_type_ids"
                                                multiple
                                                value={formData.service_type_ids}
                                                onChange={handleServiceTypeChange}
                                                label="Service Types"
                                            >
                                                {serviceTypes.map((type) => (
                                                    <MenuItem key={type.id} value={type.id}>
                                                        {type.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}

                                {formData.service_id && serviceTypes.length === 0 && (
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="textSecondary">
                                            No service types available for the selected service.
                                        </Typography>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" fullWidth>
                                        Save Service Option
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

export default ServiceOptionAdd;
