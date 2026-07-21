"use client";

import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Navbar({ onMenuClick, darkMode }) {

  const [user, setUser] = useState({
    fullName: "User",
  });


  useEffect(() => {

    fetchUser();

  }, []);



  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) return;


      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data = await response.json();


      console.log("Navbar User:", data);


      if (data.success) {

        setUser(data.user);

      }


    } catch (error) {

      console.log("User Fetch Error:", error);

    }

  };



  return (

    <header
      className={`h-16 flex items-center justify-between px-4 md:px-8 border-b transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 border-slate-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >


      {/* Left */}

      <div className="flex items-center gap-3">


        <button
          onClick={onMenuClick}
          className={`lg:hidden text-3xl ${
            darkMode
              ? "text-white"
              : "text-slate-700"
          }`}
        >

          <HiOutlineMenuAlt3 />

        </button>



        <h2 className="text-xl font-semibold">

          Dashboard

        </h2>


      </div>





      {/* Right */}

      <div className="flex items-center gap-3">



        {/* Avatar */}

        <div
          className="
          w-10
          h-10
          rounded-full
          bg-slate-900
          flex
          items-center
          justify-center
          text-white
          font-bold
          text-lg
          "
        >

          {user?.fullName
            ? user.fullName.charAt(0).toUpperCase()
            : "U"
          }


        </div>





        {/* User Info */}

        <div className="hidden sm:block">


          <p className="font-semibold">

            {user?.fullName || "User"}

          </p>



          <p
            className={`text-sm ${
              darkMode
                ? "text-slate-400"
                : "text-gray-500"
            }`}
          >

            Welcome Back !

          </p>


        </div>


      </div>


    </header>

  );

}