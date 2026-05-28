

import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Topbar() {

  const [category_id, setCategory_id] = useState("")
  const [category, setCategory] = useState([])

  const navigate = useNavigate()

  // ✅ TOKEN CHECK
  const token = localStorage.getItem("userToken")

  const FetchCategoryName = async () => {
    try {
      const response = await axios.get("http://localhost:8080/find-category-name")
      if (response && response.data && response.data.data) {
        setCategory(response.data.data)
      }
    } catch (error) {
      console.log("Error fetching categories:", error)
    }
  }
  useEffect(() => {
    FetchCategoryName()
  }, [])
  
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
        navigate("/Login");
      }
    });
  }

  return (
    <div>
      <>
        {/* Topbar Start */}
        <div className="container-fluid px-5 d-none border-bottom d-lg-block">
          <div className="row gx-0 align-items-center">

            {/* LEFT */}
            <div className="col-lg-4 text-center text-lg-start mb-lg-0">
              <div className="d-inline-flex align-items-center" style={{ height: 45 }}>
                <a href="#" className="text-muted me-2">Help</a>
                <small> / </small>
                <a href="#" className="text-muted mx-2">Support</a>
                <small> / </small>
                <a href="#" className="text-muted ms-2">Contact</a>
              </div>
            </div>

            {/* CENTER */}
            <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">
              <small className="text-dark">Call Us:</small>
              <a href="#" className="text-muted">
                (+012) 1234 567890
              </a>
            </div>

            {/* RIGHT (IMPORTANT PART 🔥) */}
            <div className="col-lg-4 text-center text-lg-end">
              <div className="d-inline-flex align-items-center" style={{ height: 45 }}>

                {/* Currency */}
                <div className="dropdown">
                  <a href="#" className="dropdown-toggle text-muted me-2" data-bs-toggle="dropdown">
                    <small>USD</small>
                  </a>
                  <div className="dropdown-menu rounded">
                    <a href="#" className="dropdown-item">Euro</a>
                    <a href="#" className="dropdown-item">Dollar</a>
                  </div>
                </div>

                {/* Language */}
                <div className="dropdown">
                  <a href="#" className="dropdown-toggle text-muted mx-2" data-bs-toggle="dropdown">
                    <small>English</small>
                  </a>
                  <div className="dropdown-menu rounded">
                    <a href="#" className="dropdown-item">English</a>
                    <a href="#" className="dropdown-item">Turkish</a>
                    <a href="#" className="dropdown-item">Spanish</a>
                    <a href="#" className="dropdown-item">Italiano</a>
                  </div>
                </div>

                {/* ✅ LOGIN / DASHBOARD CONDITION */}
                {token ? (
                  // ✅ USER LOGGED IN
                  <div className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle text-muted ms-2"
                      data-bs-toggle="dropdown"
                    >
                      <small>
                        <i className="fa fa-home me-2" /> My Dashboard
                      </small>
                    </a>
                    <div className="dropdown-menu rounded">

                      <Link to={"/myprofile"} className="dropdown-item">
                        My Account
                      </Link>
                       <Link to={"/myorders"} className="dropdown-item">
                        My Orders
                      </Link>
                      <Link to={"/change-password"} className="dropdown-item">
                        Change Password
                      </Link>


                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>

                    </div>
                  </div>
                ) : (
                  // ❌ USER NOT LOGGED IN
                  <Link to="/Login" className="text-muted ms-2">
                    <small>
                      <i className="fa fa-user me-2" /> Login
                    </small>
                  </Link>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="container-fluid px-5 py-4 d-none d-lg-block">
          <div className="row gx-0 align-items-center text-center">

            {/* LOGO */}
            <div className="col-md-4 col-lg-3 text-center text-lg-start">
              <div className="d-inline-flex align-items-center">
                <Link to={"/"} className="navbar-brand p-0">
                  <h1 className="display-5 text-primary m-0">
                    <i className="fas fa-shopping-bag text-secondary me-2" />
                    Electro
                  </h1>
                </Link>
              </div>
            </div>

            {/* SEARCH */}
            <div className="col-md-4 col-lg-6 text-center">
              <div className="position-relative ps-4">
                <div className="d-flex border rounded-pill">

                  <input
                    className="form-control border-0 rounded-start-pill w-100 py-3 ps-4"
                    type="search"
                    placeholder="Search Looking For?"
                    autoComplete="off"
                    name="main_search"
                  />

                  {/* CATEGORY SELECT */}
                  <select
                    className="form-select text-dark border-0 border-start rounded-0 py-3 ps-3 pe-5"
                    style={{ width: 180 }}
                    value={category_id}
                    onChange={(e) => setCategory_id(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {category.map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn btn-primary rounded-end-pill py-3 px-5 border-0"
                  >
                    <i className="fas fa-search" />
                  </button>

                </div>
              </div>
            </div>

            {/* RIGHT ICONS */}
            <div className="col-md-4 col-lg-3 text-center text-lg-end">
              <div className="d-inline-flex align-items-center">

                <a href="#" className="text-muted d-flex align-items-center justify-content-center me-3">
                  <span className="rounded-circle btn-md-square border">
                    <i className="fas fa-random" />
                  </span>
                </a>

                <a href="#" className="text-muted d-flex align-items-center justify-content-center me-3">
                  <span className="rounded-circle btn-md-square border">
                    <i className="fas fa-heart" />
                  </span>
                </a>

                <Link to={"/cart"} className="text-muted d-flex align-items-center justify-content-center">
                  <span className="rounded-circle btn-md-square border">
                    <i className="fas fa-shopping-cart" />
                  </span>
                  {/* <span className="text-dark ms-2">$0.00</span> */}
                </Link>

              </div>
            </div>

          </div>
        </div>

        {/* Topbar End */}
      </>
    </div>
  )
}