import React from "react";
import Footer from "./Footer";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function MyOrders() {


 const [order, setorder] = useState([]);
  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
  
    if (userId) {
      getCart(userId);
    } else {
      console.log("User not logged in");

    }
  }, []);

  const getCart = async (userId) => {
    try {
      const res = await axios.get(
       `https://electro-backend-m418.onrender.com/api/myOrders?userId=${userId}`
      );

      console.log("VIEW order RESPONSE ", res.data);

      setorder(res.data.data );

    } catch (err) {
      console.log(err);

    }
  };



  return (
    <div className="wrapper">
      <Topbar />
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px",
          background: "#fff",
          fontFamily: "Segoe UI, sans-serif"
        }}
      >
        <div
          style={{
            width: "900px",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            overflow: "hidden"
          }}
        >
          {/* Header */}
          <div
            style={{
              height: "50px",
              background: "linear-gradient(90deg,#CC5500,#ff8c00)",
              display: "flex",
              alignItems: "center",
              paddingLeft: "30px",
              color: "#fff",
              fontSize: "22px",
              fontWeight: "600"
            }}
          >
            My Orders
          </div>

         <div style={{ padding: "25px" }}>

<div style={{ padding: "25px" }}>

  {order.map((ord) => (
    <div
      key={ord._id}
      style={{
        border: "1px solid #F2C6A0",
        borderRadius: "15px",
        marginBottom: "18px",
        overflow: "hidden"
      }}
    >
      {/* Order top */}
      <div
        style={{
          background: "#FFF4EC",
          padding: "10px 15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <strong>Order ID:</strong> {ord._id} <br />
          <small style={{ color: "#6b7280" }}>
            {new Date(ord.createdAt).toLocaleDateString()}
          </small>
        </div>

        <div>
          <span
            style={{
              background: "#CC5500",
              color: "#fff",
              padding: "3px 12px",
              borderRadius: "20px",
              fontSize: "11px"
            }}
          >
            {ord.paymentStatus}
          </span>

          <span
            style={{
              marginLeft: "15px",
              fontWeight: "600",
              color: "#CC5500"
            }}
          >
            ₹{ord.totalAmount}
          </span>
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "8px 12px" }}>

{ord.productId?.map((product, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #F2C6A0",
      padding: "6px 0"
    }}
  >
    <div style={{ display: "flex", gap: "10px", alignItems: "center"}}>
      <img
        src={product.image}   
        alt={product.name}  
        style={{
          width: "50px",
          height: "60px",
          borderRadius: "6px",
          objectFit: "cover"
        }}
      />

      <div>
        <div style={{ fontSize: "20px" }}>
          {product.name}    
        </div>
        <small style={{ color: "#6b7280" }}>
          Qty: {product.quantity}   
        </small>
      </div>
    </div>

    <div style={{ fontWeight: "600", fontSize: "20px" }}>
      ₹{product.price}
    </div>
  </div>
))}
      </div>
    </div>
  ))}

</div>

</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}