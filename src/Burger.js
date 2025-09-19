import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from './CartContext';
const Burger = () => {
  const { addToCart } = useCart();
  const { data, loading, error } = useContext(DataContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || !Array.isArray(data)) return <div>No data available</div>;

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="display-5 fw-bold text-warning">Our Menu</h2>
        <p className="lead text-muted">Delicious food made with fresh ingredients</p>
      </div>
      <div className="row g-4">
        {data.map(item => (
          <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100 shadow-sm border-0">
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <span className="badge bg-warning text-dark fs-6">${item.cost}</span>
                </div>
                <p className="card-text text-muted small mb-2">{item.description}</p>
                <div className="mb-2">
                  <span className="badge bg-light text-dark me-1">{item.category.name}</span>
                  {item.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">{tag.name}</span>
                  ))}
                </div>
                <div className="mt-auto">
                  <button
                    className="btn btn-warning w-100 fw-bold"
                    onClick={() => addToCart(item)}
                  >
                    <i className="bi bi-cart-plus me-2"></i>Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Burger;