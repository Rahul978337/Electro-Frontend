import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

function ContactDetails() {

  const [contacts, setContacts] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const paginatedContacts = contacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      const res = await axios.get("https://electro-backend-m418.onrender.com/api/allContact"); 
      console.log("first",res)
      setContacts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  
  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1>Contact Manager</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Contact List</h3>
              </div>

              <div className="card-body table-responsive">
                <table className="table table-bordered table-hover text-center">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Project</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedContacts.length > 0 ? (
                      paginatedContacts.map((item, index) => (
                        <tr key={item._id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>{item.project}</td>
                          <td>{item.subject}</td>
                          <td>{item.message}</td>
                          <td>
                            <Moment format="D MMM YYYY" withTitle>
                              {item.createdAt}
                            </Moment>
                          </td>

                          <td>
                            <button 
                              className="btn btn-danger btn-sm"
                              
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9">No Data Found</td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span className="text-muted">
                    Page {currentPage} of {totalPages} &nbsp;|&nbsp; Total: {contacts.length} contacts
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

export default ContactDetails;