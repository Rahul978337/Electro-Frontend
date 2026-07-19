import React, { useEffect, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css/navigation'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

export default function Slider() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://electro-backend-m418.onrender.com/api/front/sliders')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data.length > 0) {
          setSlides(result.data)
        } else {
          // fallback to default slides if no data in DB
          setSlides([
            {
              _id: 'default-1',
              title: 'Save Up To A $400',
              subtitle: 'On Selected Laptops & Desktop Or Smartphone',
              description: 'Terms and Condition Apply',
              buttonText: 'Shop Now',
              image: 'img/carousel-1.png',
            },
            {
              _id: 'default-2',
              title: 'Save Up To A $200',
              subtitle: 'On Selected Laptops & Desktop Or Smartphone',
              description: 'Terms and Condition Apply',
              buttonText: 'Shop Now',
              image: 'img/carousel-2.png',
            },
          ])
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Slider fetch error:', err)
        // fallback on network error
        setSlides([
          {
            _id: 'default-1',
            title: 'Save Up To A $400',
            subtitle: 'On Selected Laptops & Desktop Or Smartphone',
            description: 'Terms and Condition Apply',
            buttonText: 'Shop Now',
            image: 'img/carousel-1.png',
          },
          {
            _id: 'default-2',
            title: 'Save Up To A $200',
            subtitle: 'On Selected Laptops & Desktop Or Smartphone',
            description: 'Terms and Condition Apply',
            buttonText: 'Shop Now',
            image: 'img/carousel-2.png',
          },
        ])
        setLoading(false)
      })
  }, [])

  return (
    <div className="container-fluid carousel bg-light px-0">
      <div className="row g-0 justify-content-end">

        <div className="col-12 col-lg-7 col-xl-9">
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: '300px' }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              className="mySwiper"
              loop={true}
              autoplay={{ delay: 4000 }}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide._id}>
                  <div className="row g-0 header-carousel-item align-items-center">
                    <div
                      className="col-xl-6 carousel-img wow fadeInLeft"
                      data-wow-delay="0.1s"
                    >
                      <img
                        src={slide.image}
                        className="img-fluid w-100"
                        alt={slide.title}
                      />
                    </div>
                    <div className="col-xl-6 carousel-content p-4">
                      <h4
                        className="text-uppercase fw-bold mb-4 wow fadeInRight"
                        data-wow-delay="0.1s"
                        style={{ letterSpacing: 3 }}
                      >
                        {slide.title}
                      </h4>
                      <h1
                        className="display-3 text-capitalize mb-4 wow fadeInRight"
                        data-wow-delay="0.3s"
                      >
                        {slide.subtitle}
                      </h1>
                      <p
                        className="text-dark wow fadeInRight"
                        data-wow-delay="0.5s"
                      >
                        {slide.description}
                      </p>
                      <a
                        className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight"
                        data-wow-delay="0.7s"
                        href="#"
                      >
                        {slide.buttonText || 'Shop Now'}
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div
          className="col-12 col-lg-5 col-xl-3 wow fadeInRight"
          data-wow-delay="0.1s"
        >
          <div className="carousel-header-banner h-100">
            <img
              src="img/header-img.jpg"
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'cover' }}
              alt="Image"
            />
            <div className="carousel-banner-offer">
              <p className="bg-primary text-white rounded fs-5 py-2 px-4 mb-0 me-3">
                Save $48.00
              </p>
              <p className="text-primary fs-5 fw-bold mb-0">Special Offer</p>
            </div>
            <div className="carousel-banner">
              <div className="carousel-banner-content text-center p-4">
                <a href="#" className="d-block mb-2">
                  SmartPhone
                </a>
                <a href="#" className="d-block text-white fs-3">
                  Apple iPad Mini <br /> G2356
                </a>
                <del className="me-2 text-white fs-5">$1,250.00</del>
                <span className="text-primary fs-5">$1,050.00</span>
              </div>
              <a href="#" className="btn btn-primary rounded-pill py-2 px-4">
                <i className="fas fa-shopping-cart me-2" /> Add To Cart
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
