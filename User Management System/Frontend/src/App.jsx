import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Admin/LoginPage";
import SignupPage from "./Pages/Admin/SignupPage";
import AdminPanel from "./Pages/Admin/AdminPanel";
import HomePage from "./Pages/Admin/HomePage";
import UserLogin from "./Pages/User/UserLogin";
import UserSignup from "./Pages/User/UserSignup";
import { ToastContainer } from "react-toastify";
import UserHome from "./Pages/User/UserHome";
import EditProfile from "./Pages/User/EditProfile";
import Adduser from "./Pages/Admin/AddUser";
import EditUser from "./Pages/Admin/EditUser";
import UserAuth from "./Services/UserAuth";
import UserLoginAuth from "./Services/UserLoginAuth";
import AdminAuth from "./Services/AdminAuth";
import AdminLoginAuth from "./Services/AdminLoginAuth";
function App() {
  return (
    <>
      <Router>
        {/* Admin routes with protected Route */}
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminLoginAuth>
                <LoginPage />
              </AdminLoginAuth>
            }
          ></Route>
          <Route
            path="/admin/login"
            element={
              <AdminLoginAuth>
                <LoginPage />
              </AdminLoginAuth>
            }
          ></Route>
          <Route
            path="/admin/signup"
            element={
              <AdminLoginAuth>
                <SignupPage />
              </AdminLoginAuth>
            }
          ></Route>
          <Route
            path="/admin/dashboard"
            element={
              <AdminAuth>
                <HomePage />
              </AdminAuth>
            }
          ></Route>
          <Route
            path="/admin/adminpanel"
            element={
              <AdminAuth>
                <AdminPanel />
              </AdminAuth>
            }
          ></Route>
          <Route
            path="/admin/adminpanel/addUser"
            element={
              <AdminAuth>
                <Adduser />
              </AdminAuth>
            }
          ></Route>
          <Route
            path="/admin/adminpanel/editUser/:id"
            element={
              <AdminAuth>
                <EditUser />
              </AdminAuth>
            }
          ></Route>
        </Routes>
        {/* user routes with protected Route */}
        <Routes>
          <Route
            path={"/"}
            element={
              <UserAuth>
                <UserHome />
              </UserAuth>
            }
          ></Route>
          <Route
            path={"/login"}
            element={
              <UserLoginAuth>
                <UserLogin />
              </UserLoginAuth>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <UserLoginAuth>
                <UserSignup />
              </UserLoginAuth>
            }
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <UserAuth>
                <EditProfile />
              </UserAuth>
            }
          ></Route>
        </Routes>
      </Router>
      {/* Toster for validation messages */}
      <ToastContainer />
    </>
  );
}

export default App;
