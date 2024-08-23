import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { aboutuscontent, addAboutUsContent } from '../../../api/apiStorefront';
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
        about_us_banner_title: '',
        about_us_banner_image: '',
        about_us_banner_sub_title: '',
        about_us_heading: '',
        about_us_logo: '',
        about_us_details: '',
        about_us_image: '',
        about_us_btn: '',
        about_us_btn_link: '',
        about_us_shop_title: '',
        about_us_shop_details: [
            {
                title: '',
                text: '',
                image: '',
            },
            
        ],
        // about_us_shop_details: [
        //     {
        //         title: 'Widest Range',
        //         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
        //         image: 'https://sagmetic.site/2023/laravel/kempsey/public/about_images/about_us_shop_details1.svg',
        //     },
        //     {
        //         title: 'Lowest Prices',
        //         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
        //         image: 'https://sagmetic.site/2023/laravel/kempsey/public/about_images/about_us_shop_details2.svg',
        //     },
        //     {
        //         title: 'Customer Service',
        //         text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
        //         image: 'https://sagmetic.site/2023/laravel/kempsey/public/about_images/about_us_shop_details3.svg',
        //     },
        // ],
        about_us_bottom_title: '',
        about_us_bottom_banner: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [openSections, setOpenSections] = useState({
        banner: true,
        main: true,
        whyus: true,
        bottom: true,
    });
    const [openDetails, setOpenDetails] = useState([true]);

    useEffect(() => {
        const getContent = async () => {
            try {
                const response = await aboutuscontent();
    
                // Assuming the response data structure matches your form state structure
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
            const response = await addAboutUsContent(data);
            toast.success(response.message);
        } catch (err) {
            toast.error(err.message || 'Error saving home content');
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
    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {loading ? (
                    <FormSkeleton />
                ) : (
                    <Card>
                        <CardHeader title="About Us Content" />
                        <CardContent>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Banner Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('banner')}>
                                                        {openSections.banner ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.banner}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Banner Section Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Us Heading"
                                                                name="about_us_banner_title"
                                                                value={formData.about_us_banner_title}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.about_us_banner_title}
                                                                helperText={validationErrors.about_us_banner_title}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Us Sub Heading"
                                                                name="about_us_banner_sub_title"
                                                                value={formData.about_us_banner_sub_title}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.about_us_banner_sub_title}
                                                                helperText={validationErrors.about_us_banner_sub_title}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.about_us_banner_image}>
                                                                <InputLabel shrink>About Us Banner Image</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="about_us_banner_image"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.about_us_banner_image}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.about_us_banner_image && (
                                                                <img
                                                                    src={
                                                                        formData.about_us_banner_image instanceof File
                                                                            ? URL.createObjectURL(formData.about_us_banner_image)
                                                                            : formData.about_us_banner_image
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

                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Main Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('main')}>
                                                        {openSections.main ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.main}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Banner Section Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Us Heading"
                                                                name="about_us_heading"
                                                                value={formData.about_us_heading}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.about_us_heading}
                                                                helperText={validationErrors.about_us_heading}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl fullWidth error={!!validationErrors.about_us_details}>
                                                                <InputLabel shrink>About Us Details</InputLabel>
                                                                <CKEditor
                                                                    editor={ClassicEditor}
                                                                    data={formData.about_us_details}
                                                                    onChange={handleDescriptionChange}
                                                                />
                                                                <FormHelperText>{validationErrors.about_us_details}</FormHelperText>
                                                            </FormControl>
                                                            
                                                        </Grid>
                                                        
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.about_us_logo}>
                                                                <InputLabel shrink>About Us Logo</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="about_us_logo"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.about_us_logo}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.about_us_logo && (
                                                                <img
                                                                    src={
                                                                        formData.about_us_logo instanceof File
                                                                            ? URL.createObjectURL(formData.about_us_logo)
                                                                            : formData.about_us_logo
                                                                    }
                                                                    alt="Closet Banner"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.about_us_image}>
                                                                <InputLabel shrink>About Us Image</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="about_us_image"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.about_us_image}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.about_us_image && (
                                                                <img
                                                                    src={
                                                                        formData.about_us_image instanceof File
                                                                            ? URL.createObjectURL(formData.about_us_image)
                                                                            : formData.about_us_image
                                                                    }
                                                                    alt="Closet Banner"
                                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Us Btn"
                                                                name="about_us_btn"
                                                                value={formData.about_us_btn}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.about_us_btn}
                                                                helperText={validationErrors.about_us_btn}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Us Btn Link"
                                                                name="about_us_btn_link"
                                                                value={formData.about_us_btn_link}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.about_us_btn_link}
                                                                helperText={validationErrors.about_us_btn_link}
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
                                                title="Why Us"
                                                action={
                                                    <IconButton onClick={() => handleToggleSectionCollapse('whyus')}>
                                                        {openSections.whyus ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.whyus}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                With Us Section Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Why Us For Shop Title"
                                                                name="about_us_shop_title"
                                                                value={formData.about_us_shop_title}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.about_us_shop_title}
                                                                helperText={validationErrors.about_us_shop_title}
                                                                variant="outlined"
                                                            />
                                                        </Grid>

                                                        {formData.about_us_shop_details?.map((detail, index) => (
                                                            <React.Fragment key={index}>
                                                                <Grid item xs={12} md={10}>
                                                                    <Card>
                                                                        <CardHeader
                                                                            title={`Shop Detail ${index + 1}`}
                                                                            action={
                                                                                <Box>
                                                                                    <IconButton onClick={() => handleToggleDetailsCollapse(index)}>
                                                                                        {openDetails[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                                                    </IconButton>
                                                                                    <IconButton onClick={() => handleDeleteDetail(index)}>
                                                                                        <DeleteIcon />
                                                                                    </IconButton>
                                                                                </Box>
                                                                            }
                                                                        />
                                                                        <Collapse in={openDetails[index]}>
                                                                            <CardContent>
                                                                                <Grid container spacing={3}>
                                                                                    <Grid item xs={12}>
                                                                                        <TextField
                                                                                            fullWidth
                                                                                            label={`Why Us For Shop Detail Title ${index + 1}`}
                                                                                            name={`about_us_shop_details_title_${index}`}
                                                                                            value={detail.title || ''}
                                                                                            onChange={(e) => handleShopDetailsChange(index, 'title', e.target.value)}
                                                                                            error={!!validationErrors[`about_us_shop_details_${index}`]}
                                                                                            helperText={validationErrors[`about_us_shop_details_${index}`]}
                                                                                            variant="outlined"
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item xs={12}>
                                                                                        <TextField
                                                                                            fullWidth
                                                                                            label={`Why Us For Shop Detail Text ${index + 1}`}
                                                                                            name={`about_us_shop_details_text_${index}`}
                                                                                            value={detail.text || ''}
                                                                                            onChange={(e) => handleShopDetailsChange(index, 'text', e.target.value)}
                                                                                            error={!!validationErrors[`about_us_shop_details_${index}`]}
                                                                                            helperText={validationErrors[`about_us_shop_details_${index}`]}
                                                                                            variant="outlined"
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        <FormControl fullWidth error={!!validationErrors[`about_us_shop_details_image_${index}`]}>
                                                                                            <InputLabel shrink>About Us Shop Detail Image {index + 1}</InputLabel>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                type="file"
                                                                                                name={`about_us_shop_details_image_${index}`}
                                                                                                onChange={(e) => handleShopDetailsChange(index, 'image', e.target.files[0])}
                                                                                                variant="filled"
                                                                                                inputProps={{ accept: 'image/*' }}
                                                                                            />
                                                                                            <FormHelperText>{validationErrors[`about_us_shop_details_image_${index}`]}</FormHelperText>
                                                                                        </FormControl>
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        {detail.image && (
                                                                                            <img
                                                                                                src={detail.image instanceof File ? URL.createObjectURL(detail.image) : detail.image}
                                                                                                alt="Shop Detail"
                                                                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                                                            />
                                                                                        )}
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </CardContent>
                                                                        </Collapse>
                                                                    </Card>
                                                                </Grid>
                                                            </React.Fragment>
                                                        ))}

                                                        <Grid item xs={12}>
                                                            <Button variant="contained" color="primary" onClick={addNewShopDetail}>
                                                                Add New Shop Detail
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title="Bottom Section"
                                                action={
                                                    <IconButton onClick={() => handleToggleCollapse('bottom')}>
                                                        {openSections.bottom ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                }
                                            />
                                            <Collapse in={openSections.bottom}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" gutterBottom>
                                                                Banner Section Details
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="About Us Bottom Title"
                                                                name="about_us_bottom_title"
                                                                value={formData.about_us_banner_title}
                                                                onChange={handleChange}
                                                                error={!!validationErrors.about_us_banner_title}
                                                                helperText={validationErrors.about_us_banner_title}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                       
                                                        
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth error={!!validationErrors.about_us_bottom_banner}>
                                                                <InputLabel shrink>About Us Bottom Banner</InputLabel>
                                                                <TextField
                                                                    fullWidth
                                                                    type="file"
                                                                    name="about_us_bottom_banner"
                                                                    onChange={handleChange}
                                                                    variant="filled"
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                <FormHelperText>{validationErrors.about_us_bottom_banner}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {formData.about_us_bottom_banner && (
                                                                <img
                                                                    src={
                                                                        formData.about_us_bottom_banner instanceof File
                                                                            ? URL.createObjectURL(formData.about_us_bottom_banner)
                                                                            : formData.about_us_bottom_banner
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

                                    <Grid item xs={12}>
                                        <Button variant="contained" color="success" type="submit" fullWidth>
                                            Save About Us Content
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
