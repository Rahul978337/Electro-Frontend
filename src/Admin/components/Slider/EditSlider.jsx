import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

function EditSlider() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sliderId = params.get("_id");

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("Shop Now");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchSlider = async () => {
      const response = await axios.get("https://electro-backend-m418.onrender.com/api/get-all-sliders");
      if (response.data.success) {
        const found = response.data.data.find((s) => s._id === sliderId);
        if (found) {
          setTitle(found.title || "");
          setSubtitle(found.subtitle || "");
          setDescription(found.description || "");
          setButtonText(found.buttonText || "Shop Now");
          setExistingImage(found.image || null);
        }
      }
    };
    if (sliderId) fetchSlider();
  }, [sliderId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("buttonText", buttonText);
    if (image) formData.append("image", image);

    const response = await axios.put(
      `https://electro-backend-m418.onrender.com/api/update-slider/${sliderId}`,
      formData
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/admin/slider", { replace: true });
      }, 1500);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />
      <ToastContainer />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1>Edit Slider</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="card shadow">
              <div className="card-header bg-warning text-white">
                <h3 className="card-title">Edit Slider Information</h3>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-row">

                    <div className="form-group col-md-6">
                      <label>Title <span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Save Up To $400"
                        required
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label>Subtitle</label>
                      <input
                        type="text"
                        className="form-control"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="e.g. On Selected Laptops"
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label>Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Terms and Condition Apply"
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label>Button Text</label>
                      <input
                        type="text"
                        className="form-control"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label>Slider Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {(preview || existingImage) && (
                        <img
                          src={preview || existingImage}
                          alt="Preview"
                          className="mt-2"
                          style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "6px" }}
                        />
                      )}
                    </div>

                  </div>

                  <div className="text-right mt-3">
                    <button type="submit" className="btn btn-warning mr-2">
                      <i className="fas fa-save mr-1"></i> Update Slider
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/admin/slider")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EditSlider;
