import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { getShippingMethodById, addShippingMethod } from '../../../../api/apiShippingMethods';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Card, CardContent, Typography, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FormSkeleton from '../../../Animation/FormSkeleton';

const ShippingMethodUpdate = () => {
    const { id } = useParams(); // Extract id from URL parameters
    const [formData, setFormData] = useState({
        id: '',
        type: '',
        details: '',
        price: '',
        is_free_shipping_enabled: false,
        is_active: false,
        free_shipping_over: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShippingMethod = async () => {
            if (id) {
                try {
                    const response = await getShippingMethodById(id);
                    if (response.data) {
                        setFormData({
                            id: response.data.id,
                            type: response.data.type || '',
                            details: response.data.details || '',
                            price: response.data.price || '',
                            is_free_shipping_enabled: response.data.is_free_shipping_enabled || false,
                            is_active: response.data.is_active || false,
                            free_shipping_over: response.data.free_shipping_over || ''
                        });
                    } else {
                        toast.error('Failed to fetch shipping method details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch shipping method details.');
                }
            }
            setLoading(false);
        };

        fetchShippingMethod();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });

        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = {};
    
        if (!formData.type.trim()) {
            errors.type = 'Shipping type is required';
        }
        if (!formData.details.trim()) {
            errors.details = 'Details are required';
        }
        if (!formData.price.trim()) {
            errors.price = 'Price is required';
        }
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        const form = new FormData();
        form.append('id', formData.id);
        form.append('type', formData.type);
        form.append('details', formData.details);
        form.append('price', formData.price);
        form.append('is_free_shipping_enabled', Number(formData.is_free_shipping_enabled)); // Convert to integer
        form.append('is_active', Number(formData.is_active)); // Convert to integer
        form.append('free_shipping_over', formData.free_shipping_over);
    
        try {
            const response = await addShippingMethod(form);
            if (response && response.message) {
                toast.success(response.message);
                navigate('/admin-dashboard/marketing/shipping'); // Optionally navigate to another page
            } else {
                toast.error('Failed to update shipping method.');
            }
        } catch (err) {
            toast.error(err.message || 'Error updating shipping method');
        }
    };
    

    return (
    <AdminLayout>
                <Container maxWidth="md">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Update Shipping Method
                            </Typography>
                            {loading ? (
                                <FormSkeleton />
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Shipping Type"
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                error={!!validationErrors.type}
                                                helperText={validationErrors.type}
                                                variant="outlined"
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Shipping Details"
                                                name="details"
                                                value={formData.details}
                                                onChange={handleChange}
                                                error={!!validationErrors.details}
                                                helperText={validationErrors.details}
                                                variant="outlined"
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Shipping Price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                error={!!validationErrors.price}
                                                helperText={validationErrors.price}
                                                variant="outlined"
                                                margin="normal"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={formData.is_free_shipping_enabled}
                                                        onChange={handleChange}
                                                        name="is_free_shipping_enabled"
                                                    />
                                                }
                                                label="Enable Free Shipping"
                                            />
                                        </Grid>
                                        {formData.is_free_shipping_enabled && (
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Free Shipping Over Amount"
                                                    name="free_shipping_over"
                                                    value={formData.free_shipping_over}
                                                    onChange={handleChange}
                                                    error={!!validationErrors.free_shipping_over}
                                                    helperText={validationErrors.free_shipping_over}
                                                    variant="outlined"
                                                    margin="normal"
                                                    type="number"
                                                />
                                            </Grid>
                                        )}
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={formData.is_active}
                                                        onChange={handleChange}
                                                        name="is_active"
                                                    />
                                                }
                                                label="Is Active"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth style={{ marginTop: '16px' }}>
                                        Update Shipping Method
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </Container>
            </AdminLayout>
    );
};

export default ShippingMethodUpdate;
