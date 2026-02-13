import React from "react";
import "./style.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const totalUsers = 54;
  const totalOrders = 50;
  const totalRevenue = 47300;
  const targetRevenue = 200000;

  const data = {
    labels: ["Users", "Orders", "Revenue"],
    datasets: [
      {
        label: "Dashboard Data",
        data: [totalUsers, totalOrders, totalRevenue],
        backgroundColor: ["#6366f1", "#10b981", "#f59e0b"],
        borderRadius: 8,
        barThickness:60
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      <div className="card-container">
        <div className="card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="users"
          />
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>

        <div className="card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="orders"
          />
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
            alt="revenue"
          />
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

        <div className="card target">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="target"
          />
          <h3>Target Revenue</h3>
          <p>₹{targetRevenue}</p>
        </div>
      </div>

      <div className="chart-box">
        
    
      <Bar data={{
    labels: ["Users", "Orders", "Revenue"],
    datasets: [
      {
        label: "Users",
        data: [totalUsers, 0, 0],
        backgroundColor: "#6366f1",
        yAxisID: "y1",
      },
      {
        label: "Orders",
        data: [0, totalOrders, 0],
        backgroundColor: "#10b981",
        yAxisID: "y1",
      },
      {
        label: "Revenue",
        data: [0, 0, totalRevenue],
        backgroundColor: "#f59e0b",
        yAxisID: "y",
      },
    ],
  }}
  options={{
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        type: "linear",
        position: "left",
      },
      y1: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      plugins:{
        legend:{
          position:"top"
        }
      },
      datasets:{
        bar:{
          barThickness:50
        }
      }
      },
    },
  }}
/>
</div>
    </div>
  );
};

export default Dashboard;
