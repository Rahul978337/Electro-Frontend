import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useState } from "react";
import axios from "axios";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 



function AddCategory(){
  const navigate = useNavigate();

const [name,setName]=useState("")
const [image,setImage]=useState(null)
const [description,setDescription]=useState("")

const handleSubmit=async(e)=>{
e.preventDefault()

const formData=new FormData();
formData.append("name",name)
formData.append("description",description)
formData.append("image",image)

const response=await axios.post("https://electro-backend-m418.onrender.com/api/category/add",
      formData)
      if (response.data.sucess) {
        toast.success(response.data.message)
        setTimeout(() => {
    navigate('/admin/category', { replace: true });
  }, 1500);
        
      } else {
        toast.error(response.data.message)
        
      }

}

return(

<div className="wrapper">

<Header/>
<SideMenu/>
<ToastContainer />

<div className="content-wrapper">

<div className="content-header">
<div className="container-fluid">
<h1>Add Category</h1>
</div>
</div>

<div className="content">

<div className="container-fluid">

<div className="card shadow">

<div className="card-header bg-primary text-white">
<h3 className="card-title">Category Information</h3>
</div>

<div className="card-body">

<form onSubmit={handleSubmit}>

{/* Row */}

<div className="form-row">

<div className="form-group col-md-4">

<label>Name <span style={{color:"red"}}>*</span></label>

<input
type="text"
className="form-control"
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Enter Category Name"
/>

</div>


<div className="form-group col-md-4">

<label>Image <span style={{color:"red"}}>*</span></label>

<input
type="file"
className="form-control"
onChange={(e)=>setImage(e.target.files[0])}
/>

</div>


<div className="form-group col-md-4">

<label>Description <span style={{color:"red"}}>*</span></label>

<input
type="textArea"
className="form-control"
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Enter Description"
/>

</div>

</div>


<div className="text-right mt-3">

<button type="submit" className="btn btn-success">
Submit
</button>

</div>

</form>

</div>

</div>

</div>

</div>

</div>

<Footer/>

</div>

)

}

export default AddCategory