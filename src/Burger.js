import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from './CartContext';

const Burger = () => {
  const { addToCart } = useCart();
  const { data, loading, error } = useContext(DataContext);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Loading delicious menu items...</p>
    </div>
  );
  
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error loading menu: {error}
      </div>
    </div>
  );
  
  if (!data || !Array.isArray(data)) return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No menu items available at the moment.
      </div>
    </div>
  );

  // Filter and sort data
  const filteredData = data.filter(item => {
    if (filter === 'all') return true;
    return item.category.name.toLowerCase() === filter.toLowerCase();
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'cost') return a.cost - b.cost;
    return 0;
  });

  const categories = [...new Set(data.map(item => item.category.name))];

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="section-title">Our Menu</h1>
          <p className="text-center text-muted">Discover our delicious selection of food and beverages</p>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label fw-bold">Filter by Category:</label>
          <select 
            className="form-select" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Sort by:</label>
          <select 
            className="form-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name (A-Z)</option>
            <option value="cost">Price (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="row">
        {sortedData.map(item => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card card-modern h-100">
              <div className="position-relative">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x200/6c757d/ffffff?text=No+Image";
                  }}
                />
                <span className="position-absolute top-0 end-0 badge bg-primary m-2">
                  {item.category.name}
                </span>
              </div>
              
              <div className="card-body card-body-modern d-flex flex-column">
                <h5 className="card-title card-title-modern">{item.name}</h5>
                <p className="card-text card-text-modern flex-grow-1">
                  {item.description}
                </p>
                
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mb-3">
                    {item.tags.map(tag => (
                      <span key={tag.name} className="badge bg-secondary me-1 mb-1">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Price and Action */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="h5 text-primary mb-0 fw-bold">
                    ${parseFloat(item.cost).toFixed(2)}
                  </span>
                  <button
                    className="btn btn-primary-modern btn-modern"
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

      {/* No Results Message */}
      {sortedData.length === 0 && (
        <div className="text-center mt-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <h3 className="mt-3">No items found</h3>
          <p className="text-muted">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default Burger;