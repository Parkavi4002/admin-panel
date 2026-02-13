import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Bouquet from "./Bouquet";
import "./style.css";
import Orders from "./Orders";
import Users from "./Users"

function App() {
  return (
      <div className="admin-layout" style={{display:"flex"}}>
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bouquets" element={<Bouquet />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
