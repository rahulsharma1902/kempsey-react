import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getProductByCategory } from '../../../api/apiProducts';
import { getCategoryById } from '../../../api/apiCategories';
import { Brands } from '../../../api/apiBrands';
import { getFilterByCategory } from '../../../api/apiFilters';
import { useCategories } from '../../../contexts/CategoryContext';
import { useProductContext } from '../../../contexts/ShopContext'; // Import the context hook

const FilterSidebar = () => {
    const { category } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});

    const { ParentCategories, loading } = useCategories(); 
    const { updateProducts } = useProductContext(); // Destructure updateProducts

    const [openBox, setOpenBox] = useState(null); 
    const [categories, setCategories] = useState([]); 
    const [products, setProducts] = useState([]); 
    const [allProducts, setAllProducts] = useState([]); 
    const [brands, setBrands] = useState([]); 
    const [filters, setFilters] = useState([]); 
    const [priceRange, setPriceRange] = useState([0, 320]); 

    const toggleSidebar = (boxId) => {
        setOpenBox(openBox === boxId ? null : boxId);
    };

 

    const fetchData = async () => {
        try {
            const [categoriesResponse, brandsResponse, filtersResponse] = await Promise.all([
                getCategoryById(category),
                Brands(),
                getFilterByCategory(category),
            ]);
            
            setCategories(categoriesResponse?.data?.children || []);
            setBrands(brandsResponse?.data || []);
            setFilters(filtersResponse?.data || []);
        } catch (err) {
            console.log('Failed to fetch data', err);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [category]);
    
    useEffect(() => {
        const getProductData = async () => {
            try {
                const response = await getProductByCategory(category);
                if (response.data && Array.isArray(response.data)) {
                    setAllProducts(response.data);
                    ProductFilterCng(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error.message);
            }
        };
      
        getProductData();
    }, [category]);
    const handleSliderChange = (value) => {
        updateURL('price', value);
        setPriceRange(value);
        
    };
    const handleBrandChange = (brand) => {
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((b) => b !== brand)
            : [...selectedBrands, brand];

        setSelectedBrands(updatedBrands);
        updateURL('brands', updatedBrands);
    };

    const handleFilterChange = (filterId, optionId) => {
        const updatedFilters = { ...selectedFilters };
        
        if (!updatedFilters[filterId]) {
            updatedFilters[filterId] = [optionId];
        } else if (updatedFilters[filterId].includes(optionId)) {
            updatedFilters[filterId] = updatedFilters[filterId].filter((o) => o !== optionId);
        } else {
            updatedFilters[filterId].push(optionId);
        }

        setSelectedFilters(updatedFilters);
        updateURL(filterId, updatedFilters[filterId]);
    };

    const updateURL = (filterName, filterValues) => {
        const searchParams = new URLSearchParams(location.search);
        if (Array.isArray(filterValues) && filterValues.length > 0) {
            searchParams.set(filterName, filterValues.join(','));
        } else {
            searchParams.delete(filterName);
        }

        navigate(`?${searchParams.toString()}`);
    };

    const ProductFilterCng = (products) => {
        const searchParams = new URLSearchParams(location.search);
        const brandsParam = searchParams.get('brands');
        const priceParam = searchParams.get('price');
        let filteredProducts = products;
    
        // Filter by brands
        if (brandsParam) {
            const selectedBrandIds = brandsParam.split(',').map(Number);
            filteredProducts = filteredProducts.filter(product => selectedBrandIds.includes(Number(product.brand_id)));
        }
    
        // Filter by price range
        if (priceParam) {
            console.log('cng,,,');
            const [minPrice, maxPrice] = priceParam.split(',').map(Number);
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
        }
    
        const filterValuesByFilter = Object.keys(selectedFilters).reduce((acc, filterId) => {
            const filterValues = selectedFilters[filterId].map(String);
            if (filterValues.length > 0) { 
                acc[filterId] = filterValues;
            }
            return acc;
        }, {});
    
        const hasFilters = Object.keys(filterValuesByFilter).length > 0;
    
        if (hasFilters) {
            filteredProducts = filteredProducts.filter(product => {
                let productFilterOptions = [];
    
                try {
                    const option = JSON.parse(product.selected_filters_options) || [];
                    const optionTo = JSON.parse(option) || [];
    
                    if (Array.isArray(optionTo)) {
                        productFilterOptions = optionTo.map(String); 
                    } else if (typeof optionTo === 'object' && optionTo !== null) {
                        productFilterOptions = Object.values(optionTo).flat().map(String); 
                    } else {
                        console.warn('Unexpected format for filter options:', optionTo);
                        return false; 
                    }
                } catch (e) {
                    console.warn('Invalid JSON format for filter options:', product.selected_filters_options);
                    return false;
                }
                console.warn('productFilterOptions:', productFilterOptions);
    
                return Object.keys(filterValuesByFilter).every(filterId => {
                    const selectedValues = filterValuesByFilter[filterId];
                    return selectedValues.some(value => productFilterOptions.includes(value));
                });
            });
        }
    
        setProducts(filteredProducts);
        updateProducts(filteredProducts);
    };
    
    
    
    
    
    
    
    

    useEffect(() => {
        ProductFilterCng(allProducts);
    }, [selectedBrands, selectedFilters, priceRange]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const brandsParam = searchParams.get('brands');
        if (brandsParam) {
            setSelectedBrands(brandsParam.split(',').map(Number));
        }

        const priceParam = searchParams.get('price');
        if (priceParam) {
            setPriceRange(priceParam.split(',').map(Number));
        }
        
        filters.forEach((filter) => {
            const filterParam = searchParams.get(filter.id);
            if (filterParam) {
                setSelectedFilters((prevFilters) => ({
                    ...prevFilters,
                    [filter.id]: filterParam.split(',').map(Number),
                }));
            }
        });
    }, [location.search, filters]);

    return (
        <div className="CategorySidebar">
            <div className='sidebar_wrapper'>
                <div className='sidebar_box'>
                    <div 
                        className={`sidebar_header ${openBox === 1 ? 'open' : ''}`} 
                        onClick={() => toggleSidebar(1)} 
                    >
                        <h5>Filter by Categories</h5>  
                        <i className={`fa-solid ${openBox === 1 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </div>
                    <div className={`sidebar_content ${openBox === 1 ? 'open' : ''}`}>
                        <ul className="categories">
                            {categories.length === 0 ? (
                                <li>No category found here</li>
                            ) : (
                                categories.map((category) => (
                                    <li key={category.id}>
                                        <Link to={`/shop/${category.slug}`} className="dwn_arw">
                                            {category.name} 
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className='sidebar_box'>
                    <div 
                        className={`sidebar_header ${openBox === 2 ? 'open' : ''}`} 
                        onClick={() => toggleSidebar(2)} 
                    >
                        <h5>Brand</h5>  
                        <i className={`fa-solid ${openBox === 2 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </div>
                    <div className={`sidebar_content ${openBox === 2 ? 'open' : ''}`}>
                        <div className='filter_check_wrapper'>
                            {brands.length === 0 ? (
                                <li>No Brand found here</li>
                            ) : (
                                brands.map((brand) => (
                                    <label className="form_check" key={brand.id}>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedBrands.includes(brand.id)}
                                            onChange={() => handleBrandChange(brand.id)}
                                        />
                                        <span className="check_custom">✔</span>{brand.name}
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {filters.map((filter) => (
                    <div key={filter.id} className="sidebar_box">
                        <div
                            className={`sidebar_header ${openBox === filter.id ? 'open' : ''}`}
                            onClick={() => toggleSidebar(filter.id)}
                        >
                            <h5>{filter.name}</h5>
                            <i
                                className={`fa-solid ${
                                    openBox === filter.id ? 'fa-chevron-down' : 'fa-chevron-right'
                                }`}
                            ></i>
                        </div>
                        <div className={`sidebar_content ${openBox === filter.id ? 'open' : ''}`}>
                            <div className="filter_check_wrapper">
                                {filter.filter_options.length > 0 ? (
                                    filter.filter_options.map((option) => (
                                        <label className="form_check" key={option.id}>
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters[filter.id]?.includes(option.id)}
                                                onChange={() => handleFilterChange(filter.id, option.id)}
                                            />
                                            <span className="check_custom">✔</span>{option.name}
                                        </label>
                                    ))
                                ) : (
                                    <li>No filters found here</li>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
               <div className='sidebar_box'>
                    <div 
                        className={`sidebar_header ${openBox === 5 ? 'open' : ''}`} 
                        onClick={() => toggleSidebar(5)}
                    >
                        <h5>Price</h5>  
                        <i className={`fa-solid ${openBox === 5 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </div>
                    <div className={`sidebar_content ${openBox === 5 ? 'open' : ''}`}>
                        <div className='price_filter'>
                            <div className="price_inputs">
                                <input 
                                    type="number" 
                                    value={priceRange[0]} 
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    min="0"
                                    max={priceRange[1]}
                                />
                                <input 
                                    type="number" 
                                    value={priceRange[1]} 
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    min={priceRange[0]}
                                    max="1000"
                                />
                            </div>
                            <Slider 
                                range 
                                min={0} 
                                max={1000} 
                                value={priceRange} 
                                onChange={handleSliderChange}
                                allowCross={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
