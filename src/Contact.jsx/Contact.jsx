import React from 'react'
import Topbar from '../Topbar'
import Navbar from '../Navbar'
import ContactPageHeader from './ContactPageHeader'
import ContactStart from './ContactStart'
import Footer from '../Footer'

export default function Contact() {
  return (
    <div>
        <Topbar/>
        <Navbar/>
        <ContactPageHeader/>
        <ContactStart/>
        <Footer/>
    </div>
  )
}
