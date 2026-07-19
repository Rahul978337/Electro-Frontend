



import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

export default function MyProfile() {

  const [adminData, setAdminData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    image: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const adminId = localStorage.getItem("adminId");

  const IMAGE_BASE_URL = "https://electro-backend-m418.onrender.com/uploads/users/";

  // 🔹 Fetch Admin Profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://electro-backend-m418.onrender.com/myProfile/${adminId}`);
      if (response.data.success || response.data.sucess) {
        setAdminData(response.data.data);
      }
    } catch (error) {
      console.log("Fetch profile error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Handle Image Selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // 🔹 Update Profile
  // const handleUpdate = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("first_name", adminData.first_name);
  //     formData.append("last_name", adminData.last_name);
  //     formData.append("email", adminData.email);
  //     formData.append("mobile", adminData.mobile);
  //     formData.append("address", adminData.address);
  //     if (selectedImage) {
  //       formData.append("image", selectedImage);
  //     }

  //     const response = await axios.put(
  //       `https://electro-backend-m418.onrender.com/api/update-user/${adminId}`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     if (response.data.success || response.data.sucess) {
  //       alert("Profile Updated Successfully!");
  //       setSelectedImage(null);
  //       fetchProfile();
  //     }

  //   } catch (error) {
  //     console.log("Update profile error:", error);
  //   }
  // };

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">My Profile</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10">

                {/* Blue Banner */}
                <div style={{
                  height: "100px",
                  background: "linear-gradient(90deg,#2563eb,#1e3a8a)",
                  borderRadius: "12px 12px 0 0"
                }}></div>

                <div className="card" style={{ borderRadius: "0 0 12px 12px", marginTop: 0 }}>
                  <div className="card-body" style={{ padding: "30px" }}>

                    {/* Top: Avatar + Name + Update Button */}
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div className="d-flex align-items-center" style={{ gap: "20px" }}>

                        {/* Avatar */}
                        <img
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : adminData.image
                                ? `${IMAGE_BASE_URL}${adminData.image}`
                                : "https://via.placeholder.com/100x100?text=Admin"
                          }
                          alt="profile"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            border: "4px solid #2563eb",
                            objectFit: "cover",
                            marginTop: "-60px",
                            background: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                          }}
                        />

                        <div style={{ marginTop: "-10px" }}>
                          <h4 className="mb-0" style={{ color: "#1e3a8a", fontWeight: 700 }}>
                            {adminData.first_name} {adminData.last_name}
                          </h4>
                          <small className="text-muted">{adminData.email}</small>
                          <div className="mt-2">
                            <label
                              htmlFor="profileImageInput"
                              className="btn btn-sm btn-outline-primary mb-0"
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fas fa-camera mr-1"></i> Change Photo
                            </label>
                            <input
                              id="profileImageInput"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>

                      </div>

                      <button
                        
                        className="btn btn-primary"
                        style={{ fontWeight: 600 }}
                      >
                        <i className="fas fa-save mr-1"></i> Update Profile
                      </button>
                    </div>

                    <hr />

                    {/* Form Fields */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="font-weight-bold">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={adminData.first_name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter first name"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="font-weight-bold">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={adminData.last_name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter last name"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="font-weight-bold">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={adminData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter email"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="font-weight-bold">Mobile</label>
                        <input
                          type="text"
                          name="mobile"
                          value={adminData.mobile}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter mobile number"
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="font-weight-bold">Address</label>
                        <textarea
                          name="address"
                          value={adminData.address}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                          placeholder="Enter address"
                        />
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}