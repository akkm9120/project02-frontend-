  import React, { useContext } from 'react';
  import { DataContext } from './DataContext';
  import 'bootstrap/dist/css/bootstrap.min.css';

  const Burger = () => {
    const { data, loading, error } = useContext(DataContext);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data || !Array.isArray(data)) return <div>No data available</div>;

    return (
      <div className="container mt-4">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.cost}</td>
                <td>{item.description}</td>
                <td>{item.category.name}</td>
                <td>
                  <img src={item.image_url} alt={item.name} style={{width: '50px', height: '50px'}} />
                </td>
                <td>{item.tags.map(tag => tag.name).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default Burger;