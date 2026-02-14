import { useEffect, useState } from "react";
import "./style.css";

function Bouquet() {
  const [bouquets, setBouquets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch Data
  const fetchBouquets = () => {
    fetch("https://bouquet-backend-7cut.onrender.com/bouquets")
      .then(res => res.json())
      .then(data => setBouquets(data));
  };

  useEffect(() => {
    fetchBouquets();
  }, []);

  // Add or Update Bouquet
  const handleSubmit = () => {
    if (!form.name || !form.price || !form.image) {
      alert("Fill all fields");
      return;
    }

    if (editingId) {
      // UPDATE
      fetch(`https://bouquet-backend-7cut.onrender.com/bouquets/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }).then(() => {
        fetchBouquets();
        setForm({ name: "", price: "", image: "" });
        setEditingId(null);
      });
    } else {
      // ADD
      fetch("https://bouquet-backend-7cut.onrender.com/bouquets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }).then(() => {
        fetchBouquets();
        setForm({ name: "", price: "", image: "" });
      });
    }
  };

  // Edit
  const editBouquet = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      image: item.image
    });
    setEditingId(item.id);
  };

  // Cancel Edit
  const cancelEdit = () => {
    setForm({ name: "", price: "", image: "" });
    setEditingId(null);
  };

  // Delete
  const deleteBouquet = (id) => {
    fetch(`https://bouquet-backend-7cut.onrender.com/bouquets/${id}`, {
      method: "DELETE"
    }).then(() => {
      fetchBouquets();
    });
  };

  return (
    <div className="content">
      <h2>Bouquets</h2>

      {/* Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </div>

      {/* Cards */}
      <div style={{marginLeft:"10px",padding:"15px",width:"110px",height:"50px"}}>
      <div className="bouquet-container">
        {bouquets.map(item => (
          <div className="bouquet-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

            <div className="card-actions">
              <button
                className="edit-btn"
                onClick={() => editBouquet(item)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteBouquet(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Bouquet;
