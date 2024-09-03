import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { getServiceById, addService } from '../../../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FormSkeleton from '../../Animation/FormSkeleton';

const ServiceUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        try {
          const response = await getServiceById(id);
          if (response.data) {
            setFormData({
              id: response.data.id,
              name: response.data.name,
              slug: response.data.slug,
            });
          } else {
            toast.error('Failed to fetch service details.');
          }
        } catch (error) {
          toast.error('Failed to fetch service details.');
        }
      }
      setLoading(false);
    };

    fetchService();
  }, [id]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
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
      errors.name = 'Service name is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const form = new FormData();
    form.append('id', formData.id);
    form.append('name', formData.name);
    form.append('slug', formData.slug);

    setLoading(true); // Start loading when form is submitted
    try {
      const response = await addService(form);
      if (response && response.message) {
        toast.success(response.message);
        navigate('/admin-dashboard/services'); // Redirect after success
      } else {
        toast.error('Failed to update service.');
      }
    } catch (err) {
      toast.error(err.message || 'Error updating service');
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="md">
        {loading ? (
          <FormSkeleton />
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Service Details
              </Typography>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={formData.id} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Service Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!validationErrors.name}
                      helperText={validationErrors.name}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  {/* Slug field is hidden */}
                  <input type="hidden" name="slug" value={formData.slug} />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  style={{ marginTop: '16px' }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Updating...' : 'Update Service'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </Container>
      <ToastContainer />
    </AdminLayout>
  );
};

export default ServiceUpdate;
