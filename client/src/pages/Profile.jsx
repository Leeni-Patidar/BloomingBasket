import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
// import MyOrders from "../components/MyOrders";

const Profile = () => {
  const { user, token, updateProfile, changePassword } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState({ name: "", email: "", phone: "" });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
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
      console.error("Address fetch failed", err);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ phone: profileData.phone });
  };

  const handleAddAddress = async () => {
    try {
      const { data } = await axios.post("/api/addresses", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses([...addresses, data]);
      setNewAddress({ street: "", city: "", state: "", zipCode: "", country: "India" });
      toast.success("Address added");
    } catch (err) {
      toast.error("Add address failed");
    }
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
      <div className="flex gap-8">
        <aside className="w-1/4 space-y-2">
          <button onClick={() => setActiveTab("personal")} className="block w-full py-2 text-left hover:bg-gray-200">
            Personal Info
          </button>
          <button onClick={() => setActiveTab("address")} className="block w-full py-2 text-left hover:bg-gray-200">
            Address
          </button>
          <button onClick={() => setActiveTab("password")} className="block w-full py-2 text-left hover:bg-gray-200">
            Change Password
          </button>
          <button onClick={() => setActiveTab("orders")} className="block w-full py-2 text-left hover:bg-gray-200">
            My Orders
          </button>
        </aside>

        <main className="w-3/4">
          {activeTab === "personal" && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <input
                type="text"
                name="name"
                value={profileData.name}
                disabled
                className="input bg-gray-100 cursor-not-allowed"
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                disabled
                className="input bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="Phone"
                className="input"
              />
              <button type="submit" className="btn">
                Update Phone Number
              </button>
            </form>
          )}

          {activeTab === "address" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Addresses</h2>
              {addresses.map((addr) => (
                <div key={addr._id} className="border p-2 rounded">
                  <p>
                    {addr.street}, {addr.city}, {addr.state}, {addr.zipCode},{" "}
                    {addr.country}
                  </p>
                  <button
                    onClick={() => handleDeleteAddress(addr._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  className="input"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="input"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={newAddress.zipCode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value })
                  }
                  className="input"
                />
              </div>
              <button onClick={handleAddAddress} className="btn mt-2">
                Add Address
              </button>
            </div>
          )}

          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <input
                type="password"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, oldPassword: e.target.value })
                }
                placeholder="Old Password"
                className="input"
              />
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                placeholder="New Password"
                className="input"
              />
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirmPassword: e.target.value })
                }
                placeholder="Confirm Password"
                className="input"
              />
              <button type="submit" className="btn">
                Update Password
              </button>
            </form>
          )}

          {/* {activeTab === "orders" && <MyOrders />} */}
        </main>
      </div>
    </div>
  );
};

export default Profile;
