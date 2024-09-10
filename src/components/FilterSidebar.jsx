import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getProductById } from '../api/apiProducts';
import { getCategoryById } from '../api/apiCategories';
import { Brands } from '../api/apiBrands';
import { getFilterByCategory } from '../api/apiFilters';
import { useCategories } from '../contexts/CategoryContext';

// const categories = [
//     { id: 1, name: 'Camping', link: '/' },
//     { id: 2, name: 'Fishing', link: '/' },
//     { id: 3, name: 'Bike shop', link: '/' },
//     { id: 4, name: 'Gun Shop', link: '/' },
//     { id: 5, name: 'Accessories', link: '/' },
//     { id: 6, name: 'Workshop', link: '/' },
// ];

const FilterSidebar = () => {

    const { category } = useParams();

    const { ParentCategories, loading } = useCategories(); 

    const [openBox, setOpenBox] = useState(null); 
    const [products, setProducts] = useState(null); 
    const [categories, setCategories] = useState([]); 
    const [brands, setBrands] = useState([]); 
    const [filters, setFilters] = useState([]); 
    const [priceRange, setPriceRange] = useState([0, 320]); 

    const toggleSidebar = (boxId) => {
        setOpenBox(openBox === boxId ? null : boxId);
    };

    const handleSliderChange = (value) => {
        setPriceRange(value);
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getCategoryById(category);
                setCategories(fetchedProducts?.data?.children)
                setProducts(fetchedProducts); 
            } catch (err) {
                console.log('Failed to fetch products');
            }
        };
        const fetchBrands = async () => {
            try {
                const response = await Brands();
                setBrands(response?.data);
                console.log(response?.data);
            } catch (err) {
                console.log('Failed to fetch products');
            }
        };
        const fetchFilters = async () => {
            try {
                const response = await getFilterByCategory(category);
                setFilters(response?.data);
                console.log(response?.data);
            } catch (err) {
                console.log('Failed to fetch products');
            }
        };

            fetchProducts();
            fetchBrands();
            // fetchFilters();
    }, [category]);
    return (
        <div className="CategorySidebar">
            <div className='sidebar_wrapper'>
                <div className='sidebar_box'>
                    <div 
                        className={`sidebar_header ${openBox === 1 ? 'open' : ''}`} 
                        onClick={() => toggleSidebar(1)} // Attach the toggleSidebar function here
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
                        onClick={() => toggleSidebar(2)} // Attach the toggleSidebar function here
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
                                        <input type="checkbox" name="Campfire"/>
                                        <span className="check_custom">✔</span>{brand.name}
                                    </label>
                                ))
                            )}
                            <label className="form_check">
                                <input type="checkbox" name="Campfire"/>
                                <span className="check_custom">✔</span>Campfire
                            </label>
                            {/* <label className="form_check">
                                <input type="checkbox" name="Companion"/>
                                <span className="check_custom">✔</span> Companion
                            </label> */}
                            {/* <label className="form_check">
                                <input type="checkbox" name="Darche"/>
                                <span className="check_custom">✔</span> Darche
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Everclear"/>
                                <span className="check_custom">✔</span> Everclear
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Igloo"/>
                                <span className="check_custom">✔</span> Igloo
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Nitro"/>
                                <span className="check_custom">✔</span> Nitro
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Outdoor Equipped"/>
                                <span className="check_custom">✔</span> Outdoor Equipped
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="OZtrail"/>
                                <span className="check_custom">✔</span> OZtrail
                            </label> */}
                        </div>
                    </div>
                </div>
                <div className='sidebar_box'>
                    <div 
                        className={`sidebar_header ${openBox === 3 ? 'open' : ''}`} 
                        onClick={() => toggleSidebar(3)} // Attach the toggleSidebar function here
                    >
                        <h5>Range Name</h5>  
                        <i className={`fa-solid ${openBox === 3 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </div>
                    <div className={`sidebar_content ${openBox === 3 ? 'open' : ''}`}>
                       <div className='filter_check_wrapper'>
                            <label className="form_check">
                                <input type="checkbox" name="Acadia"/>
                                <span className="check_custom">✔</span>Acadia
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Celsius"/>
                                <span className="check_custom">✔</span> Celsius
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Cooling Towel"/>
                                <span className="check_custom">✔</span> Cooling Towel
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Drink Cooler"/>
                                <span className="check_custom">✔</span> Drink Cooler
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Drinkware 12oz"/>
                                <span className="check_custom">✔</span> Drinkware 12oz
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Drinkware 20oz"/>
                                <span className="check_custom">✔</span> Drinkware 20oz
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Drinkware 30oz"/>
                                <span className="check_custom">✔</span> Drinkware 30oz
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="Kettle 2.5l"/>
                                <span className="check_custom">✔</span> Kettle 2.5l
                            </label>
                        </div>
                    </div>
                </div>
                <div className='sidebar_box'>
                    <div 
                        className={`sidebar_header ${openBox === 4 ? 'open' : ''}`} 
                        onClick={() => toggleSidebar(4)} // Attach the toggleSidebar function here
                    >
                        <h5>Capacity</h5>  
                        <i className={`fa-solid ${openBox === 4 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </div>
                    <div className={`sidebar_content ${openBox === 4 ? 'open' : ''}`}>
                       <div className='filter_check_wrapper'>
                            <label className="form_check">
                                <input type="checkbox" name="1.5l"/>
                                <span className="check_custom">✔</span>1.5l
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="10oz"/>
                                <span className="check_custom">✔</span> 10oz
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="11.4l"/>
                                <span className="check_custom">✔</span> 11.4l
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="12oz"/>
                                <span className="check_custom">✔</span> 12oz
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="14.5/6A Output"/>
                                <span className="check_custom">✔</span> 14.5/6A Output
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="15.1l"/>
                                <span className="check_custom">✔</span> 15.1l
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="15l"/>
                                <span className="check_custom">✔</span> 15l
                            </label>
                            <label className="form_check">
                                <input type="checkbox" name="18l/2l"/>
                                <span className="check_custom">✔</span> 18l/2l
                            </label>
                        </div>
                        
                    </div>
                </div>
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
                                    max="320"
                                />
                                <button className="apply_button">Apply</button>
                            </div>
                            <div className="slider_wrapper">
                                <Slider
                                    range
                                    min={0}
                                    max={320}
                                    step={1}
                                    value={priceRange}
                                    onChange={handleSliderChange}
                                    trackStyle={[{ backgroundColor: '#65B5AF' }]}
                                    handleStyle={[
                                        { borderColor: '#65B5AF' },
                                        { borderColor: '#65B5AF' }
                                    ]}
                                    railStyle={{ backgroundColor: '#ddd' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
};

export default FilterSidebar;
