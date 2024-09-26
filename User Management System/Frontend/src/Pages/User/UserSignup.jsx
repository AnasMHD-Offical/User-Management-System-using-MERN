import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { handleError, handleSuccess } from "../../Utils/tostify";
import axios from "axios";

function UserSignup() {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profile : null
  });
  // const [error,setError] = useState(false)
  //regex for validation
  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;
  const NameRegex = /^[A-Za-z ]+$/;
  const PhoneRegex = /^[0-9]+$/;
  const PasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
 
  const RegexValidation = ()=>{
    let error = false
    if(!NameRegex.test(signupData.name)){
      handleError("Name should contain only alphabets")
      error = true
    }

    if(!EmailRegex.test(signupData.email)){
      handleError("Enter a valid email")
      error = true
    }
    if(!PasswordRegex.test(signupData.password)){
      handleError("Password must be at least 6 characters , include one digit, one special character, and one capital letter")
      error = true
    }
    if(signupData.phone.length !== 10){
      handleError("Phone number must be 10 digit long")
      error = true
    }else if(!PhoneRegex.test(signupData.phone)){
      handleError("Phone Number must be numbers ")
      error = true
    }
    return error
  }
  function handleInputs(e) {
    const { name, value} = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }
  function handleImageChange(e){
    setSignupData({
      ...signupData,
      profile: e.target.files[0],
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !signupData.phone ||
      !signupData.profile
    ) {
      handleError("All fields required");
    }
    
    console.log(RegexValidation());
    
    if(!RegexValidation()){
    try {
      const url = "http://localhost:8080/signup";
      const response = await axios.post(url,signupData,{
        headers : {
          "Content-Type": "multipart/form-data"
        },
        withCredentials : true
      } );
      console.log(response);

      const { message, success } = response?.data;
      // const {message,name,email} = UserData
      if (success) {
        handleSuccess(message);
        navigate("/login")
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message
      handleError(errorMsg);
      console.log(errorMsg);
    }
  }
  }
  console.log(signupData);

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
              Create an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} action="#" className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full bg-sky-50 border-sky-950 rounded-md border-2 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    onChange={handleInputs}
                    value={signupData.name}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleInputs}
                    value={signupData.email}
                    className="block w-full bg-sky-50 border-sky-950 rounded-md border-2 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="string"
                    onChange={handleInputs}
                    value={signupData.phone}
                    maxLength={10}
                    className="block w-full bg-sky-50 border-sky-950 rounded-md border-2 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="profile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Profile
                </label>
                <div className="mt-2">
                  <input
                    id="profile"
                    name="profile"
                    type="file"
                    onChange={handleImageChange}
                    className="block w-full bg-sky-50 border-sky-950 rounded-md border-2 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    onChange={handleInputs}
                    value={signupData.password}
                    className="block w-full bg-sky-50 border-sky-950 rounded-md border-2 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an acoount?{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
