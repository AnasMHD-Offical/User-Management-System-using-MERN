import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { handleError, handleInfo, handleSuccess } from "../../Utils/tostify";
import axios from "axios";

function EditProfile() {

  const { id } = useParams();
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    id : id,
    name: "",
    email: "",
    profile: "",
    phone: "",
    password: "",
  });
  const [EditedData, setEditedData] = useState({
    id : id,
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
        console.log(fetchedData,"something fishy");

        setEditedData((prev) => ({
          ...prev,
          name: fetchedData.name || "",
          email: fetchedData.email || "",
          profile: fetchedData.profile || "",
          phone: fetchedData.phone || "",
          password: fetchedData.password || "",
        }));
        setUserData((prev) => ({
          ...prev,
          name: fetchedData.name || "",
          email: fetchedData.email || "",
          profile: fetchedData.profile || "",
          phone: fetchedData.phone || "",
          password: fetchedData.password || "",
        }));
        // console.log(userData);
      } catch (error) {
        handleError(error);
        console.log(error);
      }
    };
    getUserData();
  }, []);
  // console.log(userData);

  // const [profile , setProfile] = useState()
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
  async function handleSubmit(e) {
    e.preventDefault();
    try {
    if (
      EditProfile.name === "" ||
      EditProfile.email === "" ||
      EditProfile.password === "" ||
      EditProfile.phone === "" ||
      EditProfile.profile === ""
    ) {
      handleError("All fields required");
    }
      const url = "http://localhost:8080/edit";
      const response = await axios.patch(url, EditedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      const { message, success } = response?.data;
      // const {message,name,email} = UserData
      if (success) {
        handleSuccess(message);
        navigate("/")
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message
      handleError(errorMsg);
      console.log(errorMsg);
    }
  }
  console.log(EditedData);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-sky-50">
        <div className="md:border-none border-2 p-5 py-7 border-sky-950 rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Adduser"
              src="../../user1.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit your account
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
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Edit details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
