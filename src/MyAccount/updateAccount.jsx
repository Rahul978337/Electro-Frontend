import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { Link, useNavigate ,useSearchParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Footer from "./Footer";

function EditCustomerProfile() {
  const [searchParams] = useSearchParams();
  const _id = searchParams.get("_id");
  console.log("_id",_id)

  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [address, setAddress] = useState("")
  const [image, setImage] = useState()


  const navigate = useNavigate();

   const myprofile = async () => {
    
    const response = await axios.get(`http://localhost:8080/api/v1/customer-profile?_id=${_id}`)

    console.log("response", response)


    if (response.data.success) {
      setFirstName(response.data.data.first_name)
      setlastName(response.data.data.last_name)
      setEmail(response.data.data.email)
      setAddress(response.data.data.address)
      setImage(response.data.data.image)
      setMobile(response.data.data.mobile)
    }
  }


  useEffect(() => {
    myprofile();
  }, [])


  const editcustomer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("email", email)
    formData.append("mobile", mobile)
    formData.append("address", address)
    formData.append("image", image)

    const response = await axios.put(`http://localhost:8080/updateprofile?_id=${_id}`, formData)

    if (response.data.success) {
      toast.success(response.data.message)
      setTimeout(()=>{
        navigate('/myprofile',{replace:true})
      },1500)
    }
    else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className="wrapper">
      <Topbar />
      <Navbar />
      <Toaster />

      <div className="content-wrapper">
        {/* <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Edit Customer Profile</h1>
          </div>
        </div> */}

        <div className="content" style={{marginTop:"30px",marginBottom:"20px"}}>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-9">

                <div className="card shadow-lg border-0" style={{ minHeight: "550px" }}>

                  <div className="card-header bg-primary text-white">
                    <h3 className="card-title m-0">Customer Information</h3>
                  </div>

                  <div className="card-body p-5 d-flex flex-column justify-content-between">
                    
                    <form onSubmit={editcustomer}>

                      {/* Row 1: First Name + Last Name */}
                      <div className="row">
                        <div className="form-group col-md-6 mb-3">
                          <label>First Name<span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            required
                          />
                        </div>

                        <div className="form-group col-md-6 mb-3">
                          <label>Last Name<span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            required
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>

                      {/* Row 2: Email + Mobile */}
                      <div className="row">
                        <div className="form-group col-md-6 mb-3">
                          <label>Email<span style={{color:"red"}}>*</span></label>
                          <input
                            type="email"
                            className="form-control custom-input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                          />
                        </div>

                        <div className="form-group col-md-6 mb-3">
                          <label>Mobile<span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter mobile number"
                          />
                        </div>
                      </div>

                      {/* Row 3: Address + Image */}
                      <div className="row">
                        <div className="form-group col-md-6 mb-3">
                          <label>Address<span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                          />
                        </div>

                        <div className="form-group col-md-6 mb-3">
                          <label>Image<span style={{color:"red"}}>*</span></label>
                          <input
                            type="file"
                            className="form-control custom-input"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-4">
                      <Link
                        to="/myprofile"
                        className="btn btn-secondary"
                      >
                        Cancel
                      </Link>

                      {/* <button
                        type="submit"
                        // onClick={editcustomer}
                        className="btn btn-success"
                      >
                        Save Customer
                      </button> */}
                      <button type="submit" className="btn btn-success">Save Customer</button>
                    </div>

                    </form>

                    

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default EditCustomerProfile;