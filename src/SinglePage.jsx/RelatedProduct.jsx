import React, { useState, useEffect } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

export default function RelatedProduct() {
  const [product, setProduct] = useState([])
  const [searchParams] = useSearchParams()
  const _id = searchParams.get("_id")

  const fetchProduct = async () => {
    try {
      let categoryId = null;
      if (_id) {
        // Fetch current product to find its category id
        const productRes = await axios.get(`http://localhost:8080/api/find-single-product-front/${_id}`);
        const currentProduct = productRes.data?.data;
        categoryId = currentProduct?.cat_id?._id || currentProduct?.cat_id;
      }

      // Fetch all products
      const response = await axios.get("http://localhost:8080/api/frontView/list")
      if (response && response.data && response.data.data) {
        let allProducts = response.data.data;
        
        // Filter by category string match and excluding the current product
        if (categoryId) {
          allProducts = allProducts.filter(p => {
             const pCat = p.cat_id?._id || p.cat_id;
             return pCat === categoryId && p._id !== _id;
          });
        }
        
        setProduct(allProducts);
      }
    } catch (error) {
      console.log("Error fetching related products:", error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [_id])

  return (
    <div className="container-fluid related-product">
      <div className="container">
        <div className="mx-auto text-center pb-5" style={{ maxWidth: "700px" }}>
          <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius wow fadeInUp"
            data-wow-delay="0.1s">Related Products</h4>
          <p className="wow fadeInUp" data-wow-delay="0.2s">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Modi, asperiores ducimus sint quos tempore officia similique quia? Libero, pariatur consectetur?</p>
        </div>

        <Swiper
          modules={[Autoplay]}
          className="mySwiper"
          loop={true}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            576: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            992: { slidesPerView: 4, spaceBetween: 30 }
          }}
        >
          {product.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="related-item rounded h-100 d-flex flex-column">
                <div className="related-item-inner border rounded h-100 d-flex flex-column">
                  <div className="related-item-inner-item">
                    <div className="w-100 overflow-hidden" style={{ height: "220px" }}>
                      <img
                        src={item.image}
                        className="w-100 h-100 rounded-top"
                        alt={item.name}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="related-new">New</div>
                    <div className="related-details">
                      <Link to={`/product?_id=${item._id}`}>
                        <i className="fa fa-eye fa-1x" />
                      </Link>
                    </div>
                  </div>
                  <div className="text-center rounded-bottom p-4 flex-grow-1">
                    <Link to={`/product?_id=${item._id}`} className="d-block mb-2" style={{ textDecoration: "none", color: "inherit" }}>
                      SmartPhone
                    </Link>
                    <Link to={`/product?_id=${item._id}`} className="d-block h4" style={{ textDecoration: "none" }}>
                      {item.name}
                    </Link>
                    <span className="text-primary fs-5">₹{item.price}</span>
                  </div>
                </div>
                <div className="related-item-add border border-top-0 rounded-bottom text-center p-4 pt-0 mt-auto">
                  <button className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4">
                    <i className="fas fa-shopping-cart me-2" /> Add To Cart
                  </button>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                    <div className="d-flex">
                      <a href="#" className="text-primary d-flex align-items-center justify-content-center me-3">
                        <span className="rounded-circle btn-sm-square border">
                          <i className="fas fa-random" />
                        </span>
                      </a>
                      <a href="#" className="text-primary d-flex align-items-center justify-content-center me-0">
                        <span className="rounded-circle btn-sm-square border">
                          <i className="fas fa-heart" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
