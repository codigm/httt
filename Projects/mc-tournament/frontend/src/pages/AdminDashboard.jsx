import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState("home");
  const [tournaments, setTournaments] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    prize: "",
    status: "Upcoming",
    image: "",
    modes: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [modeInput, setModeInput] = useState("");

  // 👇 New states for modal + payment
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  // Load tournaments on mount
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/auth");
    }
    const saved = JSON.parse(localStorage.getItem("tournaments")) || [];
    const deleted = JSON.parse(localStorage.getItem("deletedIds")) || [];
    const filtered = saved.filter((t) => !deleted.includes(t.id));
    setTournaments(filtered);
    setDeletedIds(deleted);
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Add a new mode
  const handleAddMode = () => {
    if (modeInput.trim() && !form.modes.includes(modeInput.trim())) {
      setForm({ ...form, modes: [...form.modes, modeInput.trim()] });
      setModeInput("");
    }
  };

  // Remove a mode
  const handleRemoveMode = (mode) => {
    setForm({ ...form, modes: form.modes.filter((m) => m !== mode) });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name required";
    if (!form.date) newErrors.date = "Date required";
    if (!form.prize) newErrors.prize = "Prize required";
    if (!form.image) newErrors.image = "Image required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save tournament (add or edit)
  const handleSave = () => {
    if (!validateForm()) return;
    let updated;
    if (editingId) {
      updated = tournaments.map((t) =>
        t.id === editingId ? { ...form, id: editingId } : t
      );
      setEditingId(null);
    } else {
      const newTournament = { ...form, id: Date.now().toString() };
      updated = [...tournaments, newTournament];
    }
    setTournaments(updated);
    localStorage.setItem("tournaments", JSON.stringify(updated));
    resetForm();
  };

  // Delete tournament
  const handleDelete = (id) => {
    const updated = tournaments.filter((t) => t.id !== id);
    setTournaments(updated);
    localStorage.setItem("tournaments", JSON.stringify(updated));
    const newDeleted = [...deletedIds, id];
    setDeletedIds(newDeleted);
    localStorage.setItem("deletedIds", JSON.stringify(newDeleted));
  };

  // Edit tournament
  const handleEdit = (t) => {
    setForm(t);
    setEditingId(t.id);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      date: "",
      prize: "",
      status: "Upcoming",
      image: "",
      modes: [],
    });
    setEditingId(null);
  };

  // Format date for list
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {view === "home" ? (
        <>
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin! What would you like to do?</p>
          <button
            onClick={() => setView("tournaments")}
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              marginTop: 20,
            }}
          >
            Manage Tournaments
          </button>
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1 style={{ margin: 0 }}>Manage Tournaments</h1>
            <button
              onClick={() => {
                setView("home");
                resetForm();
              }}
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                marginLeft: "auto",
              }}
            >
              Back to Dashboard
            </button>
          </div>

          {/* Add/Edit Form */}
          <div style={{ marginTop: 30 }}>
            <h2 style={{ color: "yellow" }}>
              {editingId ? "Edit Tournament" : "Add New Tournament"}
            </h2>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              style={{
                border: errors.name ? "1px solid red" : "1px solid #333",
                display: "block",
                margin: "5px 0",
                padding: 6,
                width: "100%",
              }}
            />
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={{
                border: errors.date ? "1px solid red" : "1px solid #333",
                display: "block",
                margin: "5px 0",
                padding: 6,
                width: "100%",
              }}
            />
            <input
              name="prize"
              placeholder="Prize"
              value={form.prize}
              onChange={handleChange}
              style={{
                border: errors.prize ? "1px solid red" : "1px solid #333",
                display: "block",
                margin: "5px 0",
                padding: 6,
                width: "100%",
              }}
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{
                display: "block",
                margin: "5px 0",
                padding: 6,
                width: "100%",
              }}
            >
              <option value="Open">Open</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Not Available">Not Available</option>
            </select>
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              style={{
                border: errors.image ? "1px solid red" : "1px solid #333",
                display: "block",
                margin: "5px 0",
                padding: 6,
                width: "100%",
              }}
            />

            {/* Modes */}
            <div style={{ marginTop: 15 }}>
              <strong>Modes</strong>
              <div style={{ display: "flex", marginTop: 5 }}>
                <input
                  value={modeInput}
                  onChange={(e) => setModeInput(e.target.value)}
                  placeholder="Add mode (e.g., Sword)"
                  style={{ flex: 1, padding: 6 }}
                />
                <button
                  onClick={handleAddMode}
                  style={{
                    background: "#22c55e",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    marginLeft: 8,
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
              <div style={{ marginTop: 10 }}>
                {form.modes.map((m) => (
                  <span
                    key={m}
                    style={{
                      background: "#333",
                      padding: "4px 8px",
                      borderRadius: 4,
                      marginRight: 6,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {m}
                    <button
                      onClick={() => handleRemoveMode(m)}
                      style={{
                        marginLeft: 6,
                        background: "transparent",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={handleSave}
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: 5,
                  marginRight: 10,
                  cursor: "pointer",
                }}
              >
                {editingId ? "Save Changes" : "Add"}
              </button>
              {editingId && (
                <button
                  onClick={resetForm}
                  style={{
                    background: "#6b7280",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <hr style={{ margin: "20px 0", borderColor: "#333" }} />

          {/* Tournament List */}
          <h2>Current Tournaments</h2>
          {tournaments.length === 0 ? (
            <p>No tournaments yet</p>
          ) : (
            tournaments.map((t) => (
              <div
                key={t.id}
                style={{
                  borderBottom: "1px solid #333",
                  padding: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedTournament(t)} // 👈 open details modal
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{
                      width: 60,
                      height: 40,
                      objectFit: "cover",
                      marginRight: 10,
                      borderRadius: 4,
                    }}
                  />
                  <p style={{ margin: 0 }}>
                    <strong>{t.name}</strong> — {formatDate(t.date)} —{" "}
                    {t.status} — {t.prize}
                    {t.modes?.length > 0 && (
                      <span style={{ marginLeft: 10, color: "#22c55e" }}>
                        Modes: {t.modes.join(", ")}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(t)}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: 5,
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    style={{
                      background: "#e11d48",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
