import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([
    { name: "Rice (1kg)", sku: "RIC001", price: 85, stock: 150, gst: "5%" },
    { name: "Milk (1L)", sku: "MLK001", price: 65, stock: 80, gst: "5%" },
    { name: "Bread", sku: "BRD001", price: 40, stock: 120, gst: "5%" },
    { name: "Tea Powder", sku: "TEA001", price: 180, stock: 65, gst: "12%" }
  ]);

  const [search, setSearch] = useState("");
  
  // 🪟 Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    gst: "5%"
  });

  // Handle Input Changes inside Modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open Modal for Creating a New Product
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ name: "", sku: "", price: "", stock: "", gst: "5%" });
    setIsModalOpen(true);
  };

  // Open Modal for Editing an Existing Product
  const openEditModal = (index) => {
    setIsEditing(true);
    setCurrentEditIndex(index);
    // Filtered list-la click பண்ணாலும் original array index-ah match பண்ணும் logic
    const selectedProduct = filteredProducts[index];
    const originalIndex = products.findIndex(p => p.sku === selectedProduct.sku);
    setCurrentEditIndex(originalIndex);

    setFormData({
      name: selectedProduct.name,
      sku: selectedProduct.sku,
      price: selectedProduct.price,
      stock: selectedProduct.stock,
      gst: selectedProduct.gst
    });
    setIsModalOpen(true);
  };

  // Save or Update Product Trigger
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update logic
      const updatedProducts = [...products];
      updatedProducts[currentEditIndex] = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        stock: Number(formData.stock),
        gst: formData.gst
      };
      setProducts(updatedProducts);
    } else {
      // Create logic
      const newProduct = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        stock: Number(formData.stock),
        gst: formData.gst
      };
      setProducts([...products, newProduct]);
    }

    setIsModalOpen(false); // Close window
  };

  // Delete Action
  const deleteProduct = (skuToDelete) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((item) => item.sku !== skuToDelete);
      setProducts(updated);
    }
  };

  // Search filter matching name or sku
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      {/* HEADER */}
      <div className="products-header">
        <h1>Product</h1>
        <p>Manage your product inventory</p>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="top-bar">
        <div className="search-box">
          <Search size={26} />
          <input
            type="text"
            placeholder="Search product by name or sku"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="add-btn" onClick={openAddModal}>
          <Plus size={24} />
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>GST %</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <tr key={index}>
                  <td className="font-medium">{item.name}</td>
                  <td>{item.sku}</td>
                  <td>₹{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.gst}</td>
                  <td className="actions">
                    <Pencil
                      className="edit-icon"
                      onClick={() => openEditModal(index)}
                    />
                    <Trash2
                      className="delete-icon"
                      onClick={() => deleteProduct(item.sku)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🪟 DYNAMIC POPUP WINDOW (MODAL) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Sugar (1kg)"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>SKU Code *</label>
                <input
                  type="text"
                  name="sku"
                  placeholder="e.g., SGR001"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  disabled={isEditing} // Edit பண்ணும்போது SKU-va maatha koodadhu
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stock Qty *</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>GST Slab</label>
                <select
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                >
                  <option value="0%">0% (Exempted)</option>
                  <option value="5%">5% (Standard)</option>
                  <option value="12%">12%</option>
                  <option value="18%">18%</option>
                  <option value="28%">28%</option>
                </select>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isEditing ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}