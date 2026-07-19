







import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
  import { ToastContainer, toast } from 'react-toastify';


function AddCustomer() {
  const navigate = useNavigate();


 const [first_name,setFirstName]=useState("")
 const [last_name,setlastName]=useState("")
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [mobile,setMobile]=useState("")
 const [address,setAddress]=useState("")
 const [role,setRole]=useState("user")
 const [image,setImage]=useState(null)

 const addcustomer=async(e)=>{
  e.preventDefault();

  try{

    const formData= new FormData();

    formData.append("first_name",first_name)
    formData.append("last_name",last_name)
    formData.append("email",email)
    formData.append("password",password)
    formData.append("mobile",mobile)
    formData.append("address",address)
    formData.append("role",role)
    formData.append("image",image)

    const response=await axios.post(
      "https://electro-backend-m418.onrender.com/api/v1/addUser",
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    )

    console.log("response",response)

    if(response.data.sucess){
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/admin/customer', { replace: true });
      }, 1500);
    }
    else{
       toast.error(response.data.message)
    }

  }catch(error){
    console.log("Backend Error",error.response?.data)
  }

 }

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />
      <ToastContainer />


      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Add Customer</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10">

                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="card-title m-0">Customer Information</h3>
                  </div>

                  <div className="card-body">
                    <form onSubmit={addcustomer}>

                      <div className="form-row">

                        <div className="form-group col-md-4">
                          <label>First Name <span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={first_name}
                            onChange={(e)=>setFirstName(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label>Last Name <span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={last_name}
                            onChange={(e)=>setlastName(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label>Email <span style={{color:"red"}}>*</span></label>
                          <input
                            type="email"
                            className="form-control"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                          />
                        </div>

                      </div>

                      <div className="form-row">

                        <div className="form-group col-md-4">
                          <label>Password <span style={{color:"red"}}>*</span></label>
                          <input
                            type="password"
                            className="form-control"
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label>Mobile <span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={mobile}
                            onChange={(e)=>setMobile(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label>Address <span style={{color:"red"}}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                          />
                        </div>

                      </div>

                      <div className="form-row">

                        <div className="form-group col-md-4">
                          <label>Role <span style={{color:"red"}}>*</span></label>
                          <select
                            className="form-control"
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>

                        <div className="form-group col-md-4">
                          <label>Image <span style={{color:"red"}}>*</span></label>
                          <input
                            type="file"
                            className="form-control"
                            required
                            onChange={(e)=>setImage(e.target.files[0])}
                          />
                        </div>

                      </div>

                      <div className="form-group text-right mt-3">

                        <Link
                          to="/admin/customer"
                          className="btn btn-secondary mr-2"
                        >
                          Cancel
                        </Link>

                        <button
                          type="submit"
                          className="btn btn-success"
                        >
                          Save Customer
                        </button>

                      </div>

                    </form>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AddCustomer;