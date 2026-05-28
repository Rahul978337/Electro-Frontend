import React from 'react'
import Topbar from '../Topbar'
import Navbar from '../Navbar'
import BestsellerHeader from './BestsellerHeader'
import Services from '../Home/Services'
import Offers from '../Home/Offers'
import OurProduct from './OurProduct'
import Bestseller from '../Home/Bestseller'
import Footer from '../Footer'

export default function BestsellerMain() {
  return (
    <div>
      <Topbar/>
<Navbar/>
<BestsellerHeader/>
<Services/>
<Offers/>
<Bestseller/>
<OurProduct/>
<Footer/>
    </div>
  )
}
