import React, { useState } from 'react';
import AdminLayout from '.././../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addCategory } from '../../../../api/apiCategories'; // Correct import statement

const CategoriesAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        parent_category: '',
        image: null,
        description: '',
    });
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        form.append('parent_category', formData.parent_category);
        form.append('image', formData.image);
        form.append('description', formData.description);

        try {
            const response = await addCategory(form); // Use addCategory function from apiCategories
            setError('');
            console.log(response);
            // Optionally, redirect or clear form
        } catch (err) {
            console.log(err);
            setError(err.message || 'Error adding category');
        }
    };

    return (
        <AdminLayout>
            <div className="card card-bordered ">
                <div className="card-inner">
                    <div className="card-head">
                        <h5 className="card-title">Category Details</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="id" value="" />
                                <div className="d-flex">
                                    <div className="col-lg-6 p-3">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">Category Name</label>
                                            <div className="form-control-wrap">
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
                                    <div className="col-lg-6 p-3">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <input
                                                    type="hidden"
                                                    name="slug"
                                                    className="form-control"
                                                    id="slug"
                                                    value={formData.slug}
                                                    onChange={handleChange}
                                                    placeholder="Slug"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 p-3">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="parent-category">Parent Category</label>
                                        <div className="form-control-wrap">
                                            <select
                                                name="parent_category"
                                                className="form-control"
                                                id="parent-category"
                                                value={formData.parent_category}
                                                onChange={handleChange}
                                            >
                                                <option value="">--NONE--</option>
                                                {/* Add parent category options here */}
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
                                <div className="col-lg-12 p-3">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="description">Description</label>
                                        <div className="form-control-wrap">
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
