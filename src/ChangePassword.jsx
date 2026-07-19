import React, { useState } from "react";
import axios from "axios";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    oldpassword: "",
    newpassword: "",
    confirmPassword: ""
  });

  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!passwords.oldpassword || !passwords.newpassword || !passwords.confirmPassword) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }
    if (passwords.newpassword !== passwords.confirmPassword) {
      Swal.fire("Error", "New password and confirm password do not match!", "error");
      return;
    }
    
    try {
      const response = await axios.post(
        `https://electro-backend-m418.onrender.com/changePassword/${userId}`,
        {
          oldpassword: passwords.oldpassword,
          newpassword: passwords.newpassword
        }
      );

      if (response.data.success || response.data.sucess) {
        Swal.fire("Success!", "Password Changed Successfully!", "success");
        setPasswords({
          oldpassword: "",
          newpassword: "",
          confirmPassword: ""
        });
      } else {
        Swal.fire("Failed", response.data.message || "Failed to change password.", "error");
      }
    } catch (error) {
      console.log("Change password error:", error);
      Swal.fire("Error", "An error occurred while changing password.", "error");
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
            Change Password
          </div>

          <div style={{ padding: "30px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", marginTop: "20px" }}>
              <div>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Old Password</label>
                <input
                  type="password"
                  name="oldpassword"
                  value={passwords.oldpassword}
                  onChange={handleChange}
                  placeholder="Enter old password"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>New Password</label>
                <input
                  type="password"
                  name="newpassword"
                  value={passwords.newpassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  style={inputStyle}
                />
              </div>
            </div>

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
                Update Password
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
