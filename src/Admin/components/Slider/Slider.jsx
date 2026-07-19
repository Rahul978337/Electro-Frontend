import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Switch from "@mui/material/Switch";

function SliderManager() {
  const [sliders, setSliders] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sliders.length / itemsPerPage);
  const paginatedSliders = sliders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchSliders = async () => {
    const response = await axios.get("https://electro-backend-m418.onrender.com/api/get-all-sliders");
    if (response) {
      setSliders(response.data.data || []);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this slider!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      const response = await axios.delete(
        `https://electro-backend-m418.onrender.com/api/delete-slider/${id}`
      );
      if (response.data.success) {
        fetchSliders();
        Swal.fire("Deleted!", "Slider has been deleted.", "success");
      } else {
        Swal.fire("Error!", response.data.message, "error");
      }
    }
  };

  const handleChangeStatus = async (id, currentStatus) => {
    const result = await Swal.fire({
      title: "Change slider status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      const response = await axios.put(
        `https://electro-backend-m418.onrender.com/api/update-slider/${id}`,
        { status: !currentStatus }
      );
      if (response.data.success) {
        fetchSliders();
        Swal.fire({ title: "Success!", text: response.data.message, icon: "success" });
      } else {
        Swal.fire({ title: "Error!", text: response.data.message, icon: "error" });
      }
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Slider Manager</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <h3 className="card-title m-0 font-weight-bold">Slider List</h3>
                <div className="ml-auto">
                  <Link to="/admin/addSlider" className="btn btn-success">
                    <i className="fas fa-plus mr-2"></i>
                    Add Slider
                  </Link>
                </div>
              </div>

              <div className="card-body">
                <table className="table table-bordered table-striped text-center">
                  <thead className="thead-dark">
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Button Text</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSliders.length > 0 ? (
                      paginatedSliders.map((slider, index) => (
                        <tr key={slider._id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>
                            <img
                              src={slider.image || "https://via.placeholder.com/80x50"}
                              alt={slider.title}
                              style={{
                                width: "80px",
                                height: "50px",
                                borderRadius: "6px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{slider.title}</td>
                          <td>{slider.subtitle}</td>
                          <td>{slider.buttonText}</td>
                          <td>
                            <Switch
                              checked={slider.status === true}
                              onClick={() => handleChangeStatus(slider._id, slider.status)}
                            />
                          </td>
                          <td>
                            <Link
                              to={`/admin/editSlider?_id=${slider._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(slider._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-danger">
                          No Sliders Found
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
                    Page {currentPage} of {totalPages} &nbsp;|&nbsp; Total:{" "}
                    {sliders.length} sliders
                  </span>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary mr-2"
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      &laquo; Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          className={`btn btn-sm mr-1 ${
                            currentPage === page
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      className="btn btn-sm btn-outline-secondary ml-1"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
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

export default SliderManager;
