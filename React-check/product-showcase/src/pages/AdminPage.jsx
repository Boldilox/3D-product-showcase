import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProducts(data);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new product
  const handleCreate = async () => {
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      fetchProducts();
      setForm({ name: '', description: '' });
    }
  };

  // Update an existing product
  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:5000/api/products/${editingProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      fetchProducts();
      setEditingProductId(null);
      setForm({ name: '', description: '' });
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchProducts();
    }
  };

  // Prepare to edit a product
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setForm({ name: product.name, description: product.description });
  };

  return (
    <div>
      <h2>Admin Page</h2>

      <div>
        <h3>{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
        />
        {editingProductId ? (
          <button onClick={handleUpdate}>Update Product</button>
        ) : (
          <button onClick={handleCreate}>Add Product</button>
        )}
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name} - {product.description}</span>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
