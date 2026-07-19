import React, { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MyProfile() {

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    image: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const userId = localStorage.getItem("userId");
  const IMAGE_BASE_URL = "https://electro-backend-m418.onrender.com/uploads/users/";

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://electro-backend-m418.onrender.com/myProfile/${userId}`);
      if (response.data.success || response.data.sucess) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.log("Fetch profile error:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Update profile
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", userData.first_name);
      formData.append("last_name", userData.last_name);
      formData.append("email", userData.email);
      formData.append("mobile", userData.mobile);
      formData.append("address", userData.address);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post(
        `https://electro-backend-m418.onrender.com/api/update-user/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success || response.data.sucess) {
        alert("Profile Updated Successfully!");
        setSelectedImage(null);
        fetchProfile();
      }
    } catch (error) {
      console.log("Update profile error:", error);
    }
  };

  return (
    <div>
      <Topbar />
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px",
          background: "#fff",
          fontFamily: "Segoe UI, sans-serif"
        }}
      >
        <div
          style={{
            width: "900px",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            overflow: "hidden"
          }}
        >
          {/* Orange Header Banner — same as MyOrders */}
          <div
            style={{
              height: "50px",
              background: "linear-gradient(90deg,#CC5500,#ff8c00)",
              display: "flex",
              alignItems: "center",
              paddingLeft: "30px",
              color: "#fff",
              fontSize: "22px",
              fontWeight: "600"
            }}
          >
            My Profile
          </div>

          <div style={{ padding: "30px" }}>

            {/* Avatar + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "25px" }}>
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : userData.image
                      ? `${IMAGE_BASE_URL}${userData.image}`
                      : "https://via.placeholder.com/80x80?text=User"
                }
                alt="profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "3px solid #CC5500",
                  objectFit: "cover"
                }}
              />
              <div>
                <h5 style={{ margin: 0, color: "#CC5500", fontWeight: 700 }}>
                  {userData.first_name} {userData.last_name}
                </h5>
                <small style={{ color: "#6b7280" }}>{userData.email}</small>
                <div style={{ marginTop: "8px" }}>
                  <label
                    htmlFor="userImageInput"
                    style={{
                      cursor: "pointer",
                      background: "#CC5500",
                      color: "#fff",
                      padding: "4px 14px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600
                    }}
                  >
                    Change Photo
                  </label>
                  <input
                    id="userImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#F2C6A0" }} />

            {/* Form */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>

              <div>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={userData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: "1 / span 2" }}>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Address</label>
                <textarea
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  rows="3"
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

            </div>

            {/* Update Button */}
            <div style={{ textAlign: "right", marginTop: "25px" }}>
              <button
                onClick={handleUpdate}
                style={{
                  background: "linear-gradient(90deg,#CC5500,#ff8c00)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 30px",
                  borderRadius: "25px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer"
                }}
              >
                Update Profile
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #F2C6A0",
  background: "#FFF4EC",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};
