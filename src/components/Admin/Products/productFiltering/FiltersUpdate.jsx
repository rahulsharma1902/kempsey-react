import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { getFilterById, updateFilter } from '../../../../api/apiFilters';
import { activeParentCategories } from '../../../../api/apiCategories';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const FiltersUpdate = () => {
    const { id } = useParams();  // Extract id from URL parameters
    const [ParentCategories, setParentCategories] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slug: '',
        category_id: '',
        options: [], // Add options field
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

        const fetchFilter = async () => {
            if (id) {
                try {
                    const response = await getFilterById(id);
                    if (response.data) {
                        const optionsWithFlags = response.data.filter_options.map(option => ({
                            id: option.id || null, // Ensure id is included
                            name: option.name,
                            fromDatabase: true
                        }));
                        setFormData({
                            id: response.data.id,
                            name: response.data.name,
                            slug: response.data.slug,
                            category_id: response.data.category_id || '',
                            options: optionsWithFlags, // Set existing options with flags
                        });
                    } else {
                        toast.error('Failed to fetch filter details.');
                    }
                } catch (error) {
                    toast.error('Failed to fetch filter details.');
                }
            }
            setLoading(false);
        };

        getParentCategory();
        fetchFilter();
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
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            ...(name === 'name' && { slug: generateSlug(value) })
        }));
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleOptionChange = (index, value) => {
        setFormData(prevFormData => {
            const updatedOptions = [...prevFormData.options];
            updatedOptions[index] = { ...updatedOptions[index], name: value };
            return { ...prevFormData, options: updatedOptions };
        });
    };

    const addOption = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            options: [...prevFormData.options, { id: null, name: '', fromDatabase: false }]
        }));
    };

    const removeOption = (index) => {
        if (formData.options.length > 1) {
            setFormData(prevFormData => {
                const updatedOptions = [...prevFormData.options];
                updatedOptions.splice(index, 1);
                return { ...prevFormData, options: updatedOptions };
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = {};
    
        if (!formData.name.trim()) {
            errors.name = 'Filter name is required';
        }
        if (!formData.category_id) {
            errors.category_id = 'Filter Category is required';
        }
    
        // Validate that all options have a non-empty name
        const invalidOptions = formData.options.filter(option => !option.name.trim());
        if (invalidOptions.length > 0) {
            errors.option = 'All options must have a valid name';
        }
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        const form = new FormData();
        form.append('id', formData.id);
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('category_id', formData.category_id);
        form.append('options', JSON.stringify(formData.options.map(option => ({
            id: option.id || null, // Ensure id is included and can be null
            name: option.name,
        })))); // Convert options to JSON string with id
    
        try {
            const response = await updateFilter(form); // Update function
            if (response && response.message) {
                toast.success(response.message);
                navigate('/admin-dashboard/products/filters'); // Adjust redirection path
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Failed to update filter.');
            }
        } catch (err) {
            console.error('Error updating filter:', err.message);
            toast.error(err.message || 'Error updating filter');
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
                            <h5 className="card-title">Filter Details</h5>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <input type="hidden" name="id" value={formData.id} />
                                    <div className="d-flex">
                                        <div className="col-lg-6 p-2">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="name">Filter Name</label>
                                                <div className="form-control-wrap p-2">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter filter name"
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
                                                <label className="form-label" htmlFor="category_id">Category</label>
                                                <div className="form-control-wrap p-2">
                                                    <select
                                                        name="category_id"
                                                        className="form-control"
                                                        id="category_id"
                                                        value={formData.category_id}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">--NONE--</option>
                                                        {ParentCategories.map(category => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {validationErrors.category_id && <span className="text text-danger">{validationErrors.category_id}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="col-lg-12 p-2">
                                            <div className="form-group">
                                                <label className="form-label">Options</label>
                                                <div className="form-control-wrap p-2">
                                                    {formData.options.map((option, index) => (
                                                        <div key={index} className="row mb-2">
                                                            <div className="col">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={option.name}
                                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                                    placeholder={`Option ${index + 1}`}
                                                                />
                                                            </div>
                                                            <div className="col-auto">
                                                                <button
                                                                    type="button"
                                                                    className={`btn ${option.fromDatabase ? 'btn-danger' : 'btn-outline-danger'}`}
                                                                    onClick={() => removeOption(index)}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button type="button" className="btn btn-dark" onClick={addOption}>Add Option</button>
                                                </div>
                                                {validationErrors.option && <span className="text text-danger">{validationErrors.option}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control-wrap p-2">
                                        <button type="submit" className="btn btn-dark">Update Filter</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default FiltersUpdate;
