import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

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

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });

      if (user.role !== "admin") {
        fetchAddresses();
      }
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
      await axios.put(`/api/addresses/default/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    <div className="container mx-auto p-4 max-w-4xl rounded-xl shadow-md">
      {/* Tabs */}
      <div className="flex justify-start space-x-4 mb-6 border-b border-brown-300 pb-2">
        {["personal", ...(user?.role !== "admin" ? ["address"] : []), "password"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-md font-medium transition duration-200 text-sm
              ${
                activeTab === tab
                  ? "button-bg button-bg:hover"
                  : "bg-gray-200 shadow-inner"
              }`}
          >
            {tab === "personal" ? "Personal Info" : tab === "address" ? "Address" : "Change Password"}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="space-y-6">
        {/* Personal Info */}
        {activeTab === "personal" && (
          <form onSubmit={handleProfileSubmit} className="space-y-4 bg-white/60 p-4 rounded-md border border-brown-300">
            <h2 className="text-lg font-semibold text-brown-800">Personal Information</h2>
            <input
              type="text"
              value={profileData.name}
              disabled
              className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white/60 text-brown-700 cursor-not-allowed"
            />
            <input
              type="email"
              value={profileData.email}
              disabled
              className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white/60 text-brown-700 cursor-not-allowed"
            />
            {user?.role !== "admin" && (
              <>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  placeholder="Phone"
                  className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800"
                />
                <button type="submit" className="button-bg button-bg:hover px-4 py-2 rounded shadow">
                  Update
                </button>
              </>
            )}
          </form>
        )}

        {/* Address Section */}
        {activeTab === "address" && user?.role !== "admin" && (
          <div className="space-y-4  p-4 rounded-md ">
            <h2 className="text-lg font-semibold text-brown-800">{editingAddressId ? "Edit Address" : "Add Address"}</h2>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Street" value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800" />
              <input type="text" placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800" />
              <input type="text" placeholder="State" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800" />
              <input type="text" placeholder="Zip Code" value={addressForm.zipCode} onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })} className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800" />
              <input type="text" placeholder="Landmark (optional)" value={addressForm.landmark} onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })} className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800 col-span-2" />
              <select value={addressForm.label} onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })} className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800">
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
              <label className="flex items-center col-span-2 gap-2 text-sm text-brown-800">
                <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })} />
                Set as default address
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddressSubmit} className="button-bg button-bg:hover px-4 py-2 rounded shadow">
                {editingAddressId ? "Update Address" : "Add Address"}
              </button>
              {editingAddressId && (
                <button onClick={resetAddressForm} className="bg-gray-300 text-brown-700 px-4 py-2 rounded">Cancel</button>
              )}
            </div>

            <h3 className="text-md font-semibold text-brown-700">Saved Addresses</h3>
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr._id} className="border border-brown-300 bg-white/60 p-4 rounded-md shadow">
                  <p className="font-semibold text-brown-800">{addr.label}</p>
                  <p className="text-sm text-brown-600">
                    {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}
                  </p>
                  {addr.landmark && <p className="text-sm text-brown-500">Landmark: {addr.landmark}</p>}
                  {addr.isDefault ? (
                    <p className="text-green-600 text-sm">✅ Default Address</p>
                  ) : (
                    <button onClick={() => handleSetDefault(addr._id)} className="text-sm text-blue-600 hover:underline">Set as Default</button>
                  )}
                  <div className="flex gap-4 mt-1 text-sm">
                    <button onClick={() => handleEditClick(addr)} className="text-yellow-700 hover:underline">Edit</button>
                    <button onClick={() => handleDeleteAddress(addr._id)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Change Password */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 p-4 rounded-md relative">
            <h2 className="text-lg font-semibold text-brown-800">Change Password</h2>

            {/* Old Password */}
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                placeholder="Old Password"
                className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800"
              />
              <button type="button" onClick={() => setShowOld(!showOld)} className="absolute inset-y-0 right-3 flex items-center top-2" tabIndex={-1}>
                {showOld ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="New Password"
                className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-3 flex items-center top-2" tabIndex={-1}>
                {showNew ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-brown-300 rounded-md bg-white text-brown-800"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-3 flex items-center top-2" tabIndex={-1}>
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button type="submit" className="button-bg button-bg:hover px-4 py-2 rounded shadow">
              Update Password
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Profile;
