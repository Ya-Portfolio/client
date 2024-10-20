import React from 'react'
import './Admin.css'
import AdminNavbar from '../navbar/AdminNavbar'
import AdminContent from '../AdminContent/AdminContent'
import AdminBlog from '../AdminContent/AdminBlog'
import { Outlet } from 'react-router-dom'

function Admin() {
  return (
    <div className="adminLandingPage">
      <AdminNavbar />
      <Outlet />
    </div>
  )
}

export default Admin