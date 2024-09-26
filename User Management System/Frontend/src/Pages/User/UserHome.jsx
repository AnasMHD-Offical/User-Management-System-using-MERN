import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../Store/Slices/UserSlice";
import { handleSuccess } from "../../Utils/tostify";

const navigation = [{ name: "Home", href: "/", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserHome() {
  // console.log(User);
  const [user,setUser] = useState({
    name: "Tom Cook",
    email: "tom@example.com",
    phone : "1234567890",
    imageUrl: "../../public/user.png",
    id : "123"
  })
  const users = useSelector((state) => state?.users?.userData?.user);
  console.log(users);
  console.log(users.profile);
  console.log(users.id);
  
  const imgPath = users.profile
  const profilePic = imgPath.split("\\").pop()
  console.log(profilePic);
  
  
  
  
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  useEffect(()=>{
   try {
    const getUserData = async (req,res)=>{
      const url = `http://localhost:8080/user/${users.id}`;
      console.log(url);
      
      const response = await axios.get(url,{
        withCredentials:true
      });
      console.log(response);
      
      const fetchedData = response?.data?.data;
      const profile = fetchedData.profile
      const imgUrl = profile.split("\\").pop()
      setUser({
        name : fetchedData.name,
        email : fetchedData.email,
        phone : fetchedData.phone,
        imageUrl : `http://localhost:8080/${imgUrl}`,
        id:fetchedData._id
      })
    }
    getUserData()
    
   } catch (error) {
    
   }



   
  },[])
  const handleLogout = () =>{
      try {
        const url = "http://localhost:8080/logout"
        const response = axios.post(url,{},{
          withCredentials:true
        })
        if(response){
          dispatch(logout())
          navigate("/login")
          handleSuccess("Logout successfully")
        }
      } catch (error) {
        console.log(error);      
      }
  } 
  const handleEdit= () =>{
    navigate(`/edit/${user.id}`)
  }
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Logo"
                    src={user.imageUrl}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={user.imageUrl}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="Link"
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="h-8 w-8 object-contain rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl sm:flex justify-between px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
              <div>
                  <button onClick={handleEdit} className="border-2 border-blue-300 m-10 px-4 p-2 rounded-md"> Edit </button>
              </div>
          </div>
          <div></div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:flex">
            <div className="md:w-3/4 md:m-0 m-3 p-3">
              <h4 className="text-3xl font-semibold leading-10 mb-2">
                Welcome, {user.name}
              </h4>
              <p className="text-xl mb-2 text-black font-normal">
                Welcome to the facination world of UI
              </p>

              {/* <p className="text-neutral-800">
                As a new system admin, you have access to some of the most
                important functionality on Workplace in the Admin Panel, and you
                might be wondering where to begin. This guide will walk you
                through how to use the Admin Panel to manage people, groups,
                content and the security of your Workplace. Please note, this
                guide is specific to system administrators. Other admin types
                have limited features and functionality. Visit the Technical
                Resources for more information on the different admin roles. You
                can to share with other admins in your community. And be sure to
                check out the User Guide for everything you need to start
                collaborating and communicating on Workplace as a user.
              </p> */}
            </div>
            <div className="border-2 md:w-3/4 flex flex-col p-2 py-5 ">
              <img
                src= {user.imageUrl}
                alt="Profile pic"
                className="rounded-lg w-32 m-auto"
              />

              <div className="m-3 p-5">
                <p className="text-lg font-medium pb-3">Name : {user.name}</p>
                <p className="text-lg font-medium pb-3">Email : {user.email}</p>
                <p className="text-lg font-medium pb-3">Phone : {user.phone}</p>
                <p className="text-lg font-medium pb-3">Designation : User</p>
              </div>
              <button onClick={handleLogout} className="rounded-r-lg rounded-l-lg bg-rose-600 py-2 px-3 text-white">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default UserHome;
