

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();



    const response = await axios.post(
      "http://localhost:8080/api/v2/loginUser",
      {
        email: email,
        password: password
      }
    )

    if (response.data.success) {

      const token = response.data.token
      const userId = response.data.data._id
      localStorage.setItem('userToken', token);
      localStorage.setItem('userId', userId);

      toast.success(response.data.message)

      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500)

    } else {

      toast.error(response.data.message)

    }



  }

  return (
    <div>

      <Topbar />
      <Navbar />
      <ToastContainer />

      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">

        <div className="row w-100 justify-content-center">

          <div className="col-lg-4 col-md-6 col-sm-10 col-11">

            <form onSubmit={handleSubmit}>

              <div className="card shadow-lg border-0 rounded-4 p-4 text-center">

                <h2 className="mb-1">Welcome Back 👋</h2>

                <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
                  Please login to your account
                </p>

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="d-flex justify-content-between align-items-center mb-3 small">

                  <label className="d-flex align-items-center gap-1">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                  </label>

                  <span className="text-primary" style={{ cursor: "pointer" }}>
                    Forgot Password?
                  </span>

                </div>

                <button className="btn w-100 text-white" style={{ background: "#D8863C" }}>
                  Login
                </button>

                <p className="mt-3 small">
                  Don't have an account?{" "}
                  <Link to={"/register"} className="text-primary">
                    Sign Up
                  </Link>
                </p>

              </div>

            </form>

          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}