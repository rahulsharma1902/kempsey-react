import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { addProduct } from '../../../api/apiProducts';
import { categories } from '../../../api/apiCategories';
import { Brands } from '../../../api/apiBrands';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProductsAdd = () => {
    const [ParentCategories, setParentCategories] = useState([]);
    const [BrandsData, setBrandsData] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category_id: '',
        brand_id: '',
        selected_filters_options: '',
        description:'',
        details:'',
        price:'',
        stock:'',
        weight:'',
        images: [],
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

    useEffect(() => {
        const getParentCategory = async () => {
            try {
                const response = await categories();
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

        const getBrandsData = async () => {
            try {
                const response = await Brands();
                if (Array.isArray(response.data)) {
                    setBrandsData(response.data);
                } else {
                    setBrandsData([]);
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Brands:', error.message);
            }
        };
        getBrandsData();
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

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            category_id: categoryId,
        }));

        if (categoryId) {
            const selectedCategory = ParentCategories.find(cat => cat.id === parseInt(categoryId));
            if (selectedCategory) {
                let filtersToSet = [];

                // Check if the selected category has a parent category
                if (selectedCategory.parent_id) {
                    const parentCategory = ParentCategories.find(cat => cat.id === selectedCategory.parent_id);
                    filtersToSet = parentCategory ? parentCategory.filters : selectedCategory.filters;
                } else {
                    filtersToSet = selectedCategory.filters;
                }

                setFilters(filtersToSet || []);
                setSelectedOptions((filtersToSet || []).reduce((acc, filter) => {
                    acc[filter.id] = ''; // Initialize selected options for each filter
                    return acc;
                }, {}));
            } else {
                setFilters([]);
                setSelectedOptions({});
            }
        } else {
            // Clear filters and selected options if no category is selected
            setFilters([]);
            setSelectedOptions({});
        }
    };

    const handleFilterChange = (filterId, value) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [filterId]: value
        }));
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, description: data });
    };

    const handleDetailChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, details: data });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevFormData => ({
            ...prevFormData,
            images: files
        }));

        // Generate image previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleThumbnailChange = (index) => {
        setSelectedThumbnailIndex(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Product name is required';
        }
        if (!formData.category_id.trim()) {
            errors.category_id = 'Product Category is required';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('slug', formData.slug);
        form.append('category_id', formData.category_id);
        form.append('brand_id', formData.brand_id);
        form.append('selected_filters_options', JSON.stringify(selectedOptions)); // Convert selected options to JSON string
        form.append('description', formData.description);
        form.append('details', formData.details);
        form.append('price', formData.price);
        form.append('stock', formData.stock);
        form.append('weight', formData.weight);

        // Append all selected images to the FormData object
        if (formData.images) {
            Array.from(formData.images).forEach((file, index) => {
                form.append(`images[${index}]`, file);
            });
        }

        if (selectedThumbnailIndex !== null) {
            form.append('thumbnail_index', selectedThumbnailIndex);
        }

        try {
            const response = await addProduct(form);
            toast.success(response.message);
            console.log(response);
            // Clear form data after successful submission
            // setFormData({
            //     name: '',
            //     slug: '',
            //     category_id: '',
            //     brand_id: '',
            //     selectedOptions: '',
            //     description: '',
            //     details: '',
            //     images: [] // Clear images as well
            // });
            // setImagePreviews([]);
            // setSelectedThumbnailIndex(null);
            // setFilters([]);
            // setSelectedOptions({});
            // setValidationErrors({});
        } catch (err) {
            toast.error(err.message || 'Error adding product');
        }
    };

    return (
        <AdminLayout>
            <div className="card card-bordered">
                <div className="card-inner">
                    <div className="card-head">
                        <h5 className="card-title">Product Details</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="d-flex">
                                        <div className="col-lg-6 p-2">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="name">Product Name</label>
                                                <div className="form-control-wrap p-2">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter Product name"
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
                                    <hr />
                                    <div className="d-flex">
                                        <div className="col-lg-4 p-2">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="price">Price</label>
                                                <div className="form-control-wrap p-2">
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        className="form-control"
                                                        id="price"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        placeholder="enter product price"
                                                    />
                                                </div>
                                                {validationErrors.price && <span className="text text-danger">{validationErrors.price}</span>}
                                            </div>
                                        </div>
                                        <div className="col-lg-4 p-2">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="stock">Stock</label>
                                                <div className="form-control-wrap p-2">
                                                    <input
                                                        type="number"
                                                        name="stock"
                                                        className="form-control"
                                                        id="stock"
                                                        value={formData.stock}
                                                        onChange={handleChange}
                                                        placeholder="enter product stock"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 p-2">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="weight">Weight (LBS)</label>
                                                <div className="form-control-wrap p-2">
                                                    <input
                                                        type="number"
                                                        name="weight"
                                                        className="form-control"
                                                        id="weight"
                                                        value={formData.weight}
                                                        onChange={handleChange}
                                                        placeholder="enter product weight"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex">
                                        <div className="col-lg-6 p-2">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="brand_id">Brand</label>
                                                    <div className="form-control-wrap p-2">
                                                        <select
                                                            name="brand_id"
                                                            className="form-control"
                                                            id="brand_id"
                                                            value={formData.brand_id}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="" disabled>--Select Brands For Product--</option>
                                                            {BrandsData.map(brand => (
                                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {validationErrors.brand_id && <span className="text text-danger">{validationErrors.brand_id}</span>}
                                                </div>
                                            </div>
                                        <div className="col-lg-6 p-2">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="category_id">Category</label>
                                                <div className="form-control-wrap p-2">
                                                    <select
                                                        name="category_id"
                                                        className="form-control"
                                                        id="category_id"
                                                        value={formData.category_id}
                                                        onChange={handleCategoryChange}
                                                    >
                                                        <option value="" disabled>--select category for product--</option>
                                                        {ParentCategories.map(category => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {validationErrors.category_id && <span className="text text-danger">{validationErrors.category_id}</span>}
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <hr />
                                    <div className="d-flex">
                                        <div className="col-lg-6 p-2">
                                            <div className="form-group">
                                                <label className="form-label">Filters</label>
                                                <div className="form-control-wrap p-2">
                                                    {filters && filters.length > 0 ? (
                                                        filters.map(filter => (
                                                            <div key={filter.id} className="mb-3">
                                                                <label className="form-label">{filter.name}</label>
                                                                <select
                                                                    name={`filter_${filter.id}`}
                                                                    className="form-control"
                                                                    value={selectedOptions[filter.id] || ''}
                                                                    onChange={e => handleFilterChange(filter.id, e.target.value)}
                                                                >
                                                                    <option value="" disabled>-- Select {filter.name} --</option>
                                                                    {filter.filter_options&& filter.filter_options.length > 0 ? (
                                                                        filter.filter_options.map(option => (
                                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                                        ))
                                                                    ) : (
                                                                        <option value="" disabled>No options available</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No filters available for the selected category.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                <hr />
                                <div className="d-flex">
                                    <div className="col-lg-12 p-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="images">Product Images</label>
                                            <div className="form-control-wrap p-2">
                                                <input
                                                    type="file"
                                                    id="images"
                                                    name="images"
                                                    accept="image/*"
                                                    className='form-control'
                                                    multiple
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {imagePreviews.length > 0 && (
                                    <div className="row">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="col-lg-2 p-2">
                                                <div className="custom-control custom-radio image-control">
                                                    <input
                                                        type="radio"
                                                        className="custom-control-input"
                                                        id={`imageRadio${index}`}
                                                        checked={selectedThumbnailIndex === index}
                                                        onChange={() => handleThumbnailChange(index)}
                                                        name="previewImage"
                                                        value={index}
                                                    />
                                                    <label className="custom-control-label" htmlFor={`imageRadio${index}`}>
                                                        <img
                                                            src={preview}
                                                            alt={`Preview ${index}`}
                                                            style={{ width: '100%', height: 'auto' }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <hr />
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
                                        <label className="form-label" htmlFor="details">Details</label>
                                        <div className="form-control-wrap p-2">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={formData.details}
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        <button type="submit" className="btn btn-primary">Add Product</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProductsAdd;
