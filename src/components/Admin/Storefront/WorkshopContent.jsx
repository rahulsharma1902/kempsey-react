import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { workshopcontent, addworkshopcontent } from '../../../api/apiStorefront';
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

const WorkshopContentAdd = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        banner_image_url:  '',
        sub_heading:  '',
        heading:  '',
        content_title: '',
        content_heading: '',
        content_text: '',
        button_text: '',
        description: '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    const handleTextChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, content_text: data });
    };
    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await workshopcontent();
                if (response.data) {
                    setFormData({
                        banner_image_url: response.data.banner_image_url || '',
                        sub_heading: response.data.sub_heading || '',
                        heading: response.data.heading || '',
                        content_title: response.data.content_title || '',
                        content_heading: response.data.content_heading || '',
                        content_text: response.data.content_text || '',
                        button_text: response.data.button_text || '',
                        description: response.data.description || '',
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
            const response = await addworkshopcontent(data); // Use FormData in the request
            toast.success(response.message);
            setFormData({
                // ...response.data,
                banner_image_url: response.data.banner_image_url || '',
                sub_heading: response.data.sub_heading || '',
                heading: response.data.heading || '',
                content_title: response.data.content_title || '',
                content_heading: response.data.content_heading || '',
                content_text: response.data.content_text || '',
                button_text: response.data.button_text || '',
                description: response.data.description || '',
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
                            title="Workshop Content"
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
                                                        <TextField
                                                            fullWidth
                                                            label="Content Title"
                                                            name="content_title"
                                                            value={formData.content_title}
                                                            onChange={handleChange}
                                                            error={!!validationErrors.content_title}
                                                            helperText={validationErrors.content_title}
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
                                                        <FormControl fullWidth error={!!validationErrors.content_text}>
                                                            <InputLabel shrink>Content Text</InputLabel>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={formData.content_text}
                                                                onChange={handleTextChange}
                                                            />
                                                            <FormHelperText>{validationErrors.content_text}</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Button Text"
                                                            name="button_text"
                                                            value={formData.button_text}
                                                            onChange={handleChange}
                                                            error={!!validationErrors.button_text}
                                                            helperText={validationErrors.button_text}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth error={!!validationErrors.description}>
                                                            <InputLabel shrink>Description</InputLabel>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={formData.description}
                                                                onChange={handleDescriptionChange}
                                                            />
                                                            <FormHelperText>{validationErrors.description}</FormHelperText>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="success" type="submit" fullWidth>
                                            Save Workshop Content
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

export default WorkshopContentAdd;
