import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'


export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const userId = localStorage.getItem("userId");

  // 📦 API CALL
  const getCart = async () => {
    try {
      const res = await axios.get(`https://electro-backend-m418.onrender.com/cart/${userId}`);
      setCartItems(res.data?.cart?.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://electro-backend-m418.onrender.com/myProfile/${userId}`);
      if (response.data.success || response.data.sucess) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.log("Fetch profile error:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getCart();
      fetchProfile();
    }
  }, []);

  const placrOrder = async () => {
    Swal.fire({
      title: 'Place Order?',
      text: "Do you want to proceed and place this order?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Place Order!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post("https://electro-backend-m418.onrender.com/api/placeOrder",{
            userId: userId,
            paymentMode: "COD"
          });
          
          if (response.data.success) {
            Swal.fire('Order Placed!', response.data.message, 'success');
            setCartItems([]);
          } else {
            Swal.fire('Failed!', response.data.message, 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong while placing the order.', 'error');
        }
      }
    });
  };

  return (
    <div><>
              <ToastContainer />
    
      <div className="container-fluid bg-light overflow-hidden py-5">
        <div className="container py-5">
          <h1 className="mb-4 wow fadeInUp" data-wow-delay="0.1s">
            Billing details
          </h1>
          <form action="#">
            <div className="row g-5">
              <div
                className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">
                        First Name<sup>*</sup>
                      </label>
                      <input type="text" className="form-control" value={userData.first_name} readOnly />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">
                        Last Name<sup>*</sup>
                      </label>
                      <input type="text" className="form-control" value={userData.last_name} readOnly />
                    </div>
                  </div>
                </div>
                
                <div className="form-item">
                  <label className="form-label my-3">
                    Address <sup>*</sup>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="House Number Street Name"
                    value={userData.address}
                    readOnly
                    rows={3}
                  />
                </div>
                
                <div className="form-item">
                  <label className="form-label my-3">
                    Mobile<sup>*</sup>
                  </label>
                  <input type="tel" className="form-control" value={userData.mobile} readOnly />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Email Address<sup>*</sup>
                  </label>
                  <input type="email" className="form-control" value={userData.email} readOnly />
                </div>
              </div>
              <div
                className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-start">Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td className="text-start">
                            {item.productId?.name}
                          </td>

                          <td>₹{Number(item.productId?.price).toLocaleString("en-IN")}</td>

                          <td>{item.quantity}</td>

                          <td>
                            ₹{(item.quantity * item.productId?.price).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}

                      {/* Subtotal */}
                      <tr>
                        <td colSpan="3" className="text-end">
                          <strong>Subtotal</strong>
                        </td>
                        <td>
                          ₹{
                            cartItems.reduce(
                              (acc, item) =>
                                acc + item.quantity * item.productId?.price,
                              0
                            ).toLocaleString("en-IN")
                          }
                        </td>
                      </tr>

                      {/* Total */}
                      <tr>
                        <td colSpan="3" className="text-end">
                          <strong>TOTAL</strong>
                        </td>
                        <td>
                          ₹{
                            cartItems.reduce(
                              (acc, item) =>
                                acc + item.quantity * item.productId?.price,
0
                            ).toLocaleString("en-IN")
                          }
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
                <div className="row g-0 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="Transfer"
                        defaultValue="Transfer"
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Direct Bank Transfer
                      </label>
                    </div>
                    <p className="text-start text-dark">
                      Make your payment directly into our bank account. Please use
                      your Order ID as the payment reference. Your order will not be
                      shipped until the funds have cleared in our account.
                    </p>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="Payments"
                        defaultValue="Payments"
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Delivery-1"
                        name="Delivery"
                        defaultValue="Delivery"
                      />
                      <label className="form-check-label" htmlFor="Delivery-1">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Paypal-1"
                        name="Paypal"
                        defaultValue="Paypal"
                      />
                      <label className="form-check-label" htmlFor="Paypal-1">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button
                    type="button"
                    onClick={placrOrder}
                    className="btn btn-primary border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Checkout Page End */}
    </>
    </div>
  )
}

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function CheckoutPage() {

//   const [cartItems, setCartItems] = useState([]);
//   const userId = localStorage.getItem("userId");

//   // 📦 API CALL
//   const getCart = async () => {
//     try {
//       const res = await axios.get(`https://electro-backend-m418.onrender.com/cart/${userId}`);
//       setCartItems(res.data?.cart?.items || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       getCart();
//     }
//   }, []);

//   return (
//     <div>
//       <>
//         <div className="container-fluid bg-light overflow-hidden py-5">
//           <div className="container py-5">
//             <h1 className="mb-4">Billing details</h1>

//             <form>
//               <div className="row g-5">

//                 {/* LEFT FORM SAME */}
//                 <div className="col-md-12 col-lg-6">
//                   <input type="text" className="form-control mb-3" placeholder="First Name" />
//                   <input type="text" className="form-control mb-3" placeholder="Last Name" />
//                   <input type="text" className="form-control mb-3" placeholder="Address" />
//                   <input type="text" className="form-control mb-3" placeholder="City" />
//                   <input type="text" className="form-control mb-3" placeholder="Country" />
//                   <input type="text" className="form-control mb-3" placeholder="Zip Code" />
//                   <input type="text" className="form-control mb-3" placeholder="Mobile" />
//                   <input type="email" className="form-control mb-3" placeholder="Email" />
//                 </div>

//                 {/* RIGHT SIDE CART */}
//                 <div className="col-md-12 col-lg-6">

//                   <div className="table-responsive">
//                     <table className="table">
//                       <thead>
//                         <tr className="text-center">
//                           <th className="text-start">Name</th>
//                           <th>Price</th>
//                           <th>Quantity</th>
//                           <th>Total</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {cartItems.map((item) => (
//                           <tr className="text-center" key={item._id}>

//                             <th className="text-start py-4">
//                               {item.productId?.name}
//                             </th>

//                             <td className="py-4">
//                               ₹{item.productId?.price}
//                             </td>

//                             <td className="py-4">
//                               {item.quantity}
//                             </td>

//                             <td className="py-4">
//                               ₹{item.quantity * item.productId?.price}
//                             </td>

//                           </tr>
//                         ))}

//                         {/* TOTAL */}
//                         <tr>
//                           <td colSpan="3" className="text-end">
//                             <strong>Total</strong>
//                           </td>
//                           <td>
//                             ₹{
//                               cartItems.reduce(
//                                 (acc, item) =>
//                                   acc + item.quantity * item.productId?.price,
//                                 0
//                               )
//                             }
//                           </td>
//                         </tr>

//                       </tbody>
//                     </table>
//                   </div>

//                   {/* BUTTON SAME */}
//                   <button
//                     type="button"
//                     className="btn btn-primary w-100"
//                   >
//                     Place Order
//                   </button>

//                 </div>

//               </div>
//             </form>
//           </div>
//         </div>
//       </>
//     </div>
//   )
// }