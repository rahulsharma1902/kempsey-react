import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdminLayout from '../AdminLayout';
import DataTable from 'react-data-table-component';
import { Orders, completeBooking ,removeBooking } from '../../../api/apiOrders';
import FormSkeleton from '../../Animation/FormSkeleton';

const BrandsList = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // Status filter state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await Orders();
        console.log(response);
        if (Array.isArray(response.data)) {
          setOrderData(response.data);
        } else {
          setOrderData([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Orders:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getOrderData();
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleStatusFilterChange = (event) => setStatusFilter(event.target.value);

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedBrandId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBrandId(null);
  };

  const handleRemoveBooking = async () => {
    if (window.confirm('Are you sure you want to remove this order ?')) {
      try {
        await removeBooking(selectedBrandId);
        // setOrderData(prevData => prevData.map(order => 
        //   order.id === selectedBrandId ? { ...order, status: true } : order
        // ));
        toast.success('Booking removed successfully');
        setOrderData((prevData) => prevData.filter((order) => order.id !== selectedBrandId));
      } catch (error) {
        toast.error('Failed to remove order as done');
      }
    }
    handleCloseMenu();
  };
  const handlePrintInvoice = async () => {
    console.log('Printing Invoice..');
  }
    
  const handleStatusChange = (event, row) => {
    const newStatus = event.target.value;
  
    // Call the API to update the status in the database
    updateOrderStatus(row.id, newStatus)
      .then((response) => {
        // Handle successful status update
        console.log("Order status updated:", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating order status:", error);
      });
  };
  const updateOrderStatus = async (orderId, status) => {
    console.log(status);
    // try {
    //   const response = await axios.put(`/api/orders/${orderId}/status`, { status });
    //   return response.data;
    // } catch (error) {
    //   throw error;
    // }
  };
    

  // Filter the orders based on searchTerm and statusFilter
  const filteredOrders = orderData
    .filter((order) => 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || (statusFilter === 'done' && order.status) || (statusFilter === 'pending' && !order.status))
    );

    const ExpandableRowComponent = ({ data }) => {
        const orderMeta = data?.data?.order_meta || [];
        const relatedServices = data?.data?.related_services_with_types || [];
        const shippingAddress = data?.data?.shipping_address || {};
        const billingAddress = data?.data?.billing_address || {};
        const user = data?.data?.user || {};
    
        const orderMetaArray = Array.isArray(orderMeta) ? orderMeta : [];
    
        if (orderMetaArray.length === 0) {
            return <Typography>No data available</Typography>;
        }
    
        // Calculate totals
        const subtotal = orderMetaArray.reduce((sum, meta) => sum + (meta.product?.price || 0) * (meta.qty || 0), 0);
        const shipping = orderMetaArray.reduce((sum, meta) => sum + (meta.shipping_price || 0), 0);
        const tax = 0; // Assuming tax is not provided
        const grandTotal = subtotal + shipping + tax;
    
        // Ensure values are numbers for toFixed
        const formattedSubtotal = parseFloat(subtotal).toFixed(2);
        const formattedShipping = parseFloat(shipping).toFixed(2);
        const formattedTax = parseFloat(tax).toFixed(2);
        const formattedGrandTotal = parseFloat(grandTotal).toFixed(2);
    
        return (
                <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    gap: 2,
                    // justifyContent: 'center',
                    // alignItems: 'center', 
                    padding: 2,
                }}
                >    
                {/* Billing Address */}
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>Billing Address</Typography>
                    <Typography variant="body2">
                        <strong>Country:</strong> {billingAddress.country || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>State:</strong> {billingAddress.state || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>City:</strong> {billingAddress.city || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Address:</strong> {billingAddress.address || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Postal Code:</strong> {billingAddress.zip_code || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>First Name:</strong> {shippingAddress.first_name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Last Name:</strong> {shippingAddress.last_name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Email:</strong> {shippingAddress.email || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Phone:</strong> {shippingAddress.phone_number || 'N/A'}
                    </Typography>
                </Box>
    
                {/* Shipping Address */}
                
                <Box sx={{ marginBottom: 2 }}>
                    
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>Shipping Address</Typography>
                    <Typography variant="body2">
                        <strong>Country:</strong> {shippingAddress.country || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>State:</strong> {billingAddress.state || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>City:</strong> {shippingAddress.city || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Address:</strong> {shippingAddress.address || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Postal Code:</strong> {shippingAddress.zip_code || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>First Name:</strong> {shippingAddress.first_name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Last Name:</strong> {shippingAddress.last_name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Email:</strong> {shippingAddress.email || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Phone:</strong> {shippingAddress.phone_number || 'N/A'}
                    </Typography>

                </Box>
    
                {/* User Details */}
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>User Details</Typography>
                    <Typography variant="body2">
                        <strong>First Name:</strong> {user.first_name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Last Name:</strong> {user.last_name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Email:</strong> {user.email || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Phone:</strong> {user.phone || 'N/A'}
                    </Typography>
                </Box>

                {/* Payment Details */}
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>Payment Details</Typography>

                  {/* Payment Method */}
                  <Typography variant="body2">
                      <strong>Payment Method:</strong> {data?.data?.payment_method ?? 'N/A'}
                  </Typography>

                  {/* Transaction ID */}
                  <Typography variant="body2">
                      <strong>Transaction Id:</strong> 
                      {data?.data?.payment?.transaction_id ? (
                          <a 
                              href={`https://dashboard.stripe.com/payments/${data.data.payment.transaction_id}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ textDecoration: 'none', color: '#1e88e5' }}
                          >
                              {data.data.payment.transaction_id}
                          </a>
                      ) : 'N/A'}
                  </Typography>

                  {/* Payment Status */}
                  <Typography variant="body2">
                      <strong>Status:</strong> {data?.data?.payment?.payment_status || 'N/A'}
                  </Typography>

                  {/* Payment Amount */}
                  <Typography variant="body2">
                      <strong>Amount:</strong> ${data?.data?.payment?.amount || 'N/A'}
                  </Typography>

                  {/* Payment Date */}
                  <Typography variant="body2">
                      <strong>Payment Date:</strong> {new Date(data?.data?.payment?.created_at).toLocaleDateString() || 'N/A'}
                  </Typography>
              </Box>

    
                {/* Order Summary  https://dashboard.stripe.com/payments/pi_3PzsJvGeymDHJcry1pX5EYYT*/} 
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>Order Summary</Typography>

                    <Box sx={{ marginBottom: 2 }}>
                        {orderMetaArray.map((meta) => (
                            <Box key={meta.id} sx={{ marginBottom: 2 }}>
                                <Typography variant="body2">
                                    {meta.qty} x {meta.product?.name || 'No product name'}
                                </Typography>
                                <Typography variant="body2">
                                    ${meta.product?.price ?? 'No price'} each
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="body2">
                            <strong>Subtotal:</strong> ${formattedSubtotal}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Shipping:</strong> ${formattedShipping}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Tax:</strong> ${formattedTax}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                            <strong>GRAND TOTAL:</strong> ${formattedGrandTotal}
                        </Typography>
                    </Box>
                </Box>
    
            </Box>
        );
    };
    
    

  const columns = [
    {
      name: 'Order Number',
      selector: (row) => row?.order_number,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => `${row?.user?.first_name} ${row?.user?.last_name}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row?.user?.email,
      sortable: true,
    },

    {
      name: 'Without Shipping/Coupon',
      selector: (row) => row?.price ?? '0.00',
      sortable: true,
    },
    {
      name: 'Order Amount',
      selector: (row) => row?.total_price,
      sortable: true,
    },
    {
      name: 'Payemnt Status',
      selector: (row) => row?.order_status,
      sortable: true,
    },
    // {
    //   name: 'Status',
    //   cell: (row) => (
    //     <FormControl fullWidth variant="outlined">
    //       <Select
    //         value={row?.order_status || 'pending'} // Ensure a default value
    //         onChange={(e) => handleStatusChange(e, row)}
    //         inputProps={{ 'aria-label': 'Order Status' }}
    //       >
    //         <MenuItem value="pending">Pending</MenuItem>
    //         <MenuItem value="shipped">Shipped</MenuItem>
    //         <MenuItem value="completed">Completed</MenuItem>
    //         <MenuItem value="awaiting_payment">Awaiting Payment</MenuItem>
    //         <MenuItem value="awaiting_pickup">Awaiting Pickup</MenuItem>
    //       </Select>
    //     </FormControl>
    //   ),
    //   sortable: true,
    // },
      
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <IconButton onClick={(event) => handleMenuClick(event, row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedBrandId === row.id}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handlePrintInvoice}>Print Invoice</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1, mb: 3,mt:3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Service Orders</Typography>
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
              <Grid item >
                <FormControl variant="outlined" size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    label="Status"
                  >
                    <SelectMenuItem value="all">All</SelectMenuItem>
                    <SelectMenuItem value="done">Done</SelectMenuItem>
                    <SelectMenuItem value="pending">Pending</SelectMenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <div className="card-inner">
        <div className="card card-bordered card-preview">
          <DataTable
            columns={columns}
            data={filteredOrders}
            progressPending={loading}
            progressComponent={<FormSkeleton />}
            pagination
            highlightOnHover
            expandableRows
            expandableRowsComponent={(row) => <ExpandableRowComponent data={row} />}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default BrandsList;
