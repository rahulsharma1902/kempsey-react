import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { activeParentCategories, getCategoryById, addCategory } from '../../../../api/apiCategories';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const CategoriesUpdate = () => {
    const { id } = useParams();  // Extract id from URL parameters
    const [ParentCategories, setParentCategories] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slug: '',
        parent_id: '',
        image: null,
        description: '',
        visibility:'',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await activeParentCategories();
                if (response.data && Array.isArray(response.data)) {
                    setParentCategories(response.data);
                } else {
                    setParentCategories([]);
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
                toast.error('Failed to fetch parent categories.');
            }
        };
        getParentCategory();
    }, []);

    useEffect(() => {
        // Fetch parent categories
        const getParentCategory = async () => {
            try {
                const response = await activeParentCategories();
                if (response.data && Array.isArray(response.data)) {
                    setParentCategories(response.data);
                } else {
                    setParentCategories([]);
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
                toast.error('Failed to fetch parent categories.');
            }
        };
    
        // Fetch category details if an ID is provided
        const fetchCategory = async () => {
            if (id) {
                try {
                    const response = await getCategoryById(id);
                    if (response.data) {
                        setFormData({
                            id: response.data.id,
                            name: response.data.name,
                            slug: response.data.slug,
                            parent_id: response.data.parent_id || '',
                            image: null,
                            description: response.data.description || '',
                            visibility: response.data.visibility || 'enabled',
                        });
                    } else {
                        toast.error('Failed to fetch category details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch category details.');
                }
            }
            setLoading(false);
        };
    
        getParentCategory();
        fetchCategory();
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

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    const handleVisibilityChange = (e) => {
        setFormData({ ...formData, visibility: e.target.checked ? 'enabled' : 'disabled' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Category name is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('id', formData.id);
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('parent_id', formData.parent_id);
        form.append('description', formData.description);
        form.append('visibility', formData.visibility);  // Append visibility as 'enabled' or 'disabled'


        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await addCategory(form);
            if (response && response.message) {
                // navigate('/admin-dashboard/products/categories');
                toast.success(response.message);
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Failed to update category.');
            }
        } catch (err) {
            console.error('Error updating category:', err.message);
            toast.error(err.message || 'Error updating category');
        }
    };

    return (
        <AdminLayout>
            {loading ? (
                <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
            <div className="card card-bordered">
                <div className="card-inner">
                    <div className="card-head">
                        <h5 className="card-title">Category Details</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="id" value={formData.id} />
                                <div className="d-flex">
                                    <div className="col-lg-6 p-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">Category Name</label>
                                            <div className="form-control-wrap p-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter category name"
                                                />
                                            </div>
                                            {validationErrors.name && <span className="text text-danger">{validationErrors.name}</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 p-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="slug">Slug</label>
                                            <div className="form-control-wrap p-2">
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    className="form-control"
                                                    id="slug"
                                                    value={formData.slug}
                                                    onChange={handleChange}
                                                    placeholder="Slug"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="col-lg-6 p-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="parent-category">Parent Category</label>
                                            <div className="form-control-wrap p-2">
                                                <select
                                                    name="parent_id"
                                                    className="form-control"
                                                    id="parent-category"
                                                    value={formData.parent_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">--NONE--</option>
                                                    {ParentCategories.map(category => (
                                                        category.id !== formData.id && (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        )
                                                    ))}

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 p-2">
                                        <div className="form-group" id="file-input">
                                            <label className="form-label" htmlFor="image">Category Image</label>
                                            <div className="form-control-wrap p-2">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    className="form-control"
                                                    id="image"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                            {validationErrors.image && <span className="text text-danger">{validationErrors.image}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 p-3">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="description">Description</label>
                                        <div className="form-control-wrap p-2">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={formData.description}
                                                onChange={handleDescriptionChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 p-3">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="visibility">
                                            {formData.visibility === 'enabled' ? 'Hide Category' : 'Show Category'}
                                        </label>
                                        <div className="form-control-wrap p-2">
                                            <input
                                                type="checkbox"
                                                id="visibility"
                                                checked={formData.visibility === 'enabled'}
                                                onChange={handleVisibilityChange}
                                            />
                                            <label htmlFor="visibility" className="ml-2">
                                                {formData.visibility === 'enabled' ? 'Category is visible' : 'Category is hidden'}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mt-3 p-3">
                                    <button type="submit" className="btn btn-lg btn-dark">Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )}
            <ToastContainer />
        </AdminLayout>
    );
};

export default CategoriesUpdate;
