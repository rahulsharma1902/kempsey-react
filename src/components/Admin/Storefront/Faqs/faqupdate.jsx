import React, { useEffect, useState } from 'react';
import AdminLayout from '.././../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addfaq, Faqcategories,getfaqId } from '../../../../api/apiStorefront';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import FormSkeleton from '../../../Animation/FormSkeleton';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Grid,
    Card,
    CardContent,
    Typography,
} from '@mui/material';

const FaqsUpdate = () => {
    const { id } = useParams();
    const [Categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        question: '',
        category_id: '',
        description: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await Faqcategories();
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setCategories([]);
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch  Categories:', error.message);
            } finally {
                setLoading(false); 
            }
        };
    
        getCategory();
    }, []);

    useEffect(() => {
        const fetchFaq = async () => {
            if (id) {
                try {
                    const response = await getfaqId(id);
                    if (response.data) {
                        setFormData({
                            id: response.data.id,
                            question: response.data.question,
                            category_id: response.data.category_id || '',
                            description: response.data.answer || '',
                        });
                    } else {
                        toast.error('Failed to fetch Faq details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch Faq details.');
                }
            }
            setLoading(false);
        };

        fetchFaq();
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };
      
        setFormData(newFormData);
        setValidationErrors({ ...validationErrors, [name]: '' });
    };


    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.question.trim()) {
            errors.question = 'Question is required';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!formData.category_id) {
            errors.category_id = 'product category is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('id', formData.id);
        form.append('question', formData.question);
        form.append('category_id', formData.category_id);
        form.append('description', formData.description);


        try {
            const response = await addfaq(form);
            console.log(response);

            toast.success(response.message);
            // Clear validation errors
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error Updating Faq');
        }
    };

    return (
        <AdminLayout>
            {loading ? (
                <FormSkeleton />
            ) : (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        FAQ Details
                    </Typography>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <FormControl fullWidth error={!!validationErrors.question}>
                                    <TextField
                                        label="Question"
                                        name="question"
                                        value={formData.question}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={!!validationErrors.question}
                                        fullWidth
                                        helperText={validationErrors.question}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth variant="outlined" error={!!validationErrors.category_id}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleChange}
                                        label="Category"
                                    >
                                        {Categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.category_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {validationErrors.category_id && (
                                        <FormHelperText>{validationErrors.category_id}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                           
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formData.description}
                                        onChange={handleDescriptionChange}
                                    />
                                    {validationErrors.description && (
                                        <FormHelperText>{validationErrors.description}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Save Faq
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            )}
            <ToastContainer />
        </AdminLayout>
    );
};

export default FaqsUpdate;
