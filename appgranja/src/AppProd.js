import React, { useEffect, useState } from 'react';
import CategoryList from './components/CategoryList';
//import axios from 'axios';
import api from './api';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categorias/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="App">
      <h1>Category and Products</h1>
      <CategoryList categories={categories} />
    </div>
  );
}

export default App;
