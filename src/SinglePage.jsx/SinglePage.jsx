import React from 'react'
import Topbar from '../Topbar'
import Navbar from '../Navbar'
import SinglePageHeader from './SinglePageHeader'
import SinglePageProduct from './SinglePageProduct'
import RelatedProduct from './RelatedProduct'
import Footer from '../Footer'

export default function SinglePage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <SinglePageHeader />
      <SinglePageProduct />
      <RelatedProduct />
      <Footer />
    </div>
  )
}
