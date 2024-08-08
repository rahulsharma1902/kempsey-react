import React, { useEffect, useState } from 'react';
import AdminLayout from '.././../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addCategory, getParentCategories } from '../../../../api/apiCategories'; // Correct import statements
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoriesAdd = () => {
    const [ParentCategories, setParentCategories] = useState([]);

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await getParentCategories();
                if (Array.isArray(response.data)) {
                    setParentCategories(response.data);
                } else {
                    setParentCategories([]);
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
            }
        };
        getParentCategory();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        parent_id: '',
        image: null,
        description: '',
    });

    const [error, setError] = useState('');
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

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
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
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('parent_id', formData.parent_id);
        form.append('description', formData.description);

        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await addCategory(form);
            console.log(response);
            toast.success(response.message);
            // Optionally, redirect or clear form
        } catch (err) {
            toast.error(err.message || 'Error adding category');
        }
    };

    return (
        <AdminLayout>
            <div className="card card-bordered">
                <div className="card-inner">
                    <div className="card-head">
                        <h5 className="card-title">Category Details</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="id" value="" />
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
                                            <div className="form-control-wrap  p-2">
                                                <select
                                                    name="parent_id"
                                                    className="form-control"
                                                    id="parent-category"
                                                    value={formData.parent_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">--NONE--</option>
                                                    {ParentCategories.map(category => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
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
                                <div className="form-group mt-3 p-3">
                                    <button type="submit" className="btn btn-lg btn-dark">Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CategoriesAdd;
