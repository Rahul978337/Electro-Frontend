
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function AddProduct() {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [cat_id, setCatId] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState(null)
  const navigate = useNavigate();
  // console.log("cate id",cat_id)



  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();

    formData.append("name", name)
    formData.append("price", price)
    formData.append("cat_id", cat_id)
    formData.append("description", description)
    formData.append("stock", stock)
    formData.append("image", image)

    const response = await axios.post(
      "https://electro-backend-m418.onrender.com/api/product/add",
      formData,

    )

    // console.log("response", response)

    if (response.data.sucess) {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/admin/product', { replace: true });
      }, 1500);
    }

    else {
      toast.error(response.data.message)
    }

  }




  const [category, setCategory] = useState([]);

  const FetchCategoryName = async () => {
    const response = await axios.get("https://electro-backend-m418.onrender.com/find-category-name", FetchCategoryName)
    // console.log("categaory name",response)
    if (response) {
      setCategory(response.data.data)

    } else {

    }
  }
  useEffect(() => {
    FetchCategoryName()
  }, [])




  return (
    <div className="wrapper">
      <Header />
      <SideMenu />
      <ToastContainer />


      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <h3>Add Product</h3>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">

            <div className="card">
              <div className="card-body">

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* Product Name */}
                    <div className="col-lg-4 col-md-6 col-12 mb-3">
                      <label>Product Name<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Price */}
                    <div className="col-lg-4 col-md-6 col-12 mb-3">
                      <label>Price<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    {/* Stock */}
                    <div className="col-lg-4 col-md-6 col-12 mb-3">
                      <label>Stock<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter stock"
                        required
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>

                    {/* Category */}
                    <div className="col-lg-4 col-md-6 col-12 mb-3">
                      <label>Category Name<span style={{ color: "red" }}>*</span></label>
                      <select className="form-control"
                        value={cat_id}
                        required
                        onChange={(e) => setCatId(e.target.value)}>
                        <option>select category</option>
                        {
                          category.map((value) => (
                            <option value={value._id}>{value.name}</option>

                          ))
                        }


                      </select>
                    </div>

                    {/* Description */}
                    <div className="col-lg-4 col-md-6 col-12 mb-3">
                      <label>Description<span style={{ color: "red" }}>*</span></label>
                      <textarea
                        className="form-control"
                        placeholder="Enter product description"
                        style={{ height: "38px" }}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Image */}
                    <div className="col-lg-4 col-md-6 col-12 mb-3">
                      <label>Product Image<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="file"
                        className="form-control"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>

                    <div className="col-12 mt-3">
                      <button className="btn btn-primary">
                        Add Product
                      </button>
                    </div>

                  </div>
                </form>

              </div>
            </div>

          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default AddProduct;