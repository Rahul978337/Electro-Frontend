import React from 'react'
import CartHeader from './CartHeader'
import Topbar from '../Topbar'
import Navbar from '../Navbar'
import CartPage from './CartPage'
import Footer from '../Footer'

export default function Cart() {
  return (
    <div>
        <Topbar/>
        <Navbar/>
        <CartHeader/>
        <CartPage/>
        <Footer/>
    </div>
  )
}
