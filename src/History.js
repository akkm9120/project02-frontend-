import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const History = () => {
  const { historyData, setHistoryData, loading, error } = useContext(DataContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!historyData?.orders || !Array.isArray(historyData.orders)) return <div>No orders available</div>;

  const handleUpdateOrder = (orderId) => {
    console.log("Updating order:", orderId);
  };

  const handleRemoveOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(
          `https://akkm9120-sctp02projecte-xkk8z9ysyfb.ws-us117.gitpod.io/api/orders/delete/${orderId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        setHistoryData(prevData => ({
          ...prevData,
          orders: prevData.orders.filter(order => order.order_id !== orderId)
        }));

      } catch (error) {
        console.error('Delete Error:', error);
        alert('Failed to delete order. Please try again.');
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
          {historyData.orders.map(order => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>${order.total_cost.toFixed(2)}</td>
              <td>
                <div>Date: {new Date(order.delivery_date).toLocaleDateString()}</div>
                <div>Time: {order.delivery_time}</div>
                <div>Address: {order.delivery_address}</div>
              </td>
              <td>
                <ul className="list-unstyled">
                  {order.orderItems.map(item => (
                    <li key={item.order_item_id}>
                      {item.quantity}x {item.product_name} (${item.price_per_unit} each)
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleUpdateOrder(order.order_id)}
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
    </div>
  );
};

export default History;
