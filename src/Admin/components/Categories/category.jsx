

import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Swal from "sweetalert2"
import Switch from '@mui/material/Switch';



function Category() {

  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(category.length / itemsPerPage);
  const paginatedCategory = category.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const fetchUsers = async () => {
    const response = await axios.get("https://electro-backend-m418.onrender.com/api/category/list");

    if (response) {
      setCategory(response.data.data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchCategory = async (e) => {
    e.preventDefault()

    const response = await axios.get("https://electro-backend-m418.onrender.com/api/v1/searchCategory",
      {
        params: {
          name: name
        }
      }
    )
    // console.log("searchUser",response)
    if (response.data.success) {
      setCategory(response.data.data || []);
      setCurrentPage(1);
    }
    else {
      console.log(response.data.message)
    }
  }

  const reset = (e) => {
    e.preventDefault()
    setName("")
    setCurrentPage(1);
    fetchUsers();
  }

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
      const response = await axios.delete(`https://electro-backend-m418.onrender.com/api/delete-category/${id}`)

      if (response.data.success) {
        fetchUsers()
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
      const response = await axios.post(`https://electro-backend-m418.onrender.com/updateStatusCategory/${id}`, body)

      if (response.data.success) {
        fetchUsers()
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

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Category Manager</h1>
            <form onSubmit={searchCategory}>

              <div className="row mt-3">
                {/* <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Category Name"
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value)}}
                />
              </div> */}
                <div className="col-lg-4 col-md-6 col-12 mb-3">

                  <select className="form-control"
                    value={name}


                    onChange={(e) => setName(e.target.value)}>
                    <option>select category</option>
                    {
                      categoryNmae.map((value) => (
                        <option value={value.name}>{value.name}</option>

                      ))
                    }


                  </select>
                </div>


                <div className="col-md-2">
                  <button className="btn btn-primary mr-2">Search</button>
                  <button className="btn btn-secondary" onClick={reset}>Reset</button>
                </div>
              </div>
            </form>

          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="card">

              <div className="card-header d-flex align-items-center">
                <h3 className="card-title m-0 font-weight-bold">
                  Category List
                </h3>

                <div className="ml-auto">
                  <Link to="/admin/addCategory" className="btn btn-success">
                    <i className="fas fa-plus mr-2"></i>
                    Add Category
                  </Link>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-bordered table-striped text-center">
                  <thead className="thead-dark">
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Created</th>
                      {/* <th>Status</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedCategory.length > 0 ? (
                      paginatedCategory.map((category, index) => (
                        <tr key={category._id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                          <td>
                            <img
                              src={category.image || "https://via.placeholder.com/50"}
                              alt="category"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "6px",
                                objectFit: "cover"
                              }}
                            />
                          </td>

                          <td>{category.name}</td>
                          <td>{category.description}</td>

                          <td>
                            <Moment format="D MMM YYYY" withTitle>
                              {category.createdAt}
                            </Moment>
                          </td>

                          {/* <td>{category.status ? "Active" : "Inactive"}</td> */}


                          <td>

                            <Switch
                              checked={category.status === true}
                              onClick={() => handleChangeStatus(category._id, category.status)}
                            // checked={checked}
                            // onChange={handleChange}
                            // slotProps={{ input: { 'aria-label': 'controlled' } }}
                            />
                            <Link
                              to={`/admin/editCategory?_id=${category._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>

                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-danger">
                          No Categories Found
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
                    Page {currentPage} of {totalPages} &nbsp;|&nbsp; Total: {category.length} categories
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
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Category;