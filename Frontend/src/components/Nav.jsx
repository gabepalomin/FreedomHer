import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa"; // Importing the profile icon
import freedomfairy from "../assets/butterfly.png";
import { useAuth } from "../context/authContext.jsx";

function Nav() {
  const [Navbar, setNav] = useState(false);
  const { currentUser, logout } = useAuth();
  const handleNav = () => {
    setNav(!Navbar);
  };

  const HandleSignOut = () => {
    logout();
  };

  return (
    <nav className="bg-[rgba(132,62,250,0.2)] p-5 px-8 font-herfonty shadow-lg backdrop-blur-lg text-[rgb(55,32,107)]">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-purple text-4xl font-semibold flex items-center"
        >
          <img
            src={freedomfairy}
            className="w-20 h-20 hover:animate-bounce ease-in-out duration-300"
          />
          FreedomHER
        </Link>
        <ul className="hidden md:flex items-center md:gap-10 lg:gap-14">
          <li>
            <Link
              to="/"
              className="text-purple hover:text-pink-300 transition ease-in-out duration-300 text-2xl lg:text-2xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/forum"
              className="text-purple hover:text-pink-300 transition ease-in-out duration-300 text-2xl lg:text-2xl"
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-purple hover:text-pink-300 transition ease-in-out duration-300 text-2xl lg:text-2xl"
            >
              About
            </Link>
          </li>
          {currentUser ? (
            <li className="flex flex-col items-center gap-1 p-2  rounded-lg bg-[rgba(132,62,250,0.9)]">
              <div className="flex items-center">
                <FaUserCircle size={30} className="text-white mr-2" />
                <span className="text-purple text-white text-2xl lg:text-2xl">
                  {currentUser.username}
                </span>
              </div>
              <button
                onClick={HandleSignOut}
                className=" bg-[rgba(232,220,253,0.3)] hover:bg-gray-900 hover:text-purple-500 ease-in-out duration-150  rounded-xl w-fit p-1 px-2"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/Login"
                className="text-purple hover:text-pink-300 transition ease-in-out duration-300 text-2xl lg:text-2xl"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
        <div onClick={handleNav} className="md:hidden cursor-pointer">
          {Navbar ? (
            <IoCloseSharp size={40} color="white" />
          ) : (
            <RxHamburgerMenu size={40} color="white" />
          )}
        </div>
      </div>
      <div
        className={
          Navbar
            ? "fixed left-0 top-0 w-[40%] min-h-screen pl-4 text-white  bg-purple-900 pt-3  ease-in-out duration-300 z-50 md:hidden"
            : "fixed left-[-100%] top-0 w-[40%] min-h-screen  text-white  bg-purple-900    ease-in-out duration-300 z-50 md:hidden"
        }
      >
        <ul className="uppercase flex flex-col gap-5 font-herfont pt-8 text-2xl">
          <li>
            <Link
              to="/"
              className="text-white hover:text-pink-300 transition ease-in-out duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/forum"
              className="text-white hover:text-pink-300 transition ease-in-out duration-300"
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-pink-300 transition ease-in-out duration-300"
            >
              About
            </Link>
          </li>
          {currentUser ? (
            <li className="flex items-center">
              <FaUserCircle size={30} className="mr-2" />
              <span>{currentUser.username}</span>
            </li>
          ) : (
            <li>
              <Link
                to="/Login"
                className="text-white hover:text-pink-300 transition ease-in-out duration-300"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
