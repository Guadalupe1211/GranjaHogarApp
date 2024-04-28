import React, { useEffect, useState } from 'react';
import CategoryList from './components/CategoryList';
import axios from 'axios';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categorias/');
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