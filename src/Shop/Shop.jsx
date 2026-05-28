import React from 'react'

import Navbar from '../Navbar'
import Topbar from '../Topbar'
import SinglePageHeader from './SinglePageHeader'
import Services from '../Home/Services'
import Offers from '../Home/Offers'
import ShopPageStart from './ShopPageStart'
import ProductBanner from './ProductBanner'
import Footer from '../Footer'


export default function Shop() {
  return (
    <div>
      <Topbar/>
      <Navbar/>
      <SinglePageHeader/>
      <Services/>
      <Offers/>
      <ShopPageStart/>
      <ProductBanner/>
      <Footer/>





    </div>
  )
}
