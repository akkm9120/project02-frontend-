import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const ProductsData = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historyData, setHistoryData] = useState({ orders: [] });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://3000-akkm9120-sctp02projecte-xkk8z9ysyfb.ws-us117.gitpod.io/api/orders`);
        setHistoryData({ orders: response.data.orders });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://3000-akkm9120-sctp02projecte-xkk8z9ysyfb.ws-us117.gitpod.io/api/products`);
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
    <DataContext.Provider value={{ data, loading, error, historyData, setHistoryData }}>
      {children}
    </DataContext.Provider>
  );
};
