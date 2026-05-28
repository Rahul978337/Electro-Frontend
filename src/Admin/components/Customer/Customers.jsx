
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Swal from "sweetalert2"
import Switch from '@mui/material/Switch';

function Customer() {

  const [customers, setCustomers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const paginatedCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/getAllUsers");

    if (response) {
      setCustomers(response.data.data || []);
      console.log("first", response.data.data)

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchCustomer = async (e) => {
    e.preventDefault()

    const response = await axios.get("http://localhost:8080/api/v1/searchUsers",
      {
        params: {
          first_name: firstName,
          email: email,
          mobile: mobile
        }
      }
    )
    console.log("searchUser", response)
    if (response.data.success) {
      setCustomers(response.data.data || []);
      setCurrentPage(1); // Reset page on new search
    }
    else {
      setCustomers([]);
      console.log(response.data.message)
    }
  }

  const reset = (e) => {
    e.preventDefault()
    setFirstName("")
    setEmail("")
    setMobile("")
    setCurrentPage(1);
    fetchUsers();
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
      const response = await axios.delete(`http://localhost:8080/api/v1/delet-user/${id}`)

      if (response.data.success) {
        fetchUsers()
        Swal.fire(
          'deleted',
          'user has been deleted',
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
      text: "you will not be able to recover this item",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "yes,delet it",
      cancelButtonText: "no,cancel"


    })
    if (result.isConfirmed) {
      const body = {
        status: status
      }
      // Swal.fire("Saved!", "", "success");
      const response = await axios.post(`http://localhost:8080/updateStatus/${id}`, body)

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
            <h1 className="m-0">Customers Manager</h1>
            <form onSubmit={searchCustomer}>

              <div className="row mt-3">

                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>

                <div className="col-md-3 d-flex">
                  <button
                    className="btn btn-primary mr-2"
                    style={{ width: "50%", height: "40px", fontSize: "16px", fontWeight: "600" }}
                  >
                    Search
                  </button>

                  <button
                    className="btn btn-secondary"
                    style={{ width: "50%", height: "40px", fontSize: "16px", fontWeight: "600" }}
                    onClick={reset}
                  >
                    Reset
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="content">
          <div className="container-fluid">
            <div className="card">

              <div className="card-header d-flex align-items-center">
                <h3 className="card-title m-0 font-weight-bold">
                  Customer List
                </h3>

                <div className="ml-auto">
                  <Link to="/admin/add-customer" className="btn btn-success">
                    <i className="fas fa-plus mr-2"></i>
                    Add Customer
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
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Created</th>
                      {/* <th>Status</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedCustomers.length > 0 ? (
                      paginatedCustomers.map((customers, index) => (
                        <tr key={customers.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                          <td>
                            <img
                              src={customers.image || "https://via.placeholder.com/50"}
                              alt="profile"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover"
                              }}
                            />
                          </td>

                          <td>{customers.first_name} {customers.last_name}</td>
                          <td>{customers.mobile}</td>
                          <td>{customers.email}</td>

                          <td>
                            <Moment format="D MMM YYYY" withTitle>
                              {customers.createdAt}
                            </Moment>
                          </td>

                          {/* <td>{customers.status ? "Active" : "Inactive"}</td> */}


                          <td>
                            <Switch
                              checked={customers.status === true}
                              onClick={() => handleChangeStatus(customers._id, customers.status)}
                            // checked={checked}
                            // onChange={handleChange}
                            // slotProps={{ input: { 'aria-label': 'controlled' } }}
                            />

                            <Link to={`/admin/Edit-customer?_id=${customers._id}`} className="btn btn-sm btn-primary mr-2">
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customers._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-danger">
                          No Customers Found
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
                    Page {currentPage} of {totalPages} &nbsp;|&nbsp; Total: {customers.length} customers
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

export default Customer;