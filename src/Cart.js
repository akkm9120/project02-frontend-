import React, { useState } from 'react';

const Cart = ({ product, quantity}) => {
    const [newQuantity, setNewQuantity] = useState(quantity);

    const handleQuantityChange = (e) => {
        setNewQuantity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here, such as an API call to update the quantity
        console.log('Quantity updated:', newQuantity);
    };

    const handleRemove = () => {
        // Add logic to handle product removal from the cart
        console.log('Product removed');
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">
                    <h3>{product.name}</h3>
                </div>
                <ul>
                    <li>Category: {product.category.name}</li>
                    <li>Cost: {product.cost}</li>
                    <form onSubmit={handleSubmit}>
                        <li>
                            Quantity: 
                            <input 
                                style={{ width: '50px' }} 
                                type="text" 
                                value={newQuantity} 
                                onChange={handleQuantityChange} 
                                name="newQuantity" 
                            />
                            <button type="submit" className="btn btn-primary btn-sm ms-3">
                                Update
                            </button>
                        </li>
                    </form>
                </ul>
                <button 
                    onClick={handleRemove} 
                    className="btn btn-danger btn-sm mt-3"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default Cart;
