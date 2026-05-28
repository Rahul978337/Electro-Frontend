import React from 'react'
import Navbar from '../Navbar'
import Slider from './Slider'
import Services from './Services'
import Offers from './Offers'
import Footer from '../Footer'
import Topbar from '../Topbar'

import OurProduct from '../Bestseller/OurProduct'
import Bestseller from './Bestseller'

export default function Home() {
  return (
    <div>
      <Topbar/>
        <Navbar/>
        <Slider/>
        <Services/>
        <Offers/>
        <OurProduct/>
        <Bestseller/>
        <Footer/>
    </div>
  )
}
