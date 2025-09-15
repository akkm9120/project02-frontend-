import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const ProductsData = ({ children }) => {
  const [data, setData] = useState(null);
 const [loading,setLoading] =useState(true);
  const [error, setError] = useState(null);
  const [historyData, setHistoryData] = useState({ orders: [] });
  const [refreshOrders, setRefreshOrders] = useState(false);

  const triggerOrdersRefresh = () => {
    setRefreshOrders(prev => !prev);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        setData(response.data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <DataContext.Provider value={{ data,loading,setLoading,setError, error, historyData, setHistoryData, refreshOrders, triggerOrdersRefresh }}>
      {children}
    </DataContext.Provider>
  );
};
