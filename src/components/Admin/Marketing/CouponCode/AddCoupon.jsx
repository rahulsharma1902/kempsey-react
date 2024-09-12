import React, { useState, useEffect } from 'react';
import AdminLayout from '../../AdminLayout';
import { addCoupon } from '../../../../api/apiCoupons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Card, CardContent, Typography, Grid, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormSkeleton from '../../../Animation/FormSkeleton'; // Import your skeleton loader component

const generateRandomCouponCode = () => {
    return 'COUPON-' + Math.random().toString(36).substr(2, 8).toUpperCase();
};

const CouponsAdd = () => {
    const [formData, setFormData] = useState({
        code: generateRandomCouponCode(), // Generate random code initially
        description: '',
        discount_type: 'percentage', // Default value
        discount_value: '',
        start_date: null,
        end_date: null,
        minimum_order: '',
        maximum_discount: '',
        usage_limit: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        // Generate a new coupon code when the component mounts
        setFormData((prevState) => ({
            ...prevState,
            code: generateRandomCouponCode(),
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleDateChange = (name) => (date) => {
        setFormData({ ...formData, [name]: date });
        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = {};
    
        // Validation logic
        if (!formData.code.trim()) {
            errors.code = 'Coupon code is required';
        }
    
        if (!formData.discount_value || isNaN(formData.discount_value) || Number(formData.discount_value) <= 0) {
            errors.discount_value = 'Valid discount value is required';
        }
    
        if (!formData.start_date) {
            errors.start_date = 'Start date is required';
        }
    
        if (!formData.end_date) {
            errors.end_date = 'End date is required';
        }
    
        if (formData.start_date && formData.end_date && formData.start_date > formData.end_date) {
            errors.date_range = 'End date should be after start date';
        }
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        // Format dates before sending them
        const formattedStartDate = formData.start_date ? formData.start_date.format('YYYY-MM-DD') : '';
        const formattedEndDate = formData.end_date ? formData.end_date.format('YYYY-MM-DD') : '';
    
        const form = new FormData();
        for (const key in formData) {
            if (key === 'start_date') {
                form.append(key, formattedStartDate);
            } else if (key === 'end_date') {
                form.append(key, formattedEndDate);
            } else {
                form.append(key, formData[key]);
            }
        }
    
        setLoading(true); // Set loading to true when starting the submission
    
        try {
            const response = await addCoupon(form);
            console.log(response);
    
            // Clear form data
            setFormData({
                code: generateRandomCouponCode(), // Generate a new random code
                description: '',
                discount_type: 'percentage',
                discount_value: '',
                start_date: null,
                end_date: null,
                minimum_order: '',
                maximum_discount: '',
                usage_limit: '',
            });
    
            toast.success(response.message);
            // Clear validation errors
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding coupon');
        } finally {
            setLoading(false); // Set loading to false when the submission completes
        }
    };
    

    return (
        <AdminLayout>
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Add Coupon
                        </Typography>
                        {loading ? (
                            <FormSkeleton /> 
                        ) : (
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Coupon Code"
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            error={!!validationErrors.code}
                                            helperText={validationErrors.code}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            error={!!validationErrors.description}
                                            helperText={validationErrors.description}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Discount Value"
                                            name="discount_value"
                                            type="number"
                                            value={formData.discount_value}
                                            onChange={handleChange}
                                            error={!!validationErrors.discount_value}
                                            helperText={validationErrors.discount_value}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Discount Type"
                                            name="discount_type"
                                            value={formData.discount_type}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            error={!!validationErrors.discount_type}
                                            helperText={validationErrors.discount_type}
                                        >
                                            <MenuItem value="percentage">Percentage</MenuItem>
                                            <MenuItem value="fixed">Fixed</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Start Date"
                                                value={formData.start_date}
                                                onChange={handleDateChange('start_date')}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        variant="outlined"
                                                        margin="normal"
                                                        error={!!validationErrors.start_date}
                                                        helperText={validationErrors.start_date}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="End Date"
                                                value={formData.end_date}
                                                onChange={handleDateChange('end_date')}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        variant="outlined"
                                                        margin="normal"
                                                        error={!!validationErrors.end_date}
                                                        helperText={validationErrors.end_date}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Minimum Order Amount"
                                            name="minimum_order"
                                            type="number"
                                            value={formData.minimum_order}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            error={!!validationErrors.minimum_order}
                                            helperText={validationErrors.minimum_order}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Maximum Discount Amount"
                                            name="maximum_discount"
                                            type="number"
                                            value={formData.maximum_discount}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            error={!!validationErrors.maximum_discount}
                                            helperText={validationErrors.maximum_discount}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Usage Limit"
                                            name="usage_limit"
                                            type="number"
                                            value={formData.usage_limit}
                                            onChange={handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            error={!!validationErrors.usage_limit}
                                            helperText={validationErrors.usage_limit}
                                        />
                                    </Grid>
                                </Grid>
                                <Button type="submit" variant="contained" color="primary" size="large" fullWidth style={{ marginTop: '16px' }}>
                                    Save Coupon
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default CouponsAdd;
