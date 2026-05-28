// import React from 'react'

// export default function CartPage() {

//   const [cartItems, setCartItems] = useState([]);
//     const userId = localStorage.getItem('userId'); // ✅ real userId from localStorage
  
//     // 📦 Fetch Cart
//     const getCart = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/cart/${userId}`);
//         setCartItems(res.data.cart.items);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     useEffect(() => {
//       getCart();
//     }, []);
  
//   return (
//     <div><>
//   {/* Cart Page Start */}
//   <div className="container-fluid py-5">
//     <div className="container py-5">
//       <div className="table-responsive">
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">Name</th>
//               <th scope="col">Model</th>
//               <th scope="col">Price</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Total</th>
//               <th scope="col">Handle</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">
//                 <p className="mb-0 py-4">Apple iPad Mini</p>
//               </th>
//               <td>
//                 <p className="mb-0 py-4">G2356</p>
//               </td>
//               <td>
//                 <p className="mb-0 py-4">2.99 $</p>
//               </td>
//               <td>
//                 <div
//                   className="input-group quantity py-4"
//                   style={{ width: 100 }}
//                 >
//                   <div className="input-group-btn">
//                     <button className="btn btn-sm btn-minus rounded-circle bg-light border">
//                       <i className="fa fa-minus" />
//                     </button>
//                   </div>
//                   <input
//                     type="text"
//                     className="form-control form-control-sm text-center border-0"
//                     defaultValue={1}
//                   />
//                   <div className="input-group-btn">
//                     <button className="btn btn-sm btn-plus rounded-circle bg-light border">
//                       <i className="fa fa-plus" />
//                     </button>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <p className="mb-0 py-4">2.99 $</p>
//               </td>
//               <td className="py-4">
//                 <button className="btn btn-md rounded-circle bg-light border">
//                   <i className="fa fa-times text-danger" />
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">
//                 <p className="mb-0 py-4">Apple iPad Mini</p>
//               </th>
//               <td>
//                 <p className="mb-0 py-4">G2356</p>
//               </td>
//               <td>
//                 <p className="mb-0 py-4">2.99 $</p>
//               </td>
//               <td>
//                 <div
//                   className="input-group quantity py-4"
//                   style={{ width: 100 }}
//                 >
//                   <div className="input-group-btn">
//                     <button className="btn btn-sm btn-minus rounded-circle bg-light border">
//                       <i className="fa fa-minus" />
//                     </button>
//                   </div>
//                   <input
//                     type="text"
//                     className="form-control form-control-sm text-center border-0"
//                     defaultValue={1}
//                   />
//                   <div className="input-group-btn">
//                     <button className="btn btn-sm btn-plus rounded-circle bg-light border">
//                       <i className="fa fa-plus" />
//                     </button>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <p className="mb-0 py-4">2.99 $</p>
//               </td>
//               <td className="py-4">
//                 <button className="btn btn-md rounded-circle bg-light border">
//                   <i className="fa fa-times text-danger" />
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">
//                 <p className="mb-0 py-4">Apple iPad Mini</p>
//               </th>
//               <td>
//                 <p className="mb-0 py-4">G2356</p>
//               </td>
//               <td>
//                 <p className="mb-0 py-4">2.99 $</p>
//               </td>
//               <td>
//                 <div
//                   className="input-group quantity py-4"
//                   style={{ width: 100 }}
//                 >
//                   <div className="input-group-btn">
//                     <button className="btn btn-sm btn-minus rounded-circle bg-light border">
//                       <i className="fa fa-minus" />
//                     </button>
//                   </div>
//                   <input
//                     type="text"
//                     className="form-control form-control-sm text-center border-0"
//                     defaultValue={1}
//                   />
//                   <div className="input-group-btn">
//                     <button className="btn btn-sm btn-plus rounded-circle bg-light border">
//                       <i className="fa fa-plus" />
//                     </button>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <p className="mb-0 py-4">2.99 $</p>
//               </td>
//               <td className="py-4">
//                 <button className="btn btn-md rounded-circle bg-light border">
//                   <i className="fa fa-times text-danger" />
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-5">
//         <input
//           type="text"
//           className="border-0 border-bottom rounded me-5 py-3 mb-4"
//           placeholder="Coupon Code"
//         />
//         <button
//           className="btn btn-primary rounded-pill px-4 py-3"
//           type="button"
//         >
//           Apply Coupon
//         </button>
//       </div>
//       <div className="row g-4 justify-content-end">
//         <div className="col-8" />
//         <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
//           <div className="bg-light rounded">
//             <div className="p-4">
//               <h1 className="display-6 mb-4">
//                 Cart <span className="fw-normal">Total</span>
//               </h1>
//               <div className="d-flex justify-content-between mb-4">
//                 <h5 className="mb-0 me-4">Subtotal:</h5>
//                 <p className="mb-0">$96.00</p>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <h5 className="mb-0 me-4">Shipping</h5>
//                 <div>
//                   <p className="mb-0">Flat rate: $3.00</p>
//                 </div>
//               </div>
//               <p className="mb-0 text-end">Shipping to Ukraine.</p>
//             </div>
//             <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
//               <h5 className="mb-0 ps-4 me-4">Total</h5>
//               <p className="mb-0 pe-4">$99.00</p>
//             </div>
//             <button
//               className="btn btn-primary rounded-pill px-4 py-3 text-uppercase mb-4 ms-4"
//               type="button"
//             >
//               Proceed Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   {/* Cart Page End */}
// </>
// </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CartPage() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Cart',
        text: 'Your cart is empty! Please add some products before checkout.',
        confirmButtonColor: '#3085d6'
      });
    } else {
      navigate('/checkout');
    }
  };
  const userId = localStorage.getItem('userId');

  const getCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/cart/${userId}`);
      setCartItems(res.data.cart.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // 💰 Total
  const total = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.productId?.price;
  }, 0);
  // console.log(item.productId);

  const handleRemove = async (productId) => {
    Swal.fire({
      title: 'Remove Item?',
      text: "Are you sure you want to remove this product from your cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post("http://localhost:8080/remove-from-cart", {
            userId,
            productId
          });
          if (res.data.success) {
            Swal.fire('Removed!', res.data.message, 'success');
            getCart(); // Refresh cart list
          } else {
            Swal.fire('Failed!', res.data.message, 'error');
          }
        } catch (error) {
          Swal.fire('Error!', error.response?.data?.message || 'Something went wrong', 'error');
        }
      }
    });
  };

  const userToken = localStorage.getItem("userToken");

  const updateQuantity = async (productId, action) => {
    try {
      await axios.post("http://localhost:8080/add-to-cart", {
        userId,
        productId,
        action
      });
      getCart(); // refresh cart list
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container-fluid py-5">
      <div className="container py-5">

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th> {/* 👈 image + name */}
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Handle</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>

                  {/* 🖼️ IMAGE + NAME */}
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.productId?.image}
                        alt=""
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          marginRight: "15px"
                        }}
                      />
                      <p className="mb-0">
                        {item.productId?.name}
                      </p>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td>₹{Number(item.productId?.price).toLocaleString("en-IN")}</td>

                  {/* QUANTITY */}
                  <td>
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm btn-light"
                        onClick={() => updateQuantity(item.productId?._id, "decrease")}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        className="btn btn-sm btn-light"
                        onClick={() => updateQuantity(item.productId?._id, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* TOTAL */}
                  <td>₹{(item.quantity * item.productId?.price).toLocaleString("en-IN")}</td>

                  {/* DELETE */}
                  <td>
                    <button 
                      onClick={() => handleRemove(item.productId?._id)}
                      className="btn btn-sm text-danger"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🎟️ Coupon */}
        <div className="mt-4">
          <input
            type="text"
            className="border rounded p-2 me-2"
            placeholder="Coupon Code"
          />
          <button className="btn btn-warning">
            Apply Coupon
          </button>
        </div>

        {/* 💰 Cart Total + Checkout */}
        <div className="row justify-content-end mt-5">
          <div className="col-md-4">
            <div className="border p-4 rounded bg-light">
              <h4>Cart Total</h4>

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>

              {/* ✅ Checkout Button */}
              <button 
                onClick={handleCheckout} 
                className="btn btn-success w-100 mt-3"
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}