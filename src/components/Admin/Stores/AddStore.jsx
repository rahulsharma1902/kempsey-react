import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Services, getServiceTypes } from '../../../api/apiService';
import { addStore } from '../../../api/apiStore';
import { toast } from 'react-toastify';
import FormSkeleton from '../../Animation/FormSkeleton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
    Checkbox,
    ListItemText,
} from '@mui/material';

const AddStore = () => {
    const [services, setServices] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [selectedServiceTypes, setSelectedServiceTypes] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        service_ids: [],
        details: '',
        postal_code: '',
        city: '',
        address: '',
        state: '',
        country: '',
        phone: '',
        email: '',
        latitude: '',
        longitude: '',
        image: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesResponse, serviceTypesResponse] = await Promise.all([
                    Services(),
                    getServiceTypes(),
                ]);
                
                if (Array.isArray(servicesResponse.data)) {
                    setServices(servicesResponse.data);
                } else {
                    console.error('Unexpected response format for services:', servicesResponse.data);
                }

                if (Array.isArray(serviceTypesResponse.data)) {
                    setServiceTypes(serviceTypesResponse.data);
                } else {
                    console.error('Unexpected response format for service types:', serviceTypesResponse.data);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateSelectedServiceTypes = () => {
            const selectedTypes = {};
            formData.service_ids.forEach((serviceId) => {
                const selectedService = services.find((service) => service.id === serviceId);
                if (selectedService && selectedService.service_types) {
                    selectedTypes[serviceId] = selectedService.service_types.map(type => type.id);
                }
            });
            setSelectedServiceTypes(selectedTypes);
        };

        updateSelectedServiceTypes();
    }, [formData.service_ids, services]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
            ...(name === 'name' && { slug: generateSlug(value) }),
        }));
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleDescriptionChange = (event, editor) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            details: editor.getData(),
        }));
    };

    const handleServiceChange = (event) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            service_ids: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleServiceTypeChange = (serviceId, event) => {
        const { value } = event.target;
        setSelectedServiceTypes((prevSelected) => ({
            ...prevSelected,
            [serviceId]: typeof value === 'string' ? value.split(',') : value,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                errors[key] = `${key.replace(/_/g, ' ')} is required`;
            }
        });

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        form.append('service_ids', JSON.stringify(formData.service_ids));
        form.append('service_types', JSON.stringify(selectedServiceTypes));
        
        try {
            const response = await addStore(form);
            setFormData({
                name: '',
                slug: '',
                service_ids: [],
                details: '',
                postal_code: '',
                city: '',
                address: '',
                state: '',
                country: '',
                phone: '',
                email: '',
                latitude: '',
                longitude: '',
                image: '',
            });
            toast.success(response.message);
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach((input, index) => {
                input.value = '';
            });
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding store');
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
                            Add Store
                        </Typography>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.name}>
                                        <TextField
                                            label="Store Name"
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
                                    <FormControl fullWidth variant="outlined" error={!!validationErrors.service_ids}>
                                        <InputLabel>Services</InputLabel>
                                        <Select
                                            multiple
                                            name="service_ids"
                                            value={formData.service_ids}
                                            onChange={handleServiceChange}
                                            label="Services"
                                            renderValue={(selected) => selected.map((id) => services.find((s) => s.id === id)?.name || '').join(', ')}
                                        >
                                            {services.map((service) => (
                                                <MenuItem key={service.id} value={service.id}>
                                                    <Checkbox checked={formData.service_ids.indexOf(service.id) > -1} />
                                                    <ListItemText primary={service.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {validationErrors.service_ids && (
                                            <FormHelperText>{validationErrors.service_ids}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                {formData.service_ids.map((serviceId) => {
                                    const relatedService = services.find(service => service.id === serviceId);
                                    return (
                                        <Grid item xs={12} sm={6} key={serviceId}>
                                            <FormControl fullWidth variant="outlined" error={!!validationErrors.service_types}>
                                                <InputLabel>{relatedService.name} Types</InputLabel>
                                                <Select
                                                    multiple
                                                    value={selectedServiceTypes[serviceId] || []}
                                                    onChange={(e) => handleServiceTypeChange(serviceId, e)}
                                                    renderValue={(selected) => 
                                                        selected
                                                            .map((id) => (relatedService.service_types || []).find(type => type.id === id)?.name)
                                                            .join(', ')
                                                    }
                                                >
                                                    {(relatedService.service_types || []).map((type) => (
                                                        <MenuItem key={type.id} value={type.id}>
                                                            <Checkbox
                                                                checked={(selectedServiceTypes[serviceId] || []).indexOf(type.id) > -1}
                                                            />
                                                            <ListItemText primary={type.name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {validationErrors.service_types && (
                                                    <FormHelperText>{validationErrors.service_types}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    );
                                })}

                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth error={!!validationErrors.address}>
                                        <TextField
                                            label="Address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.address}
                                            fullWidth
                                            helperText={validationErrors.address}
                                            multiline
                                            minRows={2}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.city}>
                                        <TextField
                                            label="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.city}
                                            fullWidth
                                            helperText={validationErrors.city}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.postal_code}>
                                        <TextField
                                            label="Postal Code"
                                            name="postal_code"
                                            value={formData.postal_code}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.postal_code}
                                            fullWidth
                                            helperText={validationErrors.postal_code}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.state}>
                                        <TextField
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.state}
                                            fullWidth
                                            helperText={validationErrors.state}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.country}>
                                        <TextField
                                            label="Country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.country}
                                            fullWidth
                                            helperText={validationErrors.country}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.phone}>
                                        <TextField
                                            label="Phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.phone}
                                            fullWidth
                                            helperText={validationErrors.phone}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.email}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.email}
                                            fullWidth
                                            helperText={validationErrors.email}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.latitude}>
                                        <TextField
                                            label="Latitude"
                                            name="latitude"
                                            value={formData.latitude}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.latitude}
                                            fullWidth
                                            helperText={validationErrors.latitude}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={!!validationErrors.longitude}>
                                        <TextField
                                            label="Longitude"
                                            name="longitude"
                                            value={formData.longitude}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={!!validationErrors.longitude}
                                            fullWidth
                                            helperText={validationErrors.longitude}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                            <FormControl fullWidth error={!!validationErrors.image}>
                                                    <InputLabel shrink>Store Image</InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        type="file"
                                                        name="image"
                                                        onChange={handleChange}
                                                        variant="filled"
                                                        inputProps={{ accept: 'image/*' }}
                                                    />
                                                    <FormHelperText>{validationErrors.image}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {formData.image && (
                                                <img
                                                    src={
                                                        formData.image instanceof File
                                                            ? URL.createObjectURL(formData.image)
                                                            : formData.image
                                                    }
                                                    alt="Store Banner"
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                            )}
                                        </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={!!validationErrors.details}>
                                        <Typography variant="h6">Details</Typography>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={formData.details}
                                            onChange={handleDescriptionChange}
                                        />
                                        {validationErrors.details && (
                                            <FormHelperText>{validationErrors.details}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="success" type="submit" fullWidth>
                                        Save Store
                                    </Button>
                            </Grid>
                            </Grid>
                            
                        </form>
                    </CardContent>
                </Card>
            )}
        </AdminLayout>
    );
};

export default AddStore;
