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
            `https://3000-akkm9120-sctp02projecte-xkk8z9ysyfb.ws-us117.gitpod.io/api/orders/update/${orderId}`,
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://3000-akkm9120-sctp02projecte-xkk8z9ysyfb.ws-us117.gitpod.io/api/orders`
        );
        setHistoryData({ orders: response.data.orders });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, [refreshOrders]);

  const handleRemoveOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await axios.delete(
          `https://3000-akkm9120-sctp02projecte-xkk8z9ysyfb.ws-us117.gitpod.io/api/orders/delete/${orderId}`,
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
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Cost</th>
            <th>Delivery Details</th>
            <th>Order Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {historyData.orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>${order.total_cost.toFixed(2)}</td>
              <td>
                <div>
                  Date: {new Date(order.delivery_date).toLocaleDateString()}
                </div>
                <div>Time: {order.delivery_time}</div>
                <div>Address: {order.delivery_address}</div>
              </td>
              <td>
                <ul className="list-unstyled">
                  {order.orderItems.map((item) => (
                    <li key={item.order_item_id}>
                      {item.quantity}x {item.product_name} ($
                      {item.price_per_unit} each)
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => {
                    setSelectedOrder(order.order_id);
                    setUpdateForm({
                      delivery_date: order.delivery_date,
                      delivery_time: order.delivery_time,
                      delivery_address: order.delivery_address,
                      orderItemsData: order.orderItems // Include order items
                    });
                    setShowUpdateModal(true);
                  }}
                >
                  <i className="bi bi-pencil"></i> Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveOrder(order.order_id)}
                >
                  <i className="bi bi-trash"></i> Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Order</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Delivery Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={updateForm.delivery_date}
                      onChange={(e) => setUpdateForm({ ...updateForm, delivery_date: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Delivery Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={updateForm.delivery_time}
                      onChange={(e) => setUpdateForm({ ...updateForm, delivery_time: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Delivery Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateForm.delivery_address}
                      onChange={(e) => setUpdateForm({ ...updateForm, delivery_address: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => handleUpdateOrder(selectedOrder)}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;