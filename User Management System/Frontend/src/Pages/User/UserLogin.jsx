import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../../Utils/tostify";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Store/Slices/UserSlice";
function UserLogin() {
  const [LoginData , setLoginData] = useState({
    email : "",
    password : ""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) =>{
    const {name , value} = e.target
    setLoginData({
      ...LoginData,
      [name] : value
    })
  }
  const {email,password} = LoginData
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!LoginData.email || !LoginData.password) {
      handleError("Email and Password required");
    }
    try {
      const url = "http://localhost:8080/login";
      const response = await axios.post(url, {email,password});
      console.log(response);
      
      const {message,success,token,UserData} = response?.data
      // const {message,name,email} = UserData
      if(success){
        handleSuccess(message)
        dispatch(setUserData({
          user : UserData
        }))
        navigate("/")
      }

      
    } catch (error) {
      const errorMsg = error?.response?.data?.message
      handleError(errorMsg)
      console.log(errorMsg);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-sky-50">
        <div className="md:border-none border-2 p-5 py-7 border-sky-950 rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="login"
              src="../../public/user1.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} action="#" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    // required
                    autoComplete="email"
                    onChange={handleChange}
                    value={LoginData.email}
                    className="block w-full bg-sky-50 border-sky-950 rounded-md border-2 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    {/* <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
                    Forgot password?
                  </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    // required
                    autoComplete="current"
                    onChange={handleChange}
                    value={LoginData.password}
                    className="block w-full rounded-md px-3 border-2 bg-sky-50 border-sky-950 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              You didn't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
