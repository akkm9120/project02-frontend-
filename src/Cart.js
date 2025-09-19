import React, {  useContext  } from 'react';
import { useCart } from "./CartContext";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from './DataContext';


const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [newQuantity, setNewQuantity] = React.useState(item.quantity);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setNewQuantity(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuantity(item.product.id, newQuantity);
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="card-title">{item.product.name}</h3>
          <span className="badge bg-primary">${item.product.cost}</span>
        </div>
        <p className="text-muted">Category: {item.product.category.name}</p>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <div className="d-flex align-items-center gap-3">
            <span className="fw-bold">Quantity:</span>
            <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
              <div className="input-group" style={{ width: "120px" }}>
                <input
                  className="form-control text-center fw-bold"
                  type="number"
                  min="1"
                  value={newQuantity}
                  onChange={handleQuantityChange}
                  name="newQuantity"
                  style={{ fontSize: "1.1rem" }}
                />
                <button type="submit" className="btn btn-warning">
                  <i className="bi bi-check-lg"></i>
                </button>
              </div>
            </form>
            <span className="text-muted">× ${item.product.cost} = <strong>${(item.product.cost * newQuantity).toFixed(2)}</strong></span>
          </div>
          <button 
            type="button" 
            onClick={() => removeFromCart(item.product.id)} 
            className="btn btn-outline-danger"
          >
            <i className="bi bi-trash"></i> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
 
  const { cartItems, clearCart } = useCart();
  const [deliveryDetails, setDeliveryDetails] = React.useState({
    date: "",
    time: "",
    address: ""
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  // Auto-dismiss success message after 5 seconds
  React.useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  const { triggerOrdersRefresh } = useContext(DataContext);
 

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.product.cost * item.quantity, 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    const { date, time, address } = deliveryDetails;
    if (!date || !time || !address) {
      setError("Please fill in all delivery details");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const orderData = {
        order_date: new Date().toISOString().split("T")[0],
        total_cost: parseFloat(calculateTotal()),
        delivery_date: date,
        delivery_time: time,
        delivery_address: address,
        orderItemsData: cartItems.map(item => ({
          order_item_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price_per_unit: item.product.cost,
          subtotal: item.product.cost * item.quantity,
        }))
      };
     
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/orders`,
        JSON.stringify(orderData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (response.data.success) {
        triggerOrdersRefresh();
        clearCart();
        setDeliveryDetails({ date: "", time: "", address: "" });
        setSuccessMessage("Order placed successfully! Your order has been confirmed.");
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccessMessage("")} 
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="row g-4">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <div className="alert alert-info">Your cart is empty</div>
          ) : (
            cartItems.map((item, index) => <CartItem key={index} item={item} />)
          )}
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="mb-3">
                <label className="form-label">Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={deliveryDetails.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Delivery Time</label>
                <select
                  className="form-select"
                  name="time"
                  value={deliveryDetails.time}
                  onChange={handleInputChange}
                >
                  <option value="">Select Time</option>
                  {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                    <option key={hour} value={`${hour}:00`}>
                      {hour > 12 ? `${hour-12}:00 PM` : `${hour}:00 AM`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Delivery Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter your delivery address"
                />
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h5>Total:</h5>
                <h5>${calculateTotal()}</h5>
              </div>
              <button
                className="btn btn-primary w-100"
                disabled={isLoading || !cartItems.length}
                onClick={handleCheckout}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm me-2" />
                ) : null}
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
