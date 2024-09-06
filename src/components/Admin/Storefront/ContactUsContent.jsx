import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { contactuscontent, addcontactuscontent } from '../../../api/apiStorefront';
import { toast } from 'react-toastify';
import FormSkeleton from '../../Animation/FormSkeleton';
import {
    Container,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Collapse,
    IconButton,
    Box,
    InputLabel,
    FormControl,
    FormHelperText
} from '@mui/material';

const ContactUsContentAdd = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        sub_heading:  '',
        heading:  '',
        content_heading: '',
        content_sub_heading: '',
        banner_image_url:  '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await contactuscontent();
                if (response.data) {
                    setFormData({
                        sub_heading: response.data.sub_heading || '',
                        heading: response.data.heading || '',
                        content_heading: response.data.content_heading || '',
                        content_sub_heading: response.data.content_sub_heading || '',
                        banner_image_url: response.data.banner_image_url || '',
                    });
                } else {
                    setFormData({});
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
            } finally {
                setLoading(false);
            }
        };
        getParentCategory();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (files) {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true); // Start loading
    
        const errors = {};
    
        // Check each field in formData for required validation
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                errors[key] = `${key.replace(/_/g, ' ')} is required`; // Convert key to a user-friendly message
            }
        });
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setLoading(false); // Stop loading if there are validation errors
            return;
        }
    
        // Create FormData object to handle file uploads
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key == 'banner_image_url' ) {
                data.append(key, formData[key] || null); 
            } else {
                data.append(key, formData[key]);
            }
        });
    
        try {
            const response = await addcontactuscontent(data); // Use FormData in the request
            toast.success(response.message);
            setFormData({
                // ...response.data,
                sub_heading: response.data.sub_heading || '',
                heading: response.data.heading || '',
                content_heading: response.data.content_heading || '',
                content_sub_heading: response.data.content_sub_heading || '',
                banner_image_url: response.data.banner_image_url || '',
            });
        } catch (err) {
            toast.error(err.message || 'Error saving home content');
        } finally {
            setLoading(false); 
        }
    };
    
    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {loading ? (
                    <FormSkeleton />
                ) : (
                    <Card>
                        <CardHeader
                            title="Contact Us Content"
                        />
                        <CardContent>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Grid container spacing={3}>
                                    {/* Closet Section */}
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Heading"
                                                            name="heading"
                                                            value={formData.heading}
                                                            onChange={handleChange}
                                                            error={!!validationErrors.heading}
                                                            helperText={validationErrors.heading}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Sub Heading"
                                                            name="sub_heading"
                                                            value={formData.sub_heading}
                                                            onChange={handleChange}
                                                            error={!!validationErrors.sub_heading}
                                                            helperText={validationErrors.sub_heading}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Content Heading"
                                                            name="content_heading"
                                                            value={formData.content_heading}
                                                            onChange={handleChange}
                                                            error={!!validationErrors.content_heading}
                                                            helperText={validationErrors.content_heading}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Content Sub Heading"
                                                            name="content_sub_heading"
                                                            value={formData.content_sub_heading}
                                                            onChange={handleChange}
                                                            error={!!validationErrors.content_sub_heading}
                                                            helperText={validationErrors.content_sub_heading}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth error={!!validationErrors.banner_image}>
                                                            <InputLabel shrink>Banner Image</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                type="file"
                                                                name="banner_image_url"
                                                                onChange={handleChange}
                                                                variant="filled"
                                                                inputProps={{ accept: 'image/*' }}
                                                            />
                                                            <FormHelperText>{validationErrors.banner_image_url}</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {formData.banner_image_url && (
                                                            <img
                                                                src={
                                                                    formData.banner_image_url instanceof File
                                                                        ? URL.createObjectURL(formData.banner_image_url)
                                                                        : formData.banner_image_url
                                                                }
                                                                alt="Banner"
                                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                            />
                                                        )}
                                                    </Grid>
                                                   
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="success" type="submit" fullWidth>
                                            Save Contact Us Content
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </AdminLayout>
    );
};

export default ContactUsContentAdd;
