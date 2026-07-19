import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyProfile() {

  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [email, setemail] = useState("")
  const [address, setaddress] = useState("")
  const [mobile, setmobile] = useState("")
  const [image, setImage] = useState("")




const get_id = localStorage.getItem("userId")
  const myprofile = async () => {
    
    const response = await axios.get(`https://electro-backend-m418.onrender.com/api/v1/customer-profile?_id=${get_id}`)

    console.log("response", response)


    if (response.data.success) {
      setfirst_name(response.data.data.first_name)
      setlast_name(response.data.data.last_name)
      setemail(response.data.data.email)
      setaddress(response.data.data.address)
      setImage(response.data.data.image)
      setmobile(response.data.data.mobile)
    }
  }


  useEffect(() => {
    myprofile();
  }, [])

  return (
    <div className="wrapper">
      <Topbar />
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Segoe UI, sans-serif",
          padding: "40px",
          background: "#fff"
        }}
      >
        <div
          style={{
            width: "850px",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            overflow: "hidden"
          }}
        >

          {/* Header */}
          <div
            style={{
              height: "90px",
              background: "linear-gradient(90deg,#CC5500,#ff8c00)"
            }}
          ></div>

          <div style={{ padding: "40px" }}>

            {/* Profile Top */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img
                  src={image}
                  alt="profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: "5px solid #CC5500",
                    marginTop: "-80px",
                    background: "#fff",
                    objectFit: "cover"
                  }}
                />

                <div>
                  <h3 style={{ margin: 0, marginTop: "-20px", color: "#CC5500" }}>
                    MY ACCOUNT
                  </h3>
                  {/* <p style={{ margin: "5px 0", color: "#6b7280" }}>
                    Update Your Profile Information
                  </p> */}
                </div>
              </div>
              <Link to={`/editcustomerprofile?_id=${get_id}`} 
                style={{
                  padding: "10px 25px",
                  background: "#CC5500",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Edit
              </Link>
            </div>

            {/* FORM */}
            <form>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "25px"
                }}
              >

                {/* First Name */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    value={first_name}

                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Last Name */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Last Name
                  </label>
                  <input
                    value={last_name}
                    type="text"
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Email
                  </label>
                  <input
                    value={email}
                    type="email"
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Mobile */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Mobile Number
                  </label>
                  <input
                    value={mobile}
                    type="text"
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>






                {/* Address */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gridColumn: "1 /span 2"

                  }}
                >
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Address
                  </label>
                  <textarea
                    value={address}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      resize: "none",
                      minHeight: "80px"
                    }}
                  />
                </div>
              </div>

              {/* Update Button */}
              {/* <div style={{ marginTop: "40px", textAlign: "right" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 35px",
                    background: "linear-gradient(90deg,#ffc000,#A94400)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(204,85,0,0.4)"
                  }}
                >
                  Update Profile
                </button>
              </div> */}
            </form>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
