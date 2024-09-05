import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addServiceOption, Services, getServiceOptionById } from '../../../../api/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSkeleton from '../../../Animation/FormSkeleton';
import { useParams } from 'react-router-dom';
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

const ServiceOptionUpdate = () => {
    const { id } = useParams(); 
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

    // Fetch all services
    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await Services();
                if (Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setServices([]);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error.message);
                toast.error('Failed to fetch services.');
            }
        };

        getServices();
    }, []);

    // Fetch service option details and service types based on service ID
    useEffect(() => {
        const fetchServiceOption = async () => {
            if (id) {
                try {
                    const response = await getServiceOptionById(id);
                    if (response.data) {
                        const { id, name, slug, service_id, service_type_ids } = response.data;
                        setFormData({
                            id,
                            name,
                            slug,
                            service_id: service_id || '',
                            // Ensure service_type_ids is properly handled
                            service_type_ids: Array.isArray(service_type_ids) 
                                ? service_type_ids 
                                : service_type_ids ? JSON.parse(service_type_ids) : [],
                        });
    
                        // Wait for services to be fetched
                        if (services.length > 0 && service_id) {
                            const selectedService = services.find((service) => service.id === parseInt(service_id));
                            if (selectedService) {
                                setServiceTypes(Array.isArray(selectedService.service_types) 
                                    ? selectedService.service_types 
                                    : JSON.parse(selectedService.service_types));
                            } else {
                                console.warn('Service not found for ID:', service_id);
                                setServiceTypes([]);
                            }
                        }
                    } else {
                        console.error('Service option data not found.');
                        toast.error('Failed to fetch service option details.');
                    }
                } catch (error) {
                    console.error('Error fetching service option:', error.message);
                    toast.error('Failed to fetch service option details.');
                }
            }
            setLoading(false);
        };
    
        fetchServiceOption();
    }, [id, services]);

    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        setFormData((prevData) => ({ ...prevData, service_id: serviceId, service_type_ids: [] }));
        setValidationErrors({ ...validationErrors, service_id: '' });
      
        if (serviceId) {
            const selectedService = services.find((service) => service.id === parseInt(serviceId));
            if (selectedService) {
                // Check if selectedService.service_types is already an array
                const serviceTypesData = Array.isArray(selectedService.service_types)
                    ? selectedService.service_types 
                    : JSON.parse(selectedService.service_types);
                setServiceTypes(serviceTypesData);
            } else {
                setServiceTypes([]);
            }
        } else {
            setServiceTypes([]);
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
        form.append('id', formData.id);
        form.append('slug', formData.slug);
        form.append('service_id', formData.service_id);
        form.append('service_type_ids', JSON.stringify(formData.service_type_ids)); 

        try {
            const response = await addServiceOption(form);
            console.log(response);
            // setFormData({ name: '', slug: '', service_id: '', service_type_ids: [] });
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
        </AdminLayout>
    );
};

export default ServiceOptionUpdate;
