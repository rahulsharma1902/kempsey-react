import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, IconButton, Typography, Grid, Collapse } from '@mui/material';
import { Upload, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';
import AdminLayout from '../AdminLayout';
import { fetchCarousels, saveCarousels } from '../../../api/apiCarousel';
import FormSkeleton from '../../Animation/FormSkeleton';
import { toast } from 'react-toastify';

const HomePageCarousel = () => {
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCarousels = async () => {
      try {
        const response = await fetchCarousels();
        const fetchedItems = response.data.map(item => ({
          ...item,
          id: String(item.id),
          image_file: null // Initialize image_file to handle new uploads
        }));
        setItems(fetchedItems);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching carousels:', error);
      }
    };

    loadCarousels();
  }, []);

  const handleInputChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  const handleImageUpload = (index, event) => {
    const newItems = [...items];
    newItems[index].image_file = event.target.files[0]; // Store the file instead of URL
    newItems[index].image = URL.createObjectURL(event.target.files[0]); // For preview
    setItems(newItems);
  };

  const addNewCarouselItem = () => {
    setItems([
      ...items,
      { id: `item-${items.length + 1}`, heading: '', sub_heading: '', text: '', button_text: '', button_link: '', image: '', image_file: null, position: items.length }
    ]);
  };

  const removeCarouselItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const validateItems = () => {
    const newErrors = {};
    items.forEach((item, index) => {
      if (!item.heading) {
        newErrors[`heading-${index}`] = 'Heading is required.';
      }
      if (!item.image && !item.image_file) {
        newErrors[`image-${index}`] = 'Image is required.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateItems()) {
      return;
    }
    setLoading(true);

    const formData = new FormData();
    
    items.forEach((item, index) => {
      formData.append(`items[${index}][id]`, item.id);
      formData.append(`items[${index}][heading]`, item.heading);
      formData.append(`items[${index}][sub_heading]`, item.sub_heading || '');
      formData.append(`items[${index}][text]`, item.text || '');
      formData.append(`items[${index}][button_text]`, item.button_text || '');
      formData.append(`items[${index}][button_link]`, item.button_link || '');
      formData.append(`items[${index}][position]`, item.position);

      if (item.image_file) {
        formData.append(`items[${index}][image]`, item.image_file);
      } else {
        formData.append(`items[${index}][image_url]`, item.image);
      }
    });

    try {
      const response  = await saveCarousels(formData);
      console.warn(response.items)
      setItems(response.items)
      toast.success(response.message);
      setLoading(false);

    } catch (error) {
      console.error('Error saving carousels:', error);
      toast.error(error.message || 'Error adding carousel');
      setLoading(false);

    }
  };

  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <AdminLayout>
      {loading ? (
                        <FormSkeleton />
                ) : (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Home Page Carousel
        </Typography>
        <Box>
          {items.map((item, index) => (
            <Box
              key={item.id}
              sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: 2, background: '#f9f9f9' }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => toggleExpand(index)}
                sx={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #ddd' }}
              >
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                  Slide {index + 1}: {item.heading || 'No Heading'}
                </Typography>
                <IconButton onClick={() => removeCarouselItem(index)} color="#f9f9f9" sx={{ marginLeft: 1 }}>
                  <Delete />
                </IconButton>
                {expanded[index] ? <ExpandLess /> : <ExpandMore />}
              </Box>
              <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                <Grid container spacing={2} alignItems="center" sx={{ padding: 2 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Heading"
                      name="heading"
                      value={item.heading}
                      onChange={(event) => handleInputChange(index, event)}
                      fullWidth
                      error={!!errors[`heading-${index}`]}
                      // helperText={errors[`heading-${index}`]}
                      sx={{ marginBottom: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Sub Heading"
                      name="sub_heading"
                      value={item.sub_heading || ''}
                      onChange={(event) => handleInputChange(index, event)}
                      fullWidth
                      sx={{ marginBottom: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Text"
                      name="text"
                      value={item.text}
                      onChange={(event) => handleInputChange(index, event)}
                      fullWidth
                      sx={{ marginBottom: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      label="Button Text"
                      name="button_text"
                      value={item.button_text}
                      onChange={(event) => handleInputChange(index, event)}
                      fullWidth
                      sx={{ marginBottom: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      label="Link"
                      name="button_link"
                      value={item.button_link}
                      onChange={(event) => handleInputChange(index, event)}
                      fullWidth
                      sx={{ marginBottom: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <IconButton component="label">
                      <Upload />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => handleImageUpload(index, event)}
                      />
                    </IconButton>
                    {item.image && !item.image_file && (
                      <Box component="img" src={item.image} alt={item.altText || "Carousel"} sx={{ maxWidth: '100%', height: 'auto', mt: 2 }} />
                    )}
                    {item.image_file && (
                      <Box component="img" src={URL.createObjectURL(item.image_file)} alt={item.altText || "Carousel"} sx={{ maxWidth: '100%', height: 'auto', mt: 2 }} />
                    )}
                    {errors[`image-${index}`] && (
                      <Typography color="error" sx={{ mt: 1 }}>
                        {errors[`image-${index}`]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Collapse>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="warning" onClick={addNewCarouselItem}>
            Add New Carousel Item
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Save Your Carousel
          </Button>
        </Box>
      </Box>
                )}
    </AdminLayout>
  );
};

export default HomePageCarousel;
