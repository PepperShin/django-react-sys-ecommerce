import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

// dev_2 fruit
const MainLayout = () => {
  return (
    <div className="vh-100 d-flex flex-colunm justify-content-between">
        {/* <Header></Header>
        <Outlet></Outlet> */}
        <Footer></Footer>
    </div>
  )
}

export default MainLayout