import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../AdminLayout';
import { Faqs ,removeFaq } from '../../../../api/apiStorefront';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu, MenuItem, IconButton, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl, Button, Grid, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormSkeleton from '../../../Animation/FormSkeleton';
const FaqsList = () => {
  const [faqsData, setFaqsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFaqId, setSelectedFaqId] = useState(null);

  useEffect(() => {
    const getFaqsData = async () => {
      try {
        const response = await Faqs();
        if (Array.isArray(response.data)) {
            setFaqsData(response.data);
        } else {
            setFaqsData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch faqs:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getFaqsData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredfaqs = faqsData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedFaqId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFaqId(null);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this Faq?')) {
      try {
        await removeFaq(selectedFaqId);
        toast.success('faq removed successfully');
        setFaqsData((prevFaqs) => prevFaqs.filter((faq) => faq.id !== selectedFaqId));
      } catch (error) {
        toast.error('Failed to remove Faq');
      }
    }
    handleClose();
  };

  const columns = [
    {
      name: 'Sno.',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Question',
      selector: (row) => row.question,
      sortable: true,
    },
    // {
    //   name: 'Answer',
    //   selector: (row) => row.answer,
    //   sortable: true,
    // },
    {
        name: 'Category',
        selector: (row) => row.category.category_name, 
        sortable: true,
      },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <IconButton onClick={(event) => handleClick(event, row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedFaqId === row.id}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={`edit/${row.id}`} onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleRemove}>
              Remove
            </MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Faqs</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Grid>
              
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to="add">
                  Add Faq
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

        <div className="card-inner">
          <div className="card card-bordered card-preview">
            <DataTable
              columns={columns}
              data={filteredfaqs}
              progressPending={loading}
              progressComponent={<FormSkeleton />}
              pagination
              highlightOnHover
            />
          </div>
        </div>
    </AdminLayout>
  );
};

export default FaqsList;
