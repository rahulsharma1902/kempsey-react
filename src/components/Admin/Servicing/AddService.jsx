import React, { useState } from 'react';
import AdminLayout from '../AdminLayout';
import { addService } from '../../../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Card, CardContent, Typography, Grid } from '@mui/material';

const ServicesAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Service name is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('slug', formData.slug);

        try {
            const response = await addService(form);
            console.log(response);

            // Clear form data
            setFormData({
                name: '',
                slug: '',
            });

            toast.success(response.message);
            // Clear validation errors
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding service');
        }
    };

    return (
        <AdminLayout>
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Service Details
                        </Typography>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Service Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={!!validationErrors.name}
                                        helperText={validationErrors.name}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <input
                                type="hidden"
                                name="slug"
                                value={formData.slug}
                            />
                            <Button type="submit" variant="contained" color="success" size="large" fullWidth style={{ marginTop: '16px' }}>
                                Save Service
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            <ToastContainer />
        </AdminLayout>
    );
};

export default ServicesAdd;
