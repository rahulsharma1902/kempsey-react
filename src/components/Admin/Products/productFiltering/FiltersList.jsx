import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import AdminLayout from '../../AdminLayout';
import { Filters,removeFilter } from '../../../../api/apiFilters';
import { toast } from 'react-toastify';

const FiltersList = () => {
  const [FiltersData, setFiltersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getFiltersData = async () => {
      try {
        const response = await Filters();
        if (Array.isArray(response.data)) {
            setFiltersData(response.data);
        } else {
            setFiltersData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Filters:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getFiltersData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = FiltersData.filter((filters) =>
  filters.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  const handleRemoveFilter = async (id) => {
    if (window.confirm('Are you sure you want to remove this filter?')) {
        try {
            await removeFilter(id);
            toast.success('filter removed successfully');
            setFiltersData(prevFilters => prevFilters.filter(filter => filter.id !== id));
        } catch (error) {
            toast.error('Failed to remove filter');
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
              <h3 className="nk-block-title page-title">Filters</h3>
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
                        <span>Add Filters</span>
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
                placeholder="Search Filter Name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <h4>Filters</h4>
            <div className="card card-bordered card-preview">
              <table className="table datatable-init nowrap nk-tb-list nk-tb-ulist" data-auto-responsive="false">
                <thead className='table-dark'>
                  <tr className="nk-tb-item nk-tb-head">
                    <th className="nk-tb-col">Sno.</th>
                    <th className="nk-tb-col"><span className="sub-text">NAME</span></th>
                    <th className="nk-tb-col"><span className="sub-text">SLUG</span></th>
                    <th className="nk-tb-col"><span className="sub-text">CATEGORY</span></th>
                    <th className="nk-tb-col"><span className="sub-text">TOTAL OPTIONS</span></th>
                    <th className="nk-tb-col tb-tnx-action"><span>ACTION</span></th>
                  </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((filter, index) => (
                    <tr className="nk-tb-item" key={filter.id}>
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
                            <span className="tb-lead">{filter.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="nk-tb-col tb-col-mb">
                        <span className="tb-amount">{filter.slug}</span>
                      </td>
                      <td className="nk-tb-col tb-col-mb">
                        <span className="tb-amount">{filter.categorie.name}</span>
                      </td>
                      <td className="nk-tb-col tb-col-mb">
                        <span
                            className="d-inline-block"
                            tabindex="0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={filter.filter_options.map(option => option.name).join(', ')}
                        >
                            <button className="btn btn-dark" type="button" disabled="">
                                {filter.filter_options.length}
                            </button>
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
                                    <Link to={`edit/${filter.id}`} className="dropdown-item">
                                      <em className="icon ni ni-eye"></em>
                                      <span>Edit</span>
                                    </Link>
                                  </li>
                                  <li>
                                      <a className="delete dropdown-item" onClick={() => handleRemoveFilter(filter.id)}>
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
                        No filter found.
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
      </div>
    </AdminLayout>
  );
};

export default FiltersList;
