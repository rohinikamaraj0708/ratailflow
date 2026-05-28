import React, { useState } from 'react';
import { Search, Eye, X } from 'lucide-react'; // Pop-up close panna X icon sethurukom
import './Invoices.css';

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Click panra invoice-ah store panna

  // Raw data from your setup
  const invoiceData = [
    { id: "INV-2026-001", customer: "Rajesh Kumar", amount: "₹4,280", date: "20 Mar 2026", status: "Paid" },
    { id: "INV-2026-002", customer: "Priya Sharma", amount: "₹3,150", date: "20 Mar 2026", status: "Paid" },
    { id: "INV-2026-003", customer: "Amit Patel", amount: "₹2,890", date: "20 Mar 2026", status: "Pending" },
    { id: "INV-2026-002", customer: "Priya Sharma", amount: "₹3,150", date: "20 Mar 2026", status: "Paid" },
    { id: "INV-2026-002", customer: "Priya Sharma", amount: "₹3,150", date: "20 Mar 2026", status: "Paid" },
    { id: "INV-2026-002", customer: "Anitha Desai", amount: "₹3,150", date: "20 Mar 2026", status: "Cancelled" },
  ];

  /* 🔍 STEP 1: Filtering Logic */
  // Customer name moolama filter pannum (Case-sensitive illama handle pannum)
  const filteredInvoices = invoiceData.filter(invoice =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invoice-page-wrapper">
      {/* Top Header Title */}
      <header className="invoice-header-section">
        <h1>Invoices</h1>
        <p>Manage and track your customer billings</p>
      </header>

      {/* Centralized Search Area Panel */}
      <div className="search-panel-container">
        <div className="search-bar-inner">
          <Search className="search-icon-svg" size={24} />
          <input 
            type="text" 
            placeholder="Search by customer name or invoice ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Data Render Table Container */}
      <div className="table-card-holder">
        <table className="invoice-data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice, index) => (
                <tr key={index}>
                  <td className="font-medium">{invoice.id}</td>
                  <td>{invoice.customer}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.date}</td>
                  <td>
                    <span className={`status-text ${invoice.status.toLowerCase()}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    {/* 👁️ STEP 2: View Click Action */}
                    <div className="action-view-btn" onClick={() => setSelectedInvoice(invoice)}>
                      <Eye size={20} className="eye-icon" />
                      <span>View</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data-msg">No matching invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📥 STEP 3: Pop-up Modal Code */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invoice Details</h2>
              <button className="close-modal-btn" onClick={() => setSelectedInvoice(null)}>
                <X size={22} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Invoice ID:</span>
                <span className="detail-value font-medium">{selectedInvoice.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Customer Name:</span>
                <span className="detail-value">{selectedInvoice.customer}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total Amount:</span>
                <span className="detail-value amount-highlight">{selectedInvoice.amount}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Billing Date:</span>
                <span className="detail-value">{selectedInvoice.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Status:</span>
                <span className={`status-text ${selectedInvoice.status.toLowerCase()}`}>
                  {selectedInvoice.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}