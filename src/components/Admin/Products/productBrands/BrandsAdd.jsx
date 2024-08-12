import React, { useEffect, useState } from 'react';
import AdminLayout from '.././../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addBrand } from '../../../../api/apiBrands'; // Correct import statements
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrandsAdd = () => {
    const [ParentCategories, setParentCategories] = useState([]);

    

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
       
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


    const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.name.trim()) {
        errors.name = 'Brand name is required';
    }

    if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('slug', formData.slug);


    try {
        const response = await addBrand(form);
        console.log(response);
        
        // Clear form data
        setFormData({
            name: '',
            slug: '',
           
        });

      
        toast.success(response.message);
        // Clear validation errors
        setValidationErrors({});
    } catch (err) {
        toast.error(err.message || 'Error adding brand');
    }
};

    

    return (
        <AdminLayout>
            <div className="card card-bordered">
                <div className="card-inner">
                    <div className="card-head">
                        <h5 className="card-title">Brand Details</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="id" value="" />
                                <div className="d-flex">
                                    <div className="col-lg-6 p-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">Brand Name</label>
                                            <div className="form-control-wrap p-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter brand name"
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
                               
                                <div className="form-group mt-3 p-3">
                                    <button type="submit" className="btn btn-lg btn-dark">Save Brand</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BrandsAdd;
