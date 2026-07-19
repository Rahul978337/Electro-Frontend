import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'


export default function OurProduct() {

  const [product, setProduct] = useState([])






  const fetchProduct = async () => {
    const response = await axios.get("https://electro-backend-m418.onrender.com/api/frontView/list", fetchProduct)

    if (response) {
      setProduct(response.data.data)
    } else {

    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userToken = localStorage.getItem("userToken");
  // const userId = "_id"; // 🔥 yaha real user id ayegi

  const addToCart = async (productId) => {
    if (!userId || !userToken || userId === "null" || userId === "undefined") {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please login first to add products to the cart!',
        confirmButtonText: 'Go to Login',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

  try {
    const response = await axios.post("https://electro-backend-m418.onrender.com/add-to-cart", {
      userId,
      productId
    });

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong ❌");
  }
};

  return (
    <div><>
          <ToastContainer />
    
      {/* Our Products Start */}
      <div className="container-fluid product pt-5">
        <div className="container py-5">
          <div className="tab-class">
            <div className="row g-4">
              <div
                className="col-lg-4 text-start wow fadeInLeft"
                data-wow-delay="0.1s"
              >
                <h1>Our Products</h1>
              </div>
              <div
                className="col-lg-8 text-end wow fadeInRight"
                data-wow-delay="0.1s"
              >
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item mb-4">
                    <a
                      className="d-flex mx-2 py-2 bg-light rounded-pill active"
                      data-bs-toggle="pill"
                      href="#tab-1"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        All Products
                      </span>
                    </a>
                  </li>
                  <li className="nav-item mb-4">
                    <a
                      className="d-flex py-2 mx-2 bg-light rounded-pill"
                      data-bs-toggle="pill"
                      href="#tab-2"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        New Arrivals
                      </span>
                    </a>
                  </li>
                  <li className="nav-item mb-4">
                    <a
                      className="d-flex mx-2 py-2 bg-light rounded-pill"
                      data-bs-toggle="pill"
                      href="#tab-3"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        Featured
                      </span>
                    </a>
                  </li>
                  <li className="nav-item mb-4">
                    <a
                      className="d-flex mx-2 py-2 bg-light rounded-pill"
                      data-bs-toggle="pill"
                      href="#tab-4"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        Top Selling
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>




            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">

                  {
                    product.map((item) => (

                      <div className="col-md-6 col-lg-4 col-xl-3" key={item._id}>
                        <div
                          className="product-item rounded wow fadeInUp h-100 d-flex flex-column"
                          data-wow-delay="0.1s"
                        >

                          <Link to={`/product?_id=${item._id}`} style={{ textDecoration: "none" }}>

                            <div className="product-item-inner border rounded h-100 d-flex flex-column">

                              <div className="product-item-inner-item">


                                <div className="w-100 overflow-hidden" style={{ height: "220px" }}>
                                  <img
                                    src={item.image}
                                    className="w-100 h-100 rounded-top"
                                    alt=""
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>

                                <div className="product-new">New</div>

                                <div className="product-details">
                                  <span className="d-block" style={{ cursor: "pointer", color: "white" }}>
                                    <i className="fa fa-eye fa-1x" />
                                  </span>
                                </div>

                              </div>

                              <div className="text-center rounded-bottom p-4 flex-grow-1">
                                <span className="d-block mb-2 h5" style={{ color: "inherit" }}>
                                  {item.name}
                                </span>

                                <span className="text-primary fs-5">
                                  ₹{item.price}
                                </span>
                              </div>

                            </div>

                          </Link>


                          <div className="product-item-add border border-top-0 rounded-bottom text-center p-4 pt-0 mt-auto">

                            <button
                              className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                              onClick={() => addToCart(item._id)}
                            >
                              <i className="fas fa-shopping-cart me-2" /> Add To Cart
                            </button>

                            <div className="d-flex justify-content-between align-items-center">

                              <div className="d-flex">
                                <i className="fas fa-star text-primary" />
                                <i className="fas fa-star text-primary" />
                                <i className="fas fa-star text-primary" />
                                <i className="fas fa-star text-primary" />
                                <i className="fas fa-star" />
                              </div>

                              <div className="d-flex">
                                <a href="#" className="text-primary me-3">
                                  <span className="rounded-circle btn-sm-square border">
                                    <i className="fas fa-random" />
                                  </span>
                                </a>

                                <a href="#" className="text-primary">
                                  <span className="rounded-circle btn-sm-square border">
                                    <i className="fas fa-heart" />
                                  </span>
                                </a>
                              </div>

                            </div>

                          </div>

                        </div>
                      </div>

                    ))
                  }


                </div>
              </div>
              <div id="tab-2" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-3.png"
                            className="img-fluid rounded-top"
                            alt=""
                          />
                          <div className="product-new">New</div>
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-4.png"
                            className="img-fluid w-100 rounded-top"
                            alt=""
                          />
                          <div className="product-new">New</div>
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>



                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-5.png"
                            className="img-fluid w-100 rounded-top"
                            alt=""
                          />
                          <div className="product-new">New</div>
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.7s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-6.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-new">New</div>
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-3" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-9.png"
                            className="img-fluid w-100 rounded-top"
                            alt=""
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-10.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-11.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.7s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-12.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-4" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-14.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-15.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-17.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="product-item rounded wow fadeInUp"
                      data-wow-delay="0.7s"
                    >
                      <div className="product-item-inner border rounded">
                        <div className="product-item-inner-item">
                          <img
                            src="img/product-16.png"
                            className="img-fluid w-100 rounded-top"
                            alt="Image"
                          />
                          <div className="product-details">
                            <a href="#">
                              <i className="fa fa-eye fa-1x" />
                            </a>
                          </div>
                        </div>
                        <div className="text-center rounded-bottom p-4">
                          <Link to={"/product"} className="d-block mb-2">
                            SmartPhone
                          </Link>
                          <a href="#" className="d-block h4">
                            Apple iPad Mini <br /> G2356
                          </a>
                          <del className="me-2 fs-5">$1,250.00</del>
                          <span className="text-primary fs-5">$1,050.00</span>
                        </div>
                      </div>
                      <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                        <a
                          href="#"
                          className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                        >
                          <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </a>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                          </div>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-3"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-random" />
                              </span>
                            </a>
                            <a
                              href="#"
                              className="text-primary d-flex align-items-center justify-content-center me-0"
                            >
                              <span className="rounded-circle btn-sm-square border">
                                <i className="fas fa-heart" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Products End */}
    </>
    </div>
  )
}
