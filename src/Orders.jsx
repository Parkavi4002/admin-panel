import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]); // MUST be array

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then(res => res.json())
      .then(data => {
        console.log("Orders data:", data); // check in console
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(err => console.log(err));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:3000/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    }).then(() => {
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status } : order
        )
      );
    });
  };

  return (
    <div className="content">
      <h2>Orders Status</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.username}</td>
                <td>{order.productName}</td>
                <td>₹{order.amount}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
