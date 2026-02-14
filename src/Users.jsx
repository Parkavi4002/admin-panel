import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    totalOrders: 0,
  });

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const res = await fetch("https://bouquet-backend-7cut.onrender.com/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= STAR LOGIC =================
  const getStars = (orders) => {
    if (orders >= 21) return "⭐⭐⭐⭐⭐";
    if (orders >= 11) return "⭐⭐⭐⭐";
    if (orders >= 6) return "⭐⭐⭐";
    if (orders >= 3) return "⭐⭐";
    return "⭐";
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await fetch(`https://bouquet-backend-7cut.onrender.com/users/${id}`, {
      method: "DELETE",
    });

    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // ================= BLOCK / UNBLOCK =================
  const toggleStatus = async (user) => {
    const newStatus =
      user.status === "Active" ? "Inactive" : "Active";

    await fetch(`https://bouquet-backend-7cut.onrender.com/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: newStatus } : u
      )
    );
  };

  // ================= EDIT SAVE =================
  const handleUpdate = async () => {
    await fetch(`https://bouquet-backend-7cut.onrender.com/users/${editingUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? { ...u, ...editForm } : u
      )
    );

    setEditingUser(null);
  };

  return (
    <div className="users-page">
      <h1 className="title">Users Status</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Total Orders</th>
            <th>Repeat ⭐</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>

              <td>
                <span
                  className={
                    user.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {user.status}
                </span>
              </td>

              <td>{user.totalOrders}</td>
              <td>{getStars(user.totalOrders)}</td>

              <td>
                <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingUser(user);
                    setEditForm({
                      name: user.name,
                      phone: user.phone,
                      totalOrders: user.totalOrders,
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>

                <button
                  className="block-btn"
                  onClick={() => toggleStatus(user)}
                >
                  {user.status === "Active"
                    ? "Block"
                    : "Unblock"}
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= EDIT MODAL ================= */}
      {editingUser && (
        <div className="edit-modal">
          <div className="edit-box">
            <h3>Edit User</h3>

            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              type="text"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <input
              type="number"
              value={editForm.totalOrders}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  totalOrders: Number(e.target.value),
                })
              }
              placeholder="Total Orders"
            />

            <button className="save-btn" onClick={handleUpdate}>
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
