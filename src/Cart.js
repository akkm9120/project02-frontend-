import React from 'react';
import { useCart } from './CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [newQuantity, setNewQuantity] = React.useState(item.quantity);

  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuantity(item.product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="card-title">
          <h3>{item.product.name}</h3>
        </div>
        <ul className="list-unstyled">
          <li>Category: {item.product.category.name}</li>
          <li>Cost: ${item.product.cost}</li>
          <form onSubmit={handleSubmit}>
            <li className="my-2">
              Quantity:
              <input
                className="form-control d-inline-block mx-2"
                style={{ width: '70px' }}
                type="number"
                min="1"
                value={newQuantity}
                onChange={handleQuantityChange}
                name="newQuantity"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Update
              </button>
            </li>
          </form>
        </ul>
        <button
          onClick={handleRemove}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.product.cost * item.quantity), 0
    ).toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))
          )}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className="btn btn-warning w-100 mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
