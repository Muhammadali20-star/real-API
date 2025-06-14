import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Dashboards from './pages/dashboard/Dashboards'
import Register from './pages/register/Register'
import Profile from './pages/dashboard/profile/Profile'
import Layout from './pages/layout/Layout'
import Groups from './pages/dashboard/Groups/Groups'

const App = () => {
  return (
    <>
      <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="dashboard" element={<Dashboards />}>
         <Route path="" element={<Profile />} />
         <Route path="group/:id" element={<Groups />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App