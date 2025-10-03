import { useState, useEffect } from "react";

export default function ManageModes() {
  const [modes, setModes] = useState(() => {
    const saved = localStorage.getItem("modes");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    price: "",
    bgImage: "",
    buttonText: "Service Charge",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (modes.length > 0) {
      localStorage.setItem("modes", JSON.stringify(modes));
    } else {
      localStorage.removeItem("modes");
    }
  }, [modes]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMode = () => {
    if (!form.name || !form.price) return;

    if (editId) {
      setModes((prev) =>
        prev.map((m) => (m.id === editId ? { ...form, id: editId } : m))
      );
      setEditId(null);
    } else {
      const newMode = { ...form, id: Date.now() };
      setModes((prev) => [...prev, newMode]);
    }

    setForm({ name: "", price: "", bgImage: "", buttonText: "Pay Now" });
  };

  const handleDelete = (id) =>
    setModes((prev) => prev.filter((m) => m.id !== id));

  const handleEdit = (mode) => {
    setForm({
      name: mode.name,
      price: mode.price,
      bgImage: mode.bgImage,
      buttonText: mode.buttonText,
    });
    setEditId(mode.id);
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        {editId ? "Edit Mode" : "Add New Mode"}
      </h1>

      {/* Form */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-8">
        <input
          name="name"
          placeholder="Mode Name (Sword)"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-800 rounded text-white"
        />
        <input
          name="price"
          type="number"
          placeholder="Price (200)"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-800 rounded text-white"
        />
        <input
          name="bgImage"
          placeholder="Background Image URL"
          value={form.bgImage}
          onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-800 rounded text-white"
        />
        <input
          name="buttonText"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-800 rounded text-white"
        />
        <button
          onClick={handleAddMode}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-bold"
        >
          {editId ? "Update Mode" : "Add Mode"}
        </button>
      </div>

      {/* List */}
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
        Available Modes
      </h2>

      {modes.length === 0 && (
        <p className="text-gray-400 text-center">No modes created yet.</p>
      )}

      <div className="space-y-4">
        {modes.map((mode) => (
          <div
            key={mode.id}
            className="flex items-center justify-between bg-gray-900 p-4 rounded-lg"
          >
            {/* Left: thumbnail + text */}
            <div className="flex items-center gap-4">
              {mode.bgImage ? (
                <div
                  className="rounded-lg overflow-hidden flex-shrink-0"
                  style={{
                    width: 64,
                    height: 64,
                  }}
                >
                  <img
                    src={mode.bgImage}
                    alt={mode.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ) : (
                <div
                  className="rounded-lg bg-gray-800 flex items-center justify-center text-xs text-gray-400 flex-shrink-0"
                  style={{ width: 64, height: 64 }}
                >
                  No image
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {mode.name} — ₹{mode.price}
                </h3>
                <p className="text-gray-400 text-sm">
                  Button: {mode.buttonText}
                </p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(mode)}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(mode.id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
