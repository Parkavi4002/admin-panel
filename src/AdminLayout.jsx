import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./style.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminLayout;
