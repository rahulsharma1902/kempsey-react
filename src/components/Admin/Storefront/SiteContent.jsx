import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { sitecontent, addStoreContent } from '../../../api/apiStorefront';
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
import DeleteIcon from '@mui/icons-material/Delete';

const HomeContentAdd = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        header_offer_text: '',
        footer_instagram_name: '',
        footer_instagram_images: [],

        footer_contact_title: '',
        footer_contact_banner: '',

        footer_facebook_link: '',
        footer_instagram_link: '',
        footer_twitter_link: '',

        footer_slider_image: '',


        footer_description: '',

        address: '',
        phone: '',
        email: '',

        footer_policy: '',


        
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [openSections, setOpenSections] = useState({
        header: true,
        footer: true,
        address : true,
        contact : true, 
        social: true,
        
    });
    const [openDetails, setOpenDetails] = useState([true]);

    useEffect(() => {
        const getContent = async () => {
            try {
                const response = await sitecontent();
                console.warn(response);
    
                // Assuming the response data structure matches your form state structure
                setFormData({
                    header_offer_text: response.data.header_offer_text || '',
                    footer_instagram_name: response.data.footer_instagram_name || '',
                    
                    footer_instagram_images: JSON.parse(response.data.footer_instagram_images) || '',
                    
                    footer_contact_title: response.data.footer_contact_title || '',
                    footer_contact_banner: response.data.footer_contact_banner || '',
                    footer_facebook_link: response.data.footer_facebook_link || '',
                    footer_instagram_link: response.data.footer_instagram_link || '',
                    footer_twitter_link: response.data.footer_twitter_link || '',


                    footer_slider_image: response.data.footer_slider_image || '',
                    footer_description: response.data.footer_description || '',
                    address: response.data.address || '',
                    phone: response.data.phone || '',
                    email: response.data.email || '',
                    footer_policy: response.data.footer_policy || '',

                  
                });
    
                console.log(response);
            } catch (error) {
                console.error('Failed to fetch About Us Content:', error.message);
            } finally {
                setLoading(false);
            }
        };
    
        getContent();
    }, []);
    

    const addNewShopDetail = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            about_us_shop_details: [...prevFormData.about_us_shop_details, { title: '', text: '', image: null }],
        }));
        setOpenDetails(prevOpenDetails => [...prevOpenDetails, true]);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setFormData(prevFormData => ({
            ...prevFormData,
            footer_instagram_images: [...prevFormData.footer_instagram_images, ...newImages]
        }));
    };
    const handleShopDetailsChange = (index, field, value) => {
        const newShopDetails = [...formData.about_us_shop_details];
        newShopDetails[index][field] = value;
        setFormData({ ...formData, about_us_shop_details: newShopDetails });
    };

    const handleDeleteDetail = (index) => {
        const newShopDetails = formData.about_us_shop_details.filter((_, i) => i !== index);
        if (newShopDetails.length === 0) {
            newShopDetails.push({ title: '', text: '', image: null });
        }
        setFormData({ ...formData, about_us_shop_details: newShopDetails });
        setOpenDetails(prevOpenDetails => prevOpenDetails.filter((_, i) => i !== index));
    };

    const handleToggleDetailsCollapse = (index) => {
        setOpenDetails(prevOpenDetails => {
            const newOpenDetails = [...prevOpenDetails];
            newOpenDetails[index] = !newOpenDetails[index];
            return newOpenDetails;
        });
    };
    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
    
        Object.keys(formData).forEach(key => {
            if (key !== 'about_us_shop_details' && !formData[key]) {
                errors[key] = `${key.replace(/_/g, ' ')} is required`;
            }
        });
    
        formData.about_us_shop_details.forEach((detail, index) => {
            if (!detail.title || !detail.text) {
                errors[`about_us_shop_details_${index}`] = 'Title and text are required for each shop detail';
            }
        });
    
        if (formData.about_us_shop_details.length === 0) {
            errors.about_us_shop_details = 'At least one shop detail is required';
        }
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setLoading(false);
            return;
        }
    
        const data = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === 'about_us_shop_details') {
                const details = formData[key].map((detail, index) => {
                    data.append(`about_us_shop_details[${index}][title]`, detail.title);
                    data.append(`about_us_shop_details[${index}][text]`, detail.text);

                    // Append the image correctly
                    if (detail.image instanceof File) {
                        data.append(`about_us_shop_details[${index}][image]`, detail.image);
                    } else {
                        // Handle the case where it's a URL
                        data.append(`about_us_shop_details[${index}][image]`, detail.image);
                    }
                    return detail;
                });
            } else {
                data.append(key, formData[key]);
            }
        });

    
        try {
            setLoading(true);
            const response = await addStoreContent(data);
            toast.success(response.message);
            setFormData({
                about_us_banner_title: response.data.about_us_banner_title || '',
                about_us_banner_image: response.data.about_us_banner_image || '',
                about_us_banner_sub_title: response.data.about_us_banner_sub_title || '',
                about_us_heading: response.data.about_us_heading || '',
                about_us_logo: response.data.about_us_logo || '',
                about_us_details: response.data.about_us_details || '',
                about_us_image: response.data.about_us_image || '',
                about_us_btn: response.data.about_us_btn || '',
                about_us_btn_link: response.data.about_us_btn_link || '',
                about_us_shop_title: response.data.about_us_shop_title || '',
                about_us_shop_details: JSON.parse(response.data.about_us_shop_details) || '',

                about_us_bottom_title: response.data.about_us_bottom_title || '',
                about_us_bottom_banner: response.data.about_us_bottom_banner || '',
            });

            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach((input, index) => {
                input.value = '';
            });
        } catch (err) {
            toast.error(err.message || 'Error saving home content');
            setLoading(false);
        } finally {
            setLoading(false);
        }

    };
    

    const handleToggleSectionCollapse = (section) => {
        setOpenSections(prevSections => ({
            ...prevSections,
            [section]: !prevSections[section],
        }));
    };
    const handleToggleCollapse = (section) => {
        setOpenSections(prevSections => ({
            ...prevSections,
            [section]: !prevSections[section],
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            footer_instagram_images: prevFormData.footer_instagram_images.filter((_, i) => i !== index)
        }));
    };
    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {loading ? (
                    <FormSkeleton />
                ) : (
                    <Card>
                        <CardHeader title="Site Content" />
                        <CardContent>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Header Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('header')}>
                                                        {openSections.header ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.header}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Header Section
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Offer Text"
                                                                name="header_offer_text"
                                                                value={formData.header_offer_text}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.header_offer_text}
                                                                helperText={validationErrors.header_offer_text}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        

                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Footer Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('footer')}>
                                                        {openSections.footer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.footer}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Footer Section
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Facebook Link"
                                                                name="footer_facebook_link"
                                                                value={formData.footer_facebook_link}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.footer_facebook_link}
                                                                helperText={validationErrors.footer_facebook_link}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Instagram Link"
                                                                name="footer_instagram_link"
                                                                value={formData.footer_instagram_link}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.footer_instagram_link}
                                                                helperText={validationErrors.footer_instagram_link}
                                                                variant="outlined"
                                                            /> 
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Twitter Link"
                                                                name="footer_twitter_link"
                                                                value={formData.footer_twitter_link}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.footer_twitter_link}
                                                                helperText={validationErrors.footer_twitter_link}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                           
                                                            <FormControl fullWidth error={!!validationErrors.footer_description}>
                                                                <InputLabel shrink>Footer Description</InputLabel>
                                                                <CKEditor
                                                                    editor={ClassicEditor}
                                                                    data={formData.footer_description}
                                                                    onChange={handleDescriptionChange}
                                                                />
                                                                <FormHelperText>{validationErrors.footer_description}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Footer Policy"
                                                                name="footer_policy"
                                                                value={formData.footer_policy}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.footer_policy}
                                                                helperText={validationErrors.footer_policy}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.footer_slider_image}>
                                                                <InputLabel shrink>Footer Slider</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="footer_slider_image"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.footer_slider_image}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.footer_slider_image && (
                                                                <img
                                                                    src={
                                                                        formData.footer_slider_image instanceof File
                                                                            ? URL.createObjectURL(formData.footer_slider_image)
                                                                            : formData.footer_slider_image
                                                                    }
                                                                    alt="footer_slider_image"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Address Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('address')}>
                                                        {openSections.address ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.address}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Address Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Address"
                                                                name="address"
                                                                value={formData.address}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.address}
                                                                helperText={validationErrors.address}
                                                                variant="outlined"
                                                                multiline
                                                                minRows={2} 
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Phone"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.phone}
                                                                helperText={validationErrors.phone}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.email}
                                                                helperText={validationErrors.email}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Contact Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('contact')}>
                                                        {openSections.contact ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.contact}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Contact Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Contact Title"
                                                                name="footer_contact_title"
                                                                value={formData.footer_contact_title}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.footer_contact_title}
                                                                helperText={validationErrors.footer_contact_title}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.footer_contact_banner}>
                                                                <InputLabel shrink>Contact Banner</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="footer_contact_banner"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.footer_contact_banner}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.footer_contact_banner && (
                                                                <img
                                                                    src={
                                                                        formData.footer_contact_banner instanceof File
                                                                            ? URL.createObjectURL(formData.footer_contact_banner)
                                                                            : formData.footer_contact_banner
                                                                    }
                                                                    alt="footer_contact_banner"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Social Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('social')}>
                                                        {openSections.social ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.social}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Social Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Instagram Name"
                                                                name="footer_instagram_name"
                                                                value={formData.footer_instagram_name}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.footer_instagram_name}
                                                                helperText={validationErrors.footer_instagram_name}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                        <FormControl fullWidth error={!!validationErrors.footer_instagram_images}>
                                                            <InputLabel shrink>Instagram Images</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                type="file"
                                                                name="footer_instagram_images"
                                                                onChange={handleFileChange}
                                                                variant="filled"
                                                                inputProps={{ accept: 'image/*', multiple: true }}
                                                            />
                                                            <FormHelperText>{validationErrors.footer_instagram_images}</FormHelperText>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Grid container spacing={2}>
                                                            {formData.footer_instagram_images.map((image, index) => (
                                                                <Grid item xs={4} key={index}>
                                                                    <div style={{ position: 'relative' }}>
                                                                        <img
                                                                            src={image}
                                                                            alt={`instagram_image_${index}`}
                                                                            style={{ maxWidth: '100%', height: 'auto' }}
                                                                        />
                                                                        <IconButton
                                                                            onClick={() => handleRemoveImage(index)}
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: 0,
                                                                                right: 0,
                                                                                color: 'red',
                                                                            }}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </div>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                        
                                                        
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button variant="contained" color="success" type="submit" fullWidth>
                                            Save Site Content
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