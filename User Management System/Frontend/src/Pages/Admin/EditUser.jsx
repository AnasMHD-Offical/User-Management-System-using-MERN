import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../Utils/tostify";
import axios from "axios";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: id,
    name: "",
    email: "",
    profile: "",
    phone: "",
    password: "",
  });
  const [EditedData, setEditedData] = useState({
    id: id,
    name: "",
    email: "",
    phone: "",
    password: "",
    profile: "",
  });

  useEffect(() => {
    const getUserData = async (req, res) => {
      try {
        const url = `http://localhost:8080/user/${userData.id}`;
        const response = await axios.get(url);
        const fetchedData = response?.data?.data;
        console.log(fetchedData, "something fishy");

        setEditedData((prev) => ({
          ...prev,
          name: fetchedData.name || "",
          email: fetchedData.email || "",
          profile: fetchedData.profile || "",
          phone: fetchedData.phone || "",
        }));
        setUserData((prev) => ({
          ...prev,
          name: fetchedData.name || "",
          email: fetchedData.email || "",
          profile: fetchedData.profile || "",
          phone: fetchedData.phone || "",
        }));
        // console.log(userData);
      } catch (error) {
        handleError(error);
        console.log(error);
      }
    };
    getUserData();
  }, []);

  function handleInputs(e) {
    const { name, value } = e.target;
    setEditedData({
      ...EditedData,
      [name]: value,
    });
  }
  function handleImageChange(e) {
    setEditedData({
      ...EditedData,
      profile: e.target.files[0],
    });
  }
   //regex for validation
   const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;
   const NameRegex = /^[A-Za-z ]+$/;
   const PhoneRegex = /^[0-9]+$/;
   const PasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
  
   const RegexValidation = ()=>{
     let error = false
     if(!NameRegex.test(EditedData.name)){
       handleError("Name should contain only alphabets")
       error = true
     }
 
     if(!EmailRegex.test(EditedData.email)){
       handleError("Enter a valid email")
       error = true
     }
     if(!PasswordRegex.test(EditedData.password)){
       handleError("Password must be at least 6 characters , include one digit, one special character, and one capital letter")
       error = true
     }
     if(EditedData.phone.length !== 10){
       handleError("Phone number must be 10 digit long")
       error = true
     }else if(!PhoneRegex.test(EditedData.phone)){
       handleError("Phone Number must be numbers ")
       error = true
     }
     return error
   }
  async function handleSubmit(e) {
    e.preventDefault();
    
      if (
        EditedData.name === ""||
        EditedData.email === ""||
        EditedData.password === ""||
        EditedData.phone === ""||
        EditedData.profile === ""
      ) {
        handleError("All fields required");
      }
      
      if(!RegexValidation()){
        try {
        const url = "http://localhost:8080/admin//editUser";
        const response = await axios.patch(url, EditedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const { message, success } = response?.data;
        if (success) {
          handleSuccess(message);
          navigate("/admin/adminpanel");
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.message;
        handleError(errorMsg);
        console.log(error);
      }
    }
  }
const handleClick = ()=>{
    navigate("/admin/adminpanel")
}

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-sky-50">
        <div className="md:border-none border-2 p-5 py-7 border-sky-950 rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Adduser"
              src="../../../public/user1.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit User Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={EditedData.name}
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
                    value={EditedData.email}
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
                    value={EditedData.phone}
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
                    className="block w-full bg-sky-50 border-sky-950 rounded-md border-2 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                  <button onClick={handleClick} className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      back to Home
                  </button>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green   -600"
                >
                  Edit User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
