import React, { useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { addShippingMethod } from '../../../../api/apiShippingMethods';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Card, CardContent, Typography, Grid, Checkbox, FormControlLabel } from '@mui/material';
import FormSkeleton from '../../../Animation/FormSkeleton';

const ShipppingMethodAdd = () => {
    const [formData, setFormData] = useState({
        type: '',
        details: '',
        price: '',
        is_free_shipping_enabled: false,
        free_shipping_over: '',
        is_active: true,
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        // Validation logic
        if (!formData.type.trim()) {
            errors.type = 'Shipping type is required';
        }
        if (!formData.details.trim()) {
            errors.details = 'Shipping details are required';
        }
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            errors.price = 'Valid shipping price is required';
        }
        if (formData.is_free_shipping_enabled && (!formData.free_shipping_over || isNaN(formData.free_shipping_over) || Number(formData.free_shipping_over) <= 0)) {
            errors.free_shipping_over = 'Valid amount is required for free shipping';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setLoading(true);

        try {
            const response = await addShippingMethod({
                ...formData,
                is_free_shipping_enabled: formData.is_free_shipping_enabled ? 1 : 0, // Convert to integers
                is_active: formData.is_active ? 1 : 0, // Convert to integers
            });

            console.log(response);

            setFormData({
                type: '',
                details: '',
                price: '',
                is_free_shipping_enabled: false,
                free_shipping_over: '',
                is_active: true,
            });

            toast.success(response.message);
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding shipping method');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Add Shipping Method
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
                                    Save Shipping Method
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default ShipppingMethodAdd;
