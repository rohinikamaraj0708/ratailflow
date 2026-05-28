import { useState } from "react";
import {
  Search,
  Mic,
  Trash2,
  Receipt,
  Save,
  Printer,
} from "lucide-react";
import "./Billing.css";

export default function Billing() {
  const products = [
    { id: 1, name: "Rice (1kg)", price: 90, gst: 5 },
    { id: 2, name: "Milk (1L)", price: 40, gst: 5 },
    { id: 3, name: "Bread", price: 50, gst: 5 },
    { id: 4, name: "Egg (12pc)", price: 46, gst: 5 },
    { id: 5, name: "Sugar (1kg)", price: 30, gst: 5 },
    { id: 6, name: "Tea Powder", price: 210, gst: 12 },
    { id: 7, name: "Cooking oil", price: 290, gst: 5 },
    { id: 8, name: "Saop", price: 40, gst: 5 },
    { id: 9, name: "Coconut oil", price: 210, gst: 5 },
    { id: 10, name: "Tooth pest", price: 60, gst: 5 },
  ];

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [customer, setCustomer] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Filter state added

  // FILTERED PRODUCTS
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ADD PRODUCT
  const addToInvoice = (product) => {
    const existing = invoiceItems.find((item) => item.id === product.id);

    if (existing) {
      setInvoiceItems(
        invoiceItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setInvoiceItems([
        ...invoiceItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  // QTY +
  const increaseQty = (id) => {
    setInvoiceItems(
      invoiceItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // QTY -
  const decreaseQty = (id) => {
    setInvoiceItems(
      invoiceItems.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  // DELETE
  const deleteItem = (id) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  // TOTALS
  const subtotal = invoiceItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const gstAmount = subtotal * 0.05;
  const grandTotal = subtotal + gstAmount;

  // GENERATE BILL
  const generateBill = () => {
    let bill = `RetailFlow Invoice\n\nCustomer: ${customer || "Cash Customer"}\n-----------------------------\n`;
    invoiceItems.forEach((item) => {
      bill += `${item.name} x ${item.qty} = ₹${item.qty * item.price}\n`;
    });
    bill += `-----------------------------\nSubtotal : ₹${subtotal}\nGST : ₹${gstAmount.toFixed(2)}\nGrand Total : ₹${grandTotal.toFixed(2)}`;
    alert(bill);
  };

  // SAVE
  const saveBill = () => {
    localStorage.setItem("savedBill", JSON.stringify(invoiceItems));
    alert("Bill Saved Successfully");
  };

  // PRINT
  const printBill = () => {
    window.print();
  };

  return (
    <div className="billing-page">
      {/* Printable Area - hidden on screen, visible only during print */}
      <div className="printable-invoice">
        <h2>RetailFlow Invoice</h2>
        <p><strong>Customer:</strong> {customer || "Cash Customer"}</p>
        <hr />
        <table className="print-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div className="print-totals">
          <p>Subtotal: ₹{subtotal}</p>
          <p>GST: ₹{gstAmount.toFixed(2)}</p>
          <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
        </div>
      </div>

      {/* Main UI Screen Components (hidden during print automatically via CSS) */}
      <div className="screen-content">
        <h1>Billing</h1>
        <p>Create new invoices quickly</p>

        {/* TOP SECTION */}
        <div className="billing-top">
          {/* SEARCH */}
          <div className="search-box">
            <div className="search-input">
              <Search size={24} />
              <input
                type="text"
                placeholder="Search product by name or sku"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="mic-btn">
              <Mic />
            </button>
          </div>

          {/* CUSTOMER */}
          <div className="customer-box">
            <h3>Customer Name (Optional)</h3>
            <input
              type="text"
              placeholder="Enter customer name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="billing-grid">
          {/* PRODUCTS */}
          <div className="products-panel">
            <div className="panel-header">Available Products</div>
            <div className="products-list">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    className="product-card"
                    key={product.id}
                    onClick={() => addToInvoice(product)}
                  >
                    <div>
                      <h3>{product.name}</h3>
                      <p>GST {product.gst}%</p>
                    </div>
                    <h2>₹{product.price}</h2>
                  </div>
                ))
              ) : (
                <p style={{ padding: "20px", textAlign: "center" }}>
                  No products found
                </p>
              )}
            </div>
          </div>

          {/* INVOICE */}
          <div className="invoice-panel">
            <div className="invoice-header">
              <h2>Invoice Items</h2>
              <span>{invoiceItems.length} items</span>
            </div>

            {/* TABLE */}
            <div className="invoice-table">
              <div className="table-head">
                <span>Item</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Total</span>
                <span>Action</span>
              </div>

              {invoiceItems.map((item) => (
                <div className="table-row" key={item.id}>
                  <span>{item.name}</span>
                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <span>₹{item.price}</span>
                  <span>₹{item.price * item.qty}</span>
                  <Trash2
                    color="red"
                    cursor="pointer"
                    onClick={() => deleteItem(item.id)}
                  />
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="totals">
              <div>
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <span>GST:</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="grand-total">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="bill-buttons">
              <button className="generate-btn" onClick={generateBill}>
                <Receipt /> Generate Bill
              </button>
              <button className="save-btn" onClick={saveBill}>
                <Save /> Save
              </button>
              <button className="print-btn" onClick={printBill}>
                <Printer /> Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}