import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from 'react-moment';

import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';

function OrderDetails() {

  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`https://electro-backend-m418.onrender.com/api/Orders-details`);
      console.log("first",res)
      if (res.data.success) {
        setOrders(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* Header */}
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Order Details</h1>
          </div>
        </div>

        
        <div className="content">
          <div className="container-fluid">

           
            <div className="card">
              <div className="card-body table-responsive p-0">

                <table className="table table-hover text-nowrap">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>S.No</th>
                      <th>User</th>
                      <th>Order ID</th>
                      <th>Products</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedOrders.length > 0 ? (
                      paginatedOrders.map((order, index) => (
                        <tr key={order._id} className="text-center">

                        
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                        
                        <td>
                          <img
                            src={order.user?.image || "https://via.placeholder.com/50?text=User"}
                            alt={order.user?.name || "User"}
                            width="50"
                            height="50"
                            className="rounded-circle"
                            style={{ objectFit: 'cover' }}
                          />
                          <br />
                          <small>{order.user?.name}</small><br />
                          <small>{order.user?.mobile}</small><br />

                          <small>{order.user?.email}</small>

                        </td>

                        
                        <td>{order._id}</td>

                        
                        <td className="text-start">
                          {order.productId?.map((item, i) => (
                            <div key={i}>
                              {item.name} (Qty: {item.quantity})
                            </div>
                          ))}
                        </td>

                        
                        <td>
                          <Moment format="D MMM YYYY" withTitle>
                            {order.createdAt}
                          </Moment>
                        </td>

                       
                        <td>₹{Number(order.totalAmount).toLocaleString("en-IN")}</td>

                        
                        <td>
                          <span
                            className={`badge ${
                              order.paymentStatus === "Pending"
                                ? "bg-warning"
                                : "bg-success"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>

                      </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-danger">No Orders Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>

              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span className="text-muted">
                    Page {currentPage} of {totalPages} &nbsp;|&nbsp; Total: {orders.length} orders
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

export default OrderDetails;