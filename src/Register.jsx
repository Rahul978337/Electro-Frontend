

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


export default function Register() {
  const navigate = useNavigate();


  const [first_name, setFirstName] = useState("")
  const [last_name, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [address, setAddress] = useState("")
  const [image, setImage] = useState(null)

  // const registerUser = async (e) => {
  //   e.preventDefault();



  //   const formData = new FormData();

  //   formData.append("first_name", first_name)
  //   formData.append("last_name", last_name)
  //   formData.append("email", email)
  //   formData.append("password", password)
  //   formData.append("mobile", mobile)
  //   formData.append("address", address)
  //   formData.append("image", image)

  //   const response = await axios.post(
  //     "https://electro-backend-m418.onrender.com/api/v2/regiterUser",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     }
  //   )

  //   // console.log("response", response)

  //   if (response.data.sucess) {
  //     toast.success(response.data.message)
  //     setTimeout(() => {
  //       navigate('/', { replace: true });
  //     }, 1500);
  //   }
  //   else {
  //     toast.error(response.data.message)
  //     // console.log(error.response.data);
  //   }



  // }

  const registerUser = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("image", image);

    const response = await axios.post(
      "https://electro-backend-m418.onrender.com/api/v2/regiterUser",
      formData
    );

    console.log("Response:", response.data);

    if (response.data.sucess === true) {
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

  return (
    <div>
      <Topbar />
      <Navbar />
      <ToastContainer />


      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">

            <div className="card shadow p-4">
              <h3 className="text-center mb-4">Create Account</h3>

              <form onSubmit={registerUser}>
                {/* First + Last Name */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Last Name"
                      value={last_name}
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Mobile */}
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>


                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <button className="btn btn-primary w-100">
                  Register
                </button>

                <p className="text-center mt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </p>

              </form>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}