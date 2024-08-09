import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getBrandById, addBrand } from '../../../../api/apiBrands';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const BrandUpdate = () => {
    const { id } = useParams();  // Extract id from URL parameters
    const [BrandData, setBrandData] = useState([]);
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
        // Fetch parent categories
      
        // Fetch brand details if an ID is provided
        const fetchBrand = async () => {
            if (id) {
                try {
                    const response = await getBrandById(id);
                    if (response.data) {
                        setFormData({
                            id: response.data.id,
                            name: response.data.name,
                            slug: response.data.slug,
                           
                        });
                    } else {
                        toast.error('Failed to fetch brand details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch brand details.');
                }
            }
            setLoading(false);
        };
    
        fetchBrand();
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
        form.append('id', formData.id);
        form.append('name', formData.name);
        form.append('slug', formData.slug);
      



        try {
            const response = await addBrand(form);
            if (response && response.message) {
                // navigate('/admin-dashboard/products/categories');
                toast.success(response.message);
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Failed to update brand.');
            }
        } catch (err) {
            console.error('Error updating brand:', err.message);
            toast.error(err.message || 'Error updating brand');
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
                        <h5 className="card-title">Brand Details</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="id" value={formData.id} />
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
                                    <button type="submit" className="btn btn-lg btn-dark">Update Brand</button>
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

export default BrandUpdate;
