import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import AdminLayout from '../../AdminLayout';
import { parentCategories,removeCategory } from '../../../../api/apiCategories';
import ChildCategoriesList from './ChildCategoriesList';

const CategoriesList = () => {
  const [ParentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getParentCategory = async () => {
      try {
        const response = await parentCategories();
        if (Array.isArray(response.data)) {
          setParentCategories(response.data);
        } else {
          setParentCategories([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Parent Categories:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getParentCategory();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = ParentCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };
  const handleRemoveCategory = async (id) => {
    if (window.confirm('Are you sure you want to remove this category?')) {
        try {
            await removeCategory(id);
            // toast.success('Category removed successfully');
            setParentCategories(prevCategories => prevCategories.filter(category => category.id !== id));
        } catch (error) {
            // toast.error('Failed to remove category');
        }
    }
};

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="nk-block nk-block-lg">
        <div className="nk-block-head nk-block-head-sm">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h3 className="nk-block-title page-title">Categories</h3>
            </div>
            <div className="nk-block-head-content">
              <div className="toggle-wrap nk-block-tools-toggle">
                <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu">
                  <em className="icon ni ni-more-v"></em>
                </a>
                <div className="toggle-expand-content" data-content="pageMenu">
                  <ul className="nk-block-tools g-3">
                  
                    <li className="nk-block-tools-opt">
                    <Link to={`add`}  className="btn btn-dark d-none d-md-inline-flex">
                        <em className="icon ni ni-plus"></em>
                        <span>Add Category</span>
                       </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-bordered card-preview border-dark">
          <div className="card-inner">
            <div className="search-bar my-4">
              <input
                type="text"
                className="form-control border-dark"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <h4>Parent Categories</h4>
            <div className="card card-bordered card-preview">
              <table className="table datatable-init nowrap nk-tb-list nk-tb-ulist" data-auto-responsive="false">
                <thead className='table-dark'>
                  <tr className="nk-tb-item nk-tb-head">
                    <th className="nk-tb-col">Sno.</th>
                    <th className="nk-tb-col"><span className="sub-text">NAME</span></th>
                    <th className="nk-tb-col"><span className="sub-text">SLUG</span></th>
                    <th className="nk-tb-col tb-col-lg"><span className="sub-text">VISIBILITY</span></th>
                    <th className="nk-tb-col tb-tnx-action"><span>ACTION</span></th>
                  </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((category, index) => (
                    <tr className="nk-tb-item" key={category.id}>
                      <td className="nk-tb-col">
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">{indexOfFirstItem + index + 1}</span>
                          </div>
                        </div>
                      </td>
                      <td className="nk-tb-col">
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">{category.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="nk-tb-col tb-col-mb">
                        <span className="tb-amount">{category.slug}</span>
                      </td>
                      <td className="nk-tb-col tb-col-md p-3">
                      <span className={`badge ${category.visibility === 'enabled' ? 'bg-success' : 'bg-warning'}`}>
                          {category.visibility}
                      </span>

                      </td>
                      <td className="nk-tb-col nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li>
                            <div className="dropdown">
                              <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
                                <em className="icon ni ni-more-h"></em>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <Link to={`edit/${category.id}`} className="dropdown-item">
                                      <em className="icon ni ni-eye"></em>
                                      <span>Edit</span>
                                    </Link>
                                  </li>
                                  <li>
                                      <a className="delete dropdown-item" onClick={() => handleRemoveCategory(category.id)}>
                                          <em className="icon ni ni-trash-fill"></em>
                                          <span>Remove</span>
                                      </a>
                                  </li>

                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))
                  
                ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No categories found.
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
              <nav className='border-top'>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" aria-label="Prev" onClick={handlePrevPage}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {[...Array(totalPages).keys()].map(number => (
                    <li
                      key={number}
                      className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                    >
                      <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </a>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" aria-label="Next" onClick={handleNextPage}>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <ChildCategoriesList />
      </div>
    </AdminLayout>
  );
};

export default CategoriesList;
