import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X // Added X icon to close the modal
} from "lucide-react";
import "./Customer.css";

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@email.com",
      purchases: "₹45,280"
    },
    {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya@email.com",
      purchases: "₹32,150"
    },
    {
      name: "Amit Kumar",
      phone: "+91 98765 43210",
      email: "amit@email.com",
      purchases: "₹21,450"
    },
    {
      name: "Vikram",
      phone: "+91 98765 43210",
      email: "vikram@email.com",
      purchases: "₹19,800"
    }
  ]);

  const [search, setSearch] = useState("");
  
  // States for Modal and Form Inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purchases: ""
  });

  /* HANDLE INPUT CHANGE */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ADD CUSTOMER */
  const addCustomer = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Formatting purchases to show ₹ symbol if not added
    const formattedPurchases = formData.purchases.startsWith("₹") 
      ? formData.purchases 
      : `₹${formData.purchases}`;

    const newCustomer = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      purchases: formattedPurchases || "₹0"
    };

    setCustomers([...customers, newCustomer]);
    
    // Reset form and close modal
    setFormData({ name: "", phone: "", email: "", purchases: "" });
    setIsModalOpen(false);
  };

  /* DELETE */
  const deleteCustomer = (index) => {
    const updated = customers.filter((_, i) => i !== index);
    setCustomers(updated);
  };

  /* EDIT */
  const editCustomer = (index) => {
    const updated = [...customers];
    const newName = prompt("Edit Customer Name", updated[index].name);
    if (newName) {
      updated[index].name = newName;
      setCustomers(updated);
    }
  };

  /* SEARCH */
  const filteredCustomers = customers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customers-page">
      {/* HEADER */}
      <div className="customers-header">
        <h1>Customer</h1>
        <p>Manage your customer details</p>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="top-bar">
        <div className="search-box">
          <Search size={26} />
          <input
            type="text"
            placeholder="Search customer by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Clicking this now opens the modal */}
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={30} />
          Add Customer
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Total Purchases</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.purchases}</td>
                <td className="actions">
                  <Pencil className="edit-icon" onClick={() => editCustomer(index)} />
                  <Trash2 className="delete-icon" onClick={() => deleteCustomer(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD CUSTOMER MODAL (POPUP FORM) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Customer</h2>
              <X className="close-icon" onClick={() => setIsModalOpen(false)} />
            </div>
            
            <form onSubmit={addCustomer}>
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter name"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Total Purchases (₹)</label>
                <input
                  type="number"
                  name="purchases"
                  value={formData.purchases}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}