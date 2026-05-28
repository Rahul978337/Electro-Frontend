import React from 'react'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './Home/Home'
import Shop from './Shop/Shop'
import SinglePage from './SinglePage.jsx/SinglePage'
import Contact from './Contact.jsx/Contact'

import BestsellerMain from './Bestseller/BestSellerMain'
import Cart from './Cart.jsx/Cart'
import Checkout from './Checkout/Checkout'
import NotFound from './NotFound.jsx/NotFound'
import Login from './Login'
import Register from './Register'

import AdminWrapper from './Admin/Adminwrapper'
import AdminLogin from './Admin/components/AdminLogin';
import Dashboard from './Admin/components/Dashboard'
import Customers from './Admin/components/Customer/Customers';
import AddCustomer from './Admin/components/Customer/AddCustomer';
import EditCustomer from './Admin/components/Customer/EditCustomer';
import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'
import AdminProfile from './Admin/components/MyProfile'
import Category from './Admin/components/Categories/category'
import AddCategory from './Admin/components/Categories/addCategory'
import EditCategory from './Admin/components/Categories/editCategory'
import AddProduct from './Admin/components/Product/addProduct'
import 'react-toastify/dist/ReactToastify.css';
import ProductManager from './Admin/components/Product/Product'
import EditProduct from './Admin/components/Product/editProduct'

import MyOrders from './MyOrders'
import OrderDetails from './Admin/components/Orders/OrderDetails'
import ContactDetails from './Admin/components/Contact/Contact'
import SliderManager from './Admin/components/Slider/Slider'
import AddSlider from './Admin/components/Slider/AddSlider'
import EditSlider from './Admin/components/Slider/EditSlider'


// import AdminLogin from './Admin/components/AdminLogin';
// import Dashboard from './Admin/components/Dashboard';

// import Customers from './Admin/components/Customer/Customers';
// import AddCustomer from './Admin/components/Customer/AddCustomer';
// import EditCustomer from './Admin/components/Customer/EditCustomer';


export default function Path() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<SinglePage />} />
          <Route path="/bestsellers" element={<BestsellerMain />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
   
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          


          <Route path="/404" element={<NotFound />} />




<Route path="/admin" element={<AdminWrapper><AdminLogin /></AdminWrapper>} />
<Route path="/admin/dashboard" element={<AdminWrapper><Dashboard /></AdminWrapper>} />
<Route path="/admin/customer" element={<AdminWrapper><Customers /></AdminWrapper>} />
<Route path="/admin/add-customer" element={<AdminWrapper><AddCustomer /></AdminWrapper>} />
<Route path="/admin/Edit-customer" element={<AdminWrapper><EditCustomer /></AdminWrapper>} />
<Route path="/admin/Profile" element={<AdminWrapper><AdminProfile /></AdminWrapper>} />
<Route path="/admin/category" element={<AdminWrapper><Category /></AdminWrapper>} />
<Route path="/admin/addCategory" element={<AdminWrapper><AddCategory /></AdminWrapper>} />
<Route path="/admin/editCategory" element={<AdminWrapper><EditCategory /></AdminWrapper>} />
<Route path="/admin/product" element={<AdminWrapper><ProductManager /></AdminWrapper>} />
<Route path="/admin/addProduct" element={<AdminWrapper><AddProduct /></AdminWrapper>} />
<Route path="/admin/editProduct" element={<AdminWrapper><EditProduct /></AdminWrapper>} />
<Route path="/admin/orderDetail" element={<AdminWrapper><OrderDetails /></AdminWrapper>} />
<Route path="/admin/contactDetails" element={<AdminWrapper><ContactDetails /></AdminWrapper>} />
<Route path="/admin/slider" element={<AdminWrapper><SliderManager /></AdminWrapper>} />
<Route path="/admin/addSlider" element={<AdminWrapper><AddSlider /></AdminWrapper>} />
<Route path="/admin/editSlider" element={<AdminWrapper><EditSlider /></AdminWrapper>} />












        </Routes>
      </BrowserRouter>

    </div>
  )
}
