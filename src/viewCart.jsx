// components/Cart.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewCart() {

  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');

  // 📦 Fetch Cart
  const getCart = async () => {
    try {
      const res = await axios.get(`https://electro-backend-m418.onrender.com/cart/${userId}`);
      setCartItems(res.data.cart.items);
    } catch (error) {
      console.log(error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // ➕➖ Quantity update karo
  const updateQuantity = async (productId, action) => {
    try {
      await axios.post("https://electro-backend-m418.onrender.com/add-to-cart", {
        userId,
        productId,
        action  // "increase" ya "decrease"
      });
      getCart(); // cart refresh karo
    } catch (error) {
      console.log("Quantity update error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <h5>No items in cart ❌</h5>
      ) : (
        cartItems.map((item) => (
          <div className="card p-3 mb-3" key={item._id}>
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h5>{item.productId.name}</h5>
                <p>Price: ₹{item.productId.price}</p>

                {/* ➕➖ Quantity Controls */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => updateQuantity(item.productId._id, "decrease")}
                  >
                    −
                  </button>
                  <span className="fw-bold px-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => updateQuantity(item.productId._id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <img
                  src={item.productId.image}
                  alt=""
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}