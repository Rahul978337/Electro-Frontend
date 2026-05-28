import React from 'react'
import Topbar from '../Topbar'
import Navbar from '../Navbar'
import CheckoutHeader from './CheckoutHeader'
import Services from '../Home/Services'
import CheckoutPage from './CheckoutPage'
import Footer from '../Footer'

export default function Checkout() {
  return (
    <div>
        <Topbar/>
        <Navbar/>
        <CheckoutHeader/>
        <Services/>
        <CheckoutPage/>
        <Footer/>

    </div>
  )
}
