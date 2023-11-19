
import React from 'react'
import BuyCourse from '../../components/BuyCourse'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

const PurchaseCourse = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div>
        <BuyCourse/>
      </div>
      <div className="flex-grow"></div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default PurchaseCourse
