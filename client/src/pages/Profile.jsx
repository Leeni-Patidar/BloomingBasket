import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, token, updateProfile, changePassword } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("personal");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    landmark: "",
    label: "Home",
    isDefault: false,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get("/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(data);
    } catch (err) {
      toast.error("Failed to fetch addresses");
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ phone: profileData.phone });
  };

  const resetAddressForm = () => {
    setEditingAddressId(null);
    setAddressForm({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      landmark: "",
      label: "Home",
      isDefault: false,
    });
  };

  const handleAddressSubmit = async () => {
    try {
      if (editingAddressId) {
        const { data } = await axios.put(`/api/addresses/${editingAddressId}`, addressForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(addresses.map((a) => (a._id === editingAddressId ? data : a)));
        toast.success("Address updated");
      } else {
        const { data } = await axios.post("/api/addresses", addressForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses([...addresses, data]);
        toast.success("Address added");
      }
      resetAddressForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Address operation failed");
    }
  };

  const handleEditClick = (addr) => {
    setEditingAddressId(addr._id);
    setAddressForm({
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      country: addr.country,
      landmark: addr.landmark || "",
      label: addr.label,
      isDefault: addr.isDefault,
    });
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((addr) => addr._id !== id));
      toast.success("Address deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const { data } = await axios.put(
        `/api/addresses/default/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(addresses.map((a) => ({ ...a, isDefault: a._id === id })));
      toast.success("Default address set");
    } catch (err) {
      toast.error("Failed to set default");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwords;
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    await changePassword(oldPassword, newPassword);
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Horizontal Tabs */}
      <div className="flex justify-start space-x-4 mb-6">
        {["personal", "address", "password"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-200 ${
              activeTab === tab
                ? "bg-gray-300 text-black shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab === "personal" ? "Personal Info" : tab === "address" ? "Address" : "Change Password"}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main>
        {/* PERSONAL INFO */}
        {activeTab === "personal" && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <input
              type="text"
              value={profileData.name}
              disabled
              className="input w-full border-2 border-black rounded-lg px-4 py-3 bg-transparent focus:bg-transparent focus:shadow-md transition-shadow duration-200 cursor-not-allowed"
            />
            <input
              type="email"
              value={profileData.email}
              disabled
              className="input w-full border-2 border-black rounded-lg px-4 py-3 bg-transparent focus:bg-transparent focus:shadow-md transition-shadow duration-200 cursor-not-allowed"
            />
            <input
              type="text"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              placeholder="Phone"
              className="input w-full border-2 border-black rounded-lg px-4 py-3 bg-transparent focus:shadow-md transition-shadow duration-200"
            />
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Update</button>
          </form>
        )}

        {/* ADDRESS */}
        {activeTab === "address" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">{editingAddressId ? "Edit Address" : "Add Address"}</h2>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Street" value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} className="input" />
              <input type="text" placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="input" />
              <input type="text" placeholder="State" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="input" />
              <input type="text" placeholder="Zip Code" value={addressForm.zipCode} onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })} className="input" />
              <input type="text" placeholder="Landmark (optional)" value={addressForm.landmark} onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })} className="input col-span-2" />
              <select value={addressForm.label} onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })} className="input">
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
              <label className="flex items-center col-span-2 space-x-2">
                <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })} />
                <span>Set as default address</span>
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddressSubmit} className="btn bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
                {editingAddressId ? "Update Address" : "Add Address"}
              </button>
              {editingAddressId && (
                <button onClick={resetAddressForm} className="btn bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
              )}
            </div>

            {/* Address List */}
            <h3 className="text-lg font-semibold mt-6">Saved Addresses</h3>
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr._id} className="border p-3 rounded shadow-sm space-y-1">
                  <p className="font-semibold">{addr.label}</p>
                  <p>{addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}</p>
                  {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                  {addr.isDefault ? (
                    <p className="text-green-600 text-sm">✅ Default Address</p>
                  ) : (
                    <button onClick={() => handleSetDefault(addr._id)} className="text-blue-500 text-sm">Set as Default</button>
                  )}
                  <div className="flex gap-3 mt-1">
                    <button onClick={() => handleEditClick(addr)} className="text-yellow-600 text-sm">Edit</button>
                    <button onClick={() => handleDeleteAddress(addr._id)} className="text-red-500 text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHANGE PASSWORD */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Change Password</h2>
            <input type="password" value={passwords.oldPassword} onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} placeholder="Old Password" className="input w-full" />
            <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="New Password" className="input w-full" />
            <input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} placeholder="Confirm Password" className="input w-full" />
            <button type="submit" className="btn bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Update Password</button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Profile;
