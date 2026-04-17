import React from 'react'
import Header from '../fragments/Header'
import Footer from '../fragments/Footer'

const MainWrapper = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainWrapper;