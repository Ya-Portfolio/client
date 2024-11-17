import React from 'react'
import './Admin.css'
import AdminNavbar from '../navbar/AdminNavbar'
import { Outlet } from 'react-router-dom'
import StickyMenuBar from './StickyMenuBar'

function Admin() {

  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="adminLandingPage">
      <StickyMenuBar toggleVisibility={toggleVisibility} />
      <AdminNavbar isVisible={isVisible} toggleVisibility={toggleVisibility} />
      <Outlet />
    </div>
  )
}

export default Admin