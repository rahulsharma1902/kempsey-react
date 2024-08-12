import React, { useEffect, useState } from 'react';
import AdminLayout from '../../AdminLayout';
import { addFilter } from '../../../../api/apiFilters';
import { activeParentCategories } from '../../../../api/apiCategories';
import { toast } from 'react-toastify';


const FiltersAdd = () => {
    const [ParentCategories, setParentCategories] = useState([]);
    const [options, setOptions] = useState(['']);  // Initialize with one empty option
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category_id: '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await activeParentCategories();
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
        setOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = value;
            return updatedOptions;
        });
    };

    const addOption = () => {
        setOptions(prevOptions => [...prevOptions, '']);
    };

    const removeOption = (index) => {
        if (options.length > 1) {
            setOptions(prevOptions => {
                const updatedOptions = [...prevOptions];
                updatedOptions.splice(index, 1);
                return updatedOptions;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = {};
    
        if (!formData.name.trim()) {
            errors.name = 'Filter name is required';
        }
        if (!formData.category_id.trim()) {
            errors.category_id = 'Filter Category is required';
        }
        const hasValidOptions = options.some(option => option.trim() !== '');
        if (!hasValidOptions) {
            errors.option = 'At least one valid option is required';
        }
    
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        const form = new FormData();
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('category_id', formData.category_id);
        form.append('options', JSON.stringify(options)); // Convert options to JSON string
    
        try {
            const response = await addFilter(form);
            // Clear form data
            setFormData({
                name: '',
                slug: '',
                category_id: '',
            });
            setOptions(['']);  // Reset options to have one empty string
            toast.success(response.message);
    
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding filter');
        }
    };

    return (
        <AdminLayout>
            <div className="card card-bordered">
                <div className="card-inner">
                    <div className="card-head">
                        <h5 className="card-title">Filter Details</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                                    <option value="" disabled>--select category for filter--</option>
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
                                                {options.map((option, index) => (
                                                    <div key={index} className="row mb-2">
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={option}
                                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                                placeholder={`Option ${index + 1}`}
                                                            />
                                                        </div>
                                                        <div className="col-auto">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => removeOption(index)}
                                                                disabled={options.length === 1}  // Disable remove if only one option left
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <button
                                                    type="button"
                                                    className="btn btn-secondary mt-2"
                                                    onClick={addOption}
                                                >
                                                    Add New Option
                                                </button>
                                            </div>
                                            {validationErrors.option && <span className="text text-danger">{validationErrors.option}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-3 p-3">
                                    <button type="submit" className="btn btn-lg btn-dark">Save Filter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default FiltersAdd;
