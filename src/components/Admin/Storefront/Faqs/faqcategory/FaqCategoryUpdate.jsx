import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../AdminLayout';
import { getfaqcategoryId, addfaqcategory } from '../../../../../api/apiStorefront';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FormSkeleton from '../../../../Animation/FormSkeleton';
const FaqCategoryUpdate = () => {
    const { id } = useParams(); // Extract id from URL parameters
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slug: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch brand details if an ID is provided
        const fetchfaqcategory = async () => {
            if (id) {
                try {
                    const response = await getfaqcategoryId(id);
                    if (response.data) {
                        setFormData({
                            id: response.data.id,
                            name: response.data.category_name,
                            slug: response.data.category_slug,
                        });
                    } else {
                        toast.error('Failed to fetch Faq Category details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch Faq Category details.');
                }
            }
            setLoading(false);
        };

        fetchfaqcategory();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Faq Category name is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('id', formData.id);
        form.append('name', formData.name);
        form.append('slug', formData.slug);

        try {
            const response = await addfaqcategory(form);
            if (response && response.message) {
                toast.success(response.message);
                // Optionally navigate to another page
                // navigate('/admin-dashboard/products/brands');
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Failed to update Faq Category.');
            }
        } catch (err) {
            console.error('Error updating  Faq Category:', err.message);
            toast.error(err.message || 'Error updating Faq Category');
        }
    };

    return (
        <AdminLayout>
            <Container maxWidth="md">
                {loading ? (
                    <FormSkeleton />
                ) : (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Faq Category Details
                            </Typography>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={formData.id}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            label="Faq Category Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={!!validationErrors.name}
                                            helperText={validationErrors.name}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    {/* Slug field is now hidden */}
                                    <input
                                        type="hidden"
                                        name="slug"
                                        value={formData.slug}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    style={{ marginTop: '16px' }}
                                >
                                    Update Faq Category
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </Container>
            <ToastContainer />
        </AdminLayout>
    );
};

export default FaqCategoryUpdate;
