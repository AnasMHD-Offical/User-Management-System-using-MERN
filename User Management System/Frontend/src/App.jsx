import React from 'react'
import {BrowserRouter as Router , Routes ,Route} from "react-router-dom"
import LoginPage from './Pages/Admin/LoginPage'
import SignupPage from './Pages/Admin/SignupPage'
import Dashboard from './Components/Dashbord'
import AdminPanel from './Pages/Admin/AdminPanel'
import HomePage from './Pages/Admin/HomePage'
import UserLogin from './Pages/User/UserLogin'
import UserSignup from './Pages/User/UserSignup'
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify'
import UserHome from './Pages/User/UserHome'
import EditProfile from './Pages/User/EditProfile'
import Adduser from './Pages/Admin/AddUser'
import EditUser from './Pages/Admin/EditUser'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path={"/admin"} element={<LoginPage/>}></Route>
        <Route path={"/admin/login"} element={<LoginPage/>}></Route>
        <Route path='/admin/signup' element={<SignupPage/>}></Route>
        <Route path='/admin/dashboard' element={<HomePage/>}></Route>
        <Route path='/admin/adminpanel' element={<AdminPanel/>}></Route>
        <Route path='/admin/adminpanel/addUser' element={<Adduser/>}></Route>
        <Route path='/admin/adminpanel/editUser/:id' element={<EditUser/>}></Route>
      </Routes>
      <Routes>
        <Route path={"/"} element={<UserHome/>}></Route>
        <Route path={"/login"} element={<UserLogin/>}></Route>
        <Route path='/signup' element={<UserSignup/>}></Route>
        <Route path='/edit/:id' element={<EditProfile/>}></Route>
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App
