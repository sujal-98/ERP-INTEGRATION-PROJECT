import React from 'react'
import Navbar from '../components/navbar/navbar'
import Header from '../components/header/header'
import Sidebar from '../components/sidebar/Sidebar'
import Speed from '../components/speed-dial/SpeedDial'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Sidebar />
      <Speed />
    </div>
  )
}

export default Home
