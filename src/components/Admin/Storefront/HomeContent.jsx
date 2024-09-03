import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { homecontent, addHomeContent } from '../../../api/apiStorefront';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HomeContentAdd = () => {
    const [ParentCategories, setParentCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        closet_section_heading: '',
        closet_section_sub_heading: '',
        closet_section_btn: '',
        closet_section_btn_link: '',
        closet_section_banner:'',
        closet_section_banner_heading: '',
        
        new_arrivals_first_banner: '',
        new_arrivals_bg_image: '',
        new_arrivals_title: '',
        new_arrivals_text: '',
        new_arrivals_btn: '',
        new_arrivals_btn_link: '',
        new_arrivals_logo: '',
        new_arrivals_product_image: '',
        new_arrivals_product_name: '',
        new_arrivals_product_text: '',
        new_arrivals_product_btn: '',
        new_arrivals_product_btn_link: '',
        new_arrivals_product_banner: '',
        
        about_section_heading: '',
        about_section_logo: '',
        about_section_details: '',
        about_section_image: '',
        about_section_btn: '',
        about_section_btn_link: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [openSections, setOpenSections] = useState({
        closet: true,
        newArrivals: true,
        about: true,
    });
    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };
    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await homecontent();
                if (response.data) {
                    setFormData({
                        closet_section_heading: response.data.closet_section_heading || '',
                        closet_section_sub_heading: response.data.closet_section_sub_heading || '',
                        closet_section_btn: response.data.closet_section_btn || '',
                        closet_section_btn_link: response.data.closet_section_btn_link || '',
                        closet_section_banner: response.data.closet_section_banner || '',
                        closet_section_banner_heading: response.data.closet_section_banner_heading || '',

                        new_arrivals_first_banner: response.data.new_arrivals_first_banner || '',
                        new_arrivals_bg_image: response.data.new_arrivals_bg_image || '',
                        new_arrivals_title: response.data.new_arrivals_title || '',
                        new_arrivals_text: response.data.new_arrivals_text || '',
                        new_arrivals_btn: response.data.new_arrivals_btn || '',
                        new_arrivals_btn_link: response.data.new_arrivals_btn_link || '',
                        new_arrivals_logo: response.data.new_arrivals_logo || '',
                        new_arrivals_product_image: response.data.new_arrivals_product_image || '',
                        new_arrivals_product_name: response.data.new_arrivals_product_name || '',
                        new_arrivals_product_text: response.data.new_arrivals_product_text || '',
                        new_arrivals_product_btn: response.data.new_arrivals_product_btn || '',
                        new_arrivals_product_btn_link: response.data.new_arrivals_product_btn_link || '',
                        new_arrivals_product_banner: response.data.new_arrivals_product_banner || '',

                        about_section_heading: response.data.about_section_heading || '',
                        about_section_logo: response.data.about_section_logo || '',
                        about_section_details: response.data.about_section_details || '',
                        about_section_image: response.data.about_section_image || '',
                        about_section_btn: response.data.about_section_btn || '',
                        about_section_btn_link: response.data.about_section_btn_link || '',
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
                [name]: files[0], // Save the file object
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
            if (key.includes('banner') || key.includes('image') || key.includes('logo')) {
                data.append(key, formData[key] || null); // Set file fields to null if not present
            } else {
                data.append(key, formData[key]);
            }
        });
    
        try {
            const response = await addHomeContent(data); // Use FormData in the request
            toast.success(response.message);
            setFormData({
                ...response.data,
            });
        } catch (err) {
            toast.error(err.message || 'Error saving home content');
        } finally {
            setLoading(false); // Stop loading after the response is received
        }
    };
    
    
    

    const handleToggleCollapse = (section) => {
        setOpenSections(prevSections => ({
            ...prevSections,
            [section]: !prevSections[section],
        }));
    };
    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {loading ? (
                    <FormSkeleton />
                ) : (
                    <Card>
                        <CardHeader
                            title="Home Content"
                        />
                        <CardContent>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Grid container spacing={3}>
                                    {/* Closet Section */}
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Closet Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('closet')}>
                                                        {openSections.closet ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.closet}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Closet Section Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Closet Heading"
                                                                name="closet_section_heading"
                                                                value={formData.closet_section_heading}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.closet_section_heading}
                                                                helperText={validationErrors.closet_section_heading}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Closet Sub Heading"
                                                                name="closet_section_sub_heading"
                                                                value={formData.closet_section_sub_heading}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.closet_section_sub_heading}
                                                                helperText={validationErrors.closet_section_sub_heading}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Closet Button Title"
                                                                name="closet_section_btn"
                                                                value={formData.closet_section_btn}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.closet_section_btn}
                                                                helperText={validationErrors.closet_section_btn}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Closet Button Link"
                                                                name="closet_section_btn_link"
                                                                value={formData.closet_section_btn_link}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.closet_section_btn_link}
                                                                helperText={validationErrors.closet_section_btn_link}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Closet Banner Heading"
                                                                name="closet_section_banner_heading"
                                                                value={formData.closet_section_banner_heading}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.closet_section_banner_heading}
                                                                helperText={validationErrors.closet_section_banner_heading}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.closet_section_banner}>
                                                                <InputLabel shrink>Closet Banner Image</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="closet_section_banner"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.closet_section_banner}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.closet_section_banner && (
                                                                <img
                                                                    src={
                                                                        formData.closet_section_banner instanceof File
                                                                            ? URL.createObjectURL(formData.closet_section_banner)
                                                                            : formData.closet_section_banner
                                                                    }
                                                                    alt="Closet Banner"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>

                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>

                                    {/* New Arrivals Section */}
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="New Arrivals"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('newArrivals')}>
                                                        {openSections.newArrivals ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.newArrivals}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                New Arrivals Details
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Title"
                                                                name="new_arrivals_title"
                                                                value={formData.new_arrivals_title}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_title}
                                                                helperText={validationErrors.new_arrivals_title}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Text"
                                                                name="new_arrivals_text"
                                                                value={formData.new_arrivals_text}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_text}
                                                                helperText={validationErrors.new_arrivals_text}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.new_arrivals_first_banner}>
                                                                <InputLabel shrink>New Arrivals Banner Image</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="new_arrivals_first_banner"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.new_arrivals_first_banner}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.new_arrivals_first_banner && (
                                                                <img
                                                                    src={
                                                                        formData.new_arrivals_first_banner instanceof File
                                                                            ? URL.createObjectURL(formData.new_arrivals_first_banner)
                                                                            : formData.new_arrivals_first_banner
                                                                    }
                                                                    alt="Closet Banner"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.new_arrivals_bg_image}>
                                                                <InputLabel shrink>New Arrivals B-G Image</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="new_arrivals_bg_image"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.new_arrivals_bg_image}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.new_arrivals_bg_image && (
                                                                <img
                                                                    src={
                                                                        formData.new_arrivals_bg_image instanceof File
                                                                            ? URL.createObjectURL(formData.new_arrivals_bg_image)
                                                                            : formData.new_arrivals_bg_image
                                                                    }
                                                                    alt="Closet Banner"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Btn"
                                                                name="new_arrivals_btn"
                                                                value={formData.new_arrivals_btn}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_btn}
                                                                helperText={validationErrors.new_arrivals_btn}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Btn Link"
                                                                name="new_arrivals_btn_link"
                                                                value={formData.new_arrivals_btn_link}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_btn_link}
                                                                helperText={validationErrors.new_arrivals_btn_link}
                                                                
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.new_arrivals_logo}>
                                                                <InputLabel shrink>New Arrivals Logo</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="new_arrivals_logo"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.new_arrivals_logo}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.new_arrivals_logo && (
                                                                <img
                                                                    src={
                                                                        formData.new_arrivals_logo instanceof File
                                                                            ? URL.createObjectURL(formData.new_arrivals_logo)
                                                                            : formData.new_arrivals_logo
                                                                    }
                                                                    alt="new_arrivals_logo"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.new_arrivals_product_image}>
                                                                <InputLabel shrink>New Arrivals Product Image</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="new_arrivals_product_image"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.new_arrivals_product_image}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.new_arrivals_product_image && (
                                                                <img
                                                                    src={
                                                                        formData.new_arrivals_product_image instanceof File
                                                                            ? URL.createObjectURL(formData.new_arrivals_product_image)
                                                                            : formData.new_arrivals_product_image
                                                                    }
                                                                    alt="new_arrivals_product_image"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Product Name"
                                                                name="new_arrivals_product_name"
                                                                value={formData.new_arrivals_product_name}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_product_name}
                                                                helperText={validationErrors.new_arrivals_product_name}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Product Text"
                                                                name="new_arrivals_product_text"
                                                                value={formData.new_arrivals_product_text}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_product_text}
                                                                helperText={validationErrors.new_arrivals_product_text}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Product Btn"
                                                                name="new_arrivals_product_btn"
                                                                value={formData.new_arrivals_product_btn}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_product_btn}
                                                                helperText={validationErrors.new_arrivals_product_btn}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="New Arrivals Product Btn Link"
                                                                name="new_arrivals_product_btn_link"
                                                                value={formData.new_arrivals_product_btn_link}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.new_arrivals_product_btn_link}
                                                                helperText={validationErrors.new_arrivals_product_btn_link}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.new_arrivals_product_banner}>
                                                                <InputLabel shrink>New Arrivals Product Banner</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="new_arrivals_product_banner"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.new_arrivals_product_banner}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.new_arrivals_product_banner && (
                                                                <img
                                                                    src={
                                                                        formData.new_arrivals_product_banner instanceof File
                                                                            ? URL.createObjectURL(formData.new_arrivals_product_banner)
                                                                            : formData.new_arrivals_product_banner
                                                                    }
                                                                    alt="new_arrivals_product_banner"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>

                                    {/* About Section */}
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="About Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('about')}>
                                                        {openSections.about ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.about}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                About Section Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Heading"
                                                                name="about_section_heading"
                                                                value={formData.about_section_heading}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.about_section_heading}
                                                                helperText={validationErrors.about_section_heading}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            {/* <TextField
                                                                fullWidth
                                                                label="About Detail"
                                                                name="about_section_details"
                                                                value={formData.about_section_details}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                multiline
                                                                rows={4}
                                                            /> */}
                                                            <FormControl fullWidth error={!!validationErrors.about_section_details}>
                                                                <InputLabel shrink>About Details</InputLabel>
                                                                <CKEditor
                                                                    editor={ClassicEditor}
                                                                    data={formData.about_section_details}
                                                                    onChange={handleDescriptionChange}
                                                                />
                                                                <FormHelperText>{validationErrors.about_section_details}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.about_section_logo}>
                                                                <InputLabel shrink>About Logo</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="about_section_logo"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.about_section_logo}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.about_section_logo && (
                                                                <img
                                                                    src={
                                                                        formData.about_section_logo instanceof File
                                                                            ? URL.createObjectURL(formData.about_section_logo)
                                                                            : formData.about_section_logo
                                                                    }
                                                                    alt="about_section_logo"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.about_section_image}>
                                                                <InputLabel shrink>About Image</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="about_section_image"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.about_section_image}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.about_section_image && (
                                                                <img
                                                                    src={
                                                                        formData.about_section_image instanceof File
                                                                            ? URL.createObjectURL(formData.about_section_image)
                                                                            : formData.about_section_image
                                                                    }
                                                                    alt="about_section_image"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Btn"
                                                                name="about_section_btn"
                                                                value={formData.about_section_btn}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.about_section_btn}
                                                                helperText={validationErrors.about_section_btn}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Btn Link"
                                                                name="about_section_btn_link"
                                                                value={formData.about_section_btn_link}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                error={!!validationErrors.about_section_btn_link}
                                                                helperText={validationErrors.about_section_btn_link}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button variant="contained" color="success" type="submit" fullWidth>
                                            Save Home Content
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

export default HomeContentAdd;
