import { Link } from "react-router-dom";
import "./style.css"

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin</h2>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/bouquets">Bouquets</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
