import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Importing all pages from the src/pages folder
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customer from "./pages/Customer";
import Billing from "./pages/Billing";
import Invoices from "./pages/Invoices"; 
import Settings from "./pages/Settings"; 

import "./App.css";

function App() {
  return (
    <div className="app-layout">
      {/* Fixed Left Sidebar Wrapper */}
      <Sidebar />

      {/* Dynamic Right Side Workspace Routing view wrapper */}
      <main className="main-content">
        <Routes>
          {/* 🎯 முதலில் வெப்சைட் ஓபன் ஆகும்போதே தானாக /dashboard-க்கு மாற்றிவிடும் */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Actual Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Products Route */}
          <Route path="/products" element={<Products />} />

          {/* Customers Route */}
          <Route path="/customers" element={<Customer />} />

          {/* Billing Route */}
          <Route path="/billing" element={<Billing />} />

          {/* Invoices Route */}
          <Route path="/invoices" element={<Invoices />} />
           
          {/* Settings Route */}
          <Route path="/settings" element={<Settings />} />
          
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;