import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { customerservicecontent, addcustomerservicecontent } from '../../../api/apiStorefront';
import { toast } from 'react-toastify';
import FormSkeleton from '../../Animation/FormSkeleton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

const CustomerServiceContentAdd = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        sub_heading:  '',
        heading:  '',
        content: '',
        banner_image_url:  '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, content: data });
    };
    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await customerservicecontent();
                if (response.data) {
                    setFormData({
                        sub_heading: response.data.sub_heading || '',
                        heading: response.data.heading || '',
                        content: response.data.content || '',
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
            const response = await addcustomerservicecontent(data); // Use FormData in the request
            toast.success(response.message);
            setFormData({
                // ...response.data,
                sub_heading: response.data.sub_heading || '',
                heading: response.data.heading || '',
                content: response.data.content || '',
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
                            title="Customer Service Content"
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
                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth error={!!validationErrors.content}>
                                                            <InputLabel shrink>Content</InputLabel>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={formData.content}
                                                                onChange={handleDescriptionChange}
                                                            />
                                                            <FormHelperText>{validationErrors.content}</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="success" type="submit" fullWidth>
                                            Save Customer Service Content
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

export default CustomerServiceContentAdd;
