import React from "react";
import { Routes, Route } from "react-router-dom";

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
          {/* Dashboard Route */}
          <Route path="/" element={<Dashboard />} />

          {/* Products Route */}
          <Route path="/products" element={<Products />} />

          {/* Customers Route */}
          <Route path="/customers" element={<Customer />} />

          {/* Billing Route */}
          <Route path="/billing" element={<Billing />} />

          {/* Invoices Route */}
          <Route path="/invoices" element={<Invoices />} />
           
          {/* Settings Route */}
          <Route path="/settings" element={<Settings />} /> {/* ✅ Ippo indha route perfect-ah work aagum */}
        </Routes>
      </main>
    </div>
  );
}

export default App;