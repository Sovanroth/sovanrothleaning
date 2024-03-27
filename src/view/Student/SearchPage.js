
import React from 'react'
import BuyCourse from '../../components/BuyCourse'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import Search from '../../components/Search'

const SearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div>
        <Search/>
      </div>
      <div className="flex-grow"></div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default SearchPage
