import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || {},
  });
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const fetchAddresses = async () => {
    const res = await axios.get("/api/addresses", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/users/profile`, formData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  const handleAddressSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/api/addresses/${editingId}`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    } else {
      await axios.post(`/api/addresses`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
    setForm({});
    setEditingId(null);
    fetchAddresses();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/addresses/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchAddresses();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">My Profile</h2>
        <nav className="flex gap-4">
          <button onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "font-bold" : "text-gray-500"}>Profile Info</button>
          <button onClick={() => setActiveTab("addresses")} className={activeTab === "addresses" ? "font-bold" : "text-gray-500"}>Addresses</button>
        </nav>
      </div>

      {activeTab === "profile" && (
        <form onSubmit={handleProfileSubmit} className="max-w-md grid gap-4">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border rounded p-2 w-full" required />
          </div>
          <div>
            <label className="block mb-2 font-medium">Phone Number</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="border rounded p-2 w-full" required />
          </div>
          <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">Update</button>
        </form>
      )}

      {activeTab === "addresses" && (
        <div>
          <form onSubmit={handleAddressSave} className="grid grid-cols-2 gap-4 max-w-3xl mb-6">
            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["street", "Street"],
              ["city", "City"],
              ["state", "State"],
              ["zipcode", "Zipcode"],
              ["country", "Country"],
            ].map(([key, label]) => (
              <div key={key} className="col-span-1">
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  type="text"
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required
                  className="border rounded p-2 w-full"
                />
              </div>
            ))}
            <div className="col-span-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {editingId ? "Update Address" : "Add Address"}
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{addr.firstName} {addr.lastName}</p>
                  <p>{addr.street}, {addr.city}, {addr.state} {addr.zipcode}</p>
                  <p>{addr.country} - {addr.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setForm(addr); setEditingId(addr._id); }} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(addr._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
