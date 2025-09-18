import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const History = () => {
  const { historyData, setHistoryData, error, setError, refreshOrders } = useContext(DataContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    delivery_date: "",
    delivery_time: "",
    delivery_address: "",
    orderItemsData: [] // Ensure this is included
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/orders`
        );
        
        // Ensure we have valid data structure
        const orders = response.data?.orders || [];
        
        // Validate and sanitize each order
        const sanitizedOrders = orders.map(order => ({
          ...order,
          total_cost: order.total_cost || 0,
          orderItems: Array.isArray(order.orderItems) ? order.orderItems : [],
          order_date: order.order_date || new Date().toISOString(),
          delivery_date: order.delivery_date || '',
          delivery_time: order.delivery_time || '',
          delivery_address: order.delivery_address || ''
        }));
        
        setHistoryData({ orders: sanitizedOrders });
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch orders');
        setHistoryData({ orders: [] }); // Set empty array to prevent crashes
      }
    };

    fetchOrders();
  }, [refreshOrders, setError, setHistoryData]);

  if (error) return <div>Error: {error}</div>;
  if (!historyData?.orders || !Array.isArray(historyData.orders))
    return <div>No orders available</div>;

  const handleUpdateOrder = async (orderId) => {
    try {
        // Find the current order to preserve its other properties
        const currentOrder = historyData.orders.find((order) => order.order_id === orderId);
        console.log("this is after finding order byID" ,currentOrder)
        if (!currentOrder) {
            throw new Error("Order not found");
        }

        // Combine the updated fields with the existing order data
        const updatedOrderData = {
            ...currentOrder, 
            delivery_date: updateForm.delivery_date.toString().split("T")[0],
            delivery_time: updateForm.delivery_time,
            delivery_address: updateForm.delivery_address,
        };
         console.log("this is updated one",updatedOrderData);

        const updateResponse = await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/orders/update/${orderId}`,
            updatedOrderData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        if (updateResponse.status === 200) {
            // Update the local state with the updated order
            setHistoryData((prevData) => ({
                ...prevData,
                orders: prevData.orders.map((order) =>
                    order.order_id === orderId ? { ...order, ...updatedOrderData } : order
                ),
            }));
            alert("Order updated successfully!");
            setShowUpdateModal(false); // Close the modal
        }
    } catch (error) {
        console.error("Update Error:", error);
        alert("Failed to update order. Please try again.");
    }
};



  const handleRemoveOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/orders/delete/${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setHistoryData((prevData) => ({
            ...prevData,
            orders: prevData.orders.filter(
              (order) => order.order_id !== orderId
            ),
          }));
        } else {
          throw new Error("Failed to delete order");
        }
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete order. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="section-title">
            <i className="bi bi-clock-history me-3"></i>Order History
          </h2>
          <p className="text-center text-muted">View and manage your previous orders</p>
        </div>
      </div>

      {historyData.orders.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-receipt display-1 text-muted"></i>
          <h3 className="mt-3 text-muted">No orders yet</h3>
          <p className="text-muted">Start ordering to see your history here!</p>
          <a href="/menu" className="btn btn-primary-modern btn-modern">
            <i className="bi bi-shop me-2"></i>Browse Menu
          </a>
        </div>
      ) : (
        <div className="row">
          {historyData.orders.map((order) => (
            <div key={order.order_id} className="col-lg-6 col-xl-4 mb-4">
              <div className="card card-modern h-100">
                <div className="card-header bg-gradient-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">
                      <i className="bi bi-receipt me-2"></i>
                      Order #{order.order_id}
                    </h6>
                    <span className="badge bg-light text-dark">
                      ${order.total_cost ? Number(order.total_cost).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
                
                <div className="card-body card-body-modern">
                  <div className="mb-3">
                    <small className="text-muted d-flex align-items-center">
                      <i className="bi bi-calendar me-1"></i>
                      Ordered: {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}
                    </small>
                  </div>
                  
                  <div className="delivery-details mb-3 p-3 bg-light rounded">
                    <h6 className="fw-bold mb-2">
                      <i className="bi bi-truck me-2 text-primary"></i>Delivery Details
                    </h6>
                    <div className="small">
                      <div className="mb-1">
                        <i className="bi bi-calendar-event me-1"></i>
                        <strong>Date:</strong> {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="mb-1">
                        <i className="bi bi-clock me-1"></i>
                        <strong>Time:</strong> {order.delivery_time || 'N/A'}
                      </div>
                      <div>
                        <i className="bi bi-geo-alt me-1"></i>
                        <strong>Address:</strong> {order.delivery_address || 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-items mb-3">
                    <h6 className="fw-bold mb-2">
                      <i className="bi bi-bag me-2 text-success"></i>Items Ordered
                    </h6>
                    {order.orderItems && Array.isArray(order.orderItems) ? (
                      <div className="list-group list-group-flush">
                        {order.orderItems.map((item) => (
                          <div key={item.order_item_id} className="list-group-item bg-transparent p-2 border-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <span className="fw-medium">{item.product_name}</span>
                                <br />
                                <small className="text-muted">
                                  ${item.price_per_unit ? Number(item.price_per_unit).toFixed(2) : '0.00'} each
                                </small>
                              </div>
                              <div className="text-end">
                                <span className="badge bg-primary">{item.quantity}x</span>
                                <br />
                                <small className="fw-bold">
                                  ${(item.quantity * (item.price_per_unit || 0)).toFixed(2)}
                                </small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted small">No items found</p>
                    )}
                  </div>
                </div>
                
                <div className="card-footer bg-transparent">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm flex-fill"
                      onClick={() => {
                        setSelectedOrder(order.order_id);
                        setUpdateForm({
                          delivery_date: order.delivery_date,
                          delivery_time: order.delivery_time,
                          delivery_address: order.delivery_address,
                          orderItemsData: order.orderItems
                        });
                        setShowUpdateModal(true);
                      }}
                    >
                      <i className="bi bi-pencil me-1"></i> Update
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm flex-fill"
                      onClick={() => handleRemoveOrder(order.order_id)}
                    >
                      <i className="bi bi-trash me-1"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Update Modal */}
      {showUpdateModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-gradient-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-pencil-square me-2"></i>Update Order #{selectedOrder}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowUpdateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form className="form-modern">
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="bi bi-calendar-event me-1"></i>Delivery Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={updateForm.delivery_date}
                      onChange={(e) => setUpdateForm({ ...updateForm, delivery_date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="bi bi-clock me-1"></i>Delivery Time
                    </label>
                    <select
                      className="form-select"
                      value={updateForm.delivery_time}
                      onChange={(e) => setUpdateForm({ ...updateForm, delivery_time: e.target.value })}
                    >
                      <option value="">Select Time</option>
                      {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                        <option key={hour} value={`${hour}:00`}>
                          {hour > 12 ? `${hour-12}:00 PM` : hour === 12 ? `12:00 PM` : `${hour}:00 AM`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="bi bi-geo-alt me-1"></i>Delivery Address
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={updateForm.delivery_address}
                      onChange={(e) => setUpdateForm({ ...updateForm, delivery_address: e.target.value })}
                      placeholder="Enter complete delivery address"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowUpdateModal(false)}
                >
                  <i className="bi bi-x-circle me-1"></i>Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary-modern btn-modern" 
                  onClick={() => handleUpdateOrder(selectedOrder)}
                >
                  <i className="bi bi-check-circle me-1"></i>Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;