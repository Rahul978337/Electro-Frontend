

import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import Swal from "sweetalert2"
import Switch from '@mui/material/Switch';




function ProductManager() {
  const [product, setProduct] = useState([])
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(product.length / itemsPerPage);
  const paginatedProduct = product.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );





  const fetchProduct = async () => {
    const response = await axios.get("https://electro-backend-m418.onrender.com/api/view/list", fetchProduct)

    if (response) {
      setProduct(response.data.data)
    } else {

    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const [categoryNmae, setCategoryName] = useState([]);

  const FetchCategoryName = async () => {
    const response = await axios.get("https://electro-backend-m418.onrender.com/find-category-name", FetchCategoryName)
    // console.log("categaory name",response)
    if (response) {
      setCategoryName(response.data.data)

    } else {

    }
  }
  useEffect(() => {
    FetchCategoryName()
  }, [])



  const searchProduct = async (e) => {
    e.preventDefault()

    const response = await axios.get("https://electro-backend-m418.onrender.com/api/search-product",
      {
        params: {
          name: name,
          cat_id: category
        }
      }
    )

    if (response.data.success) {
      setProduct(response.data.data || []);
      setCurrentPage(1);
    }
    else {
      console.log(response.data.message)
    }
  }

  const reset = (e) => {
    e.preventDefault()
    setName("")
    setCategory("")
    setCurrentPage(1);
    fetchProduct();
  }

  const handleDelete = async (id) => {
    // console.log("first886555",id)
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      text: "you will not be able to recover this item",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "yes,delet it",
      cancelButtonText: "no,cancel"


    })
    if (result.isConfirmed) {
      // Swal.fire("Saved!", "", "success");
      const response = await axios.delete(`https://electro-backend-m418.onrender.com/api/delete-product/${id}`)

      if (response.data.success) {
        fetchProduct()
        Swal.fire(
          'deleted',
          'your item has been deleted',
          'success'
        )

      } else {
        Swal.fire({
          title: "oooops!!!",
          text: response.data.message,
          icon: "error"
        })
      }

    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }


  }

  const handleChangeStatus = async (id, status) => {
    console.log("first886555", id, status)
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      // text: "you will not be able to recover this item",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "yes,change it",
      cancelButtonText: "no,cancel"


    })
    if (result.isConfirmed) {
      const body = {
        status: status
      }
      // Swal.fire("Saved!", "", "success");
      const response = await axios.post(`https://electro-backend-m418.onrender.com/updateStatusProduct/${id}`, body)

      if (response.data.success) {
        fetchProduct()
        Swal.fire({
          title: "success!!!",
          text: response.data.message,
          icon: "success"
        })

      } else {
        Swal.fire({
          title: "oooops!!!",
          text: response.data.message,
          icon: "error"
        })
      }

    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }


  }





  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <h3>Product Manager</h3>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">

            {/* Top Bar */}
            <form onSubmit={searchProduct}>
              <div className="row mb-3 align-items-center">

                <div className="col-lg-4 col-md-5 col-12 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* New Search By Category Input */}
                <div className="col-lg-3 col-md-4 col-12 mb-2">
                  <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Search by Category</option>
                    {
                      categoryNmae.map(value => (
                        <option key={value._id} value={value._id}>
                          {value.name}

                        </option>
                      ))
                    }
                    {/* <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="mobile">Mobile</option>
                    <option value="laptop">Laptop</option> */}
                  </select>
                </div>


                <div className="col-lg-3 col-md-4 col-12 mb-2">
                  <button className="btn btn-primary mr-2">Search</button>
                  <button className="btn btn-secondary" onClick={reset}>Reset</button>
                </div>

                <div className="col-lg-2 col-md-3 col-12 text-lg-right text-md-right">
                  <Link to="/admin/addProduct" className="btn btn-primary">
                    Add Product
                  </Link>
                </div>

              </div>
            </form>


            {/* Table */}
            <div className="card">

              <div className="card-body table-responsive">

                <table className="table table-bordered table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Created</th>
                      {/* <th>Status</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedProduct.length > 0 ? (
                      paginatedProduct.map((product, index) => (
                        <tr key={product._id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>
                            <img
                              src={product.image || "https://via.placeholder.com/50"}
                              alt="profile"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover"
                              }}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product?.cat_id ? product?.cat_id?.name : "N/A"}</td>

                          <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                          <td>{product.stock}</td>

                          <td>
                            <Moment format="D MMM YYYY" withTitle>
                              {product.createdAt}
                            </Moment>
                          </td>

                          {/* <td>{product.status ? "Active" : "Inactive"}</td> */}

                          <td>

                            <Switch
                              checked={product.status === true}
                              onClick={() => handleChangeStatus(product._id, product.status)}
                            // checked={checked}
                            // onChange={handleChange}
                            // slotProps={{ input: { 'aria-label': 'controlled' } }}
                            />
                            <Link to={`/admin/editProduct?_id=${product._id}`} className="btn btn-sm btn-info mr-2">
                              Edit
                            </Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-danger text-center">
                          No Products Found
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>

              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span className="text-muted">
                    Page {currentPage} of {totalPages} &nbsp;|&nbsp; Total: {product.length} products
                  </span>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary mr-2"
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      &laquo; Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`btn btn-sm mr-1 ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="btn btn-sm btn-outline-secondary ml-1"
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next &raquo;
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default ProductManager;