import "./Sidebar.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">
        <FaShoppingCart /> RetailFlow
      </h2>

      <ul>

        <li>
          <Link to="/">🏠 Dashboard</Link>
        </li>

        <li>
          <Link to="/products">📦 Products</Link>
        </li>

        <li>
          <Link to="/customers">👥 Customers</Link>
        </li>

        <li>
          <Link to="/billing">🧾 Billing</Link>
        </li>

        <li>
          <Link to="/invoices">📄 Invoices</Link>
        </li>

        <li>
          <Link to="/settings">⚙️ Settings</Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;