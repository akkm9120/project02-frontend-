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
    <div className="card card-modern mb-3">
      <div className="card-body card-body-modern">
        <div className="row align-items-center">
          <div className="col-md-3">
            <img 
              src={item.product.image_url} 
              alt={item.product.name}
              className="img-fluid rounded"
              style={{ height: '80px', width: '80px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80x80/6c757d/ffffff?text=Food";
              }}
            />
          </div>
          <div className="col-md-4">
            <h5 className="card-title card-title-modern mb-1">{item.product.name}</h5>
            <p className="text-muted small mb-1">
              <i className="bi bi-tag me-1"></i>{item.product.category.name}
            </p>
            <div className="fw-bold text-primary">
              ${parseFloat(item.product.cost).toFixed(2)} each
            </div>
          </div>
          <div className="col-md-3">
            <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
              <div className="input-group" style={{ width: "100px" }}>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    const newVal = Math.max(1, newQuantity - 1);
                    setNewQuantity(newVal);
                    updateQuantity(item.product.id, newVal);
                  }}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <input
                  className="form-control form-control-sm text-center"
                  type="number"
                  min="1"
                  value={newQuantity}
                  onChange={handleQuantityChange}
                  onBlur={handleSubmit}
                  name="newQuantity"
                />
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    const newVal = newQuantity + 1;
                    setNewQuantity(newVal);
                    updateQuantity(item.product.id, newVal);
                  }}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-2 text-end">
            <div className="fw-bold h5 text-success mb-2">
              ${(item.product.cost * item.quantity).toFixed(2)}
            </div>
            <button 
              type="button" 
              onClick={() => removeFromCart(item.product.id)} 
              className="btn btn-outline-danger btn-sm"
              title="Remove from cart"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
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
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="section-title">
            <i className="bi bi-cart3 me-3"></i>Shopping Cart
          </h2>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError("")} 
            aria-label="Close"
          ></button>
        </div>
      )}
      
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
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
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x display-1 text-muted"></i>
              <h3 className="mt-3 text-muted">Your cart is empty</h3>
              <p className="text-muted">Add some delicious items to get started!</p>
              <a href="/menu" className="btn btn-primary-modern btn-modern">
                <i className="bi bi-shop me-2"></i>Browse Menu
              </a>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-bag me-2"></i>
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </h5>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={clearCart}
                  disabled={isLoading}
                >
                  <i className="bi bi-trash me-1"></i>Clear Cart
                </button>
              </div>
              {cartItems.map((item, index) => (
                <CartItem key={`${item.product.id}-${index}`} item={item} />
              ))}
            </>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card card-modern sticky-top" style={{ top: '100px' }}>
            <div className="card-body card-body-modern">
              <h5 className="card-title card-title-modern mb-4">
                <i className="bi bi-receipt me-2"></i>Order Summary
              </h5>
              
              {/* Delivery Details Form */}
              <div className="form-modern">
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <i className="bi bi-calendar me-1"></i>Delivery Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={deliveryDetails.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <i className="bi bi-clock me-1"></i>Delivery Time
                  </label>
                  <select
                    className="form-select"
                    name="time"
                    value={deliveryDetails.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Time</option>
                    {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                      <option key={hour} value={`${hour}:00`}>
                        {hour > 12 ? `${hour-12}:00 PM` : hour === 12 ? `12:00 PM` : `${hour}:00 AM`}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="bi bi-geo-alt me-1"></i>Delivery Address
                  </label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={deliveryDetails.address}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter your complete delivery address"
                    required
                  />
                </div>
              </div>

              {/* Order Breakdown */}
              {cartItems.length > 0 && (
                <div className="border-top pt-3 mb-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between mb-2 small">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>${(item.product.cost * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-3">
                <h5 className="mb-0 fw-bold">Total:</h5>
                <h5 className="mb-0 fw-bold text-success">${calculateTotal()}</h5>
              </div>
              
              <button
                className="btn btn-primary-modern btn-modern w-100"
                disabled={isLoading || !cartItems.length}
                onClick={handleCheckout}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-credit-card me-2"></i>
                    Place Order (${calculateTotal()})
                  </>
                )}
              </button>
              
              {cartItems.length > 0 && (
                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Your order is secure and encrypted
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
