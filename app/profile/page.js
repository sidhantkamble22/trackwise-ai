"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiCalendar,
  FiActivity,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";


export default function ProfilePage() {

  const router = useRouter();


  const [sidebarOpen,setSidebarOpen] = useState(false);

  const [darkMode,setDarkMode] = useState(false);

  const [loading,setLoading] = useState(true);


  const [user,setUser] = useState({});


  const [stats,setStats] = useState({
    totalTransactions:0,
    totalIncome:0,
    totalExpense:0,
    balance:0,
  });



  useEffect(()=>{

    const token = localStorage.getItem("token");


    if(!token){

      router.push("/login");

      return;

    }


    fetchProfile();


  },[]);



  const fetchProfile = async()=>{

    try{


      setLoading(true);


      const token = localStorage.getItem("token");


      const response = await fetch(
        "http://localhost:5000/api/user/profile",
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      const data = await response.json();



      if(data.success){

        setUser(data.user);

        setStats(data.stats);

      }
      else{

        toast.error(data.message);

      }


    }
    catch(error){

      console.log(error);

      toast.error("Failed to load profile");

    }
    finally{

      setLoading(false);

    }


  };



  const handleLogout =()=>{


    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );


    if(!confirmLogout)
      return;



    localStorage.removeItem("token");


    toast.success(
      "Logged out successfully"
    );


    router.push("/login");


  };



  if(loading){

    return(

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-xl font-semibold text-slate-700">

          Loading Profile...

        </div>

      </div>

    );

  }



  return (

    <main
      className={`
        flex
        min-h-screen
        w-full
        overflow-x-hidden
        ${
          darkMode
          ?"bg-slate-900"
          :"bg-slate-100"
        }
      `}
    >


      <Sidebar

        isOpen={sidebarOpen}

        onClose={()=>setSidebarOpen(false)}

        darkMode={darkMode}

      />



      <section className="flex-1 min-w-0">


        <Navbar

          onMenuClick={()=>setSidebarOpen(true)}

          darkMode={darkMode}

          setDarkMode={setDarkMode}

        />



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


          {/* Header */}


          <div className="flex flex-col sm:flex-row justify-between gap-5 mb-8">


            <div>


              <h1
                className={`
                  text-4xl
                  font-bold
                  ${
                    darkMode
                    ?"text-white"
                    :"text-slate-900"
                  }
                `}
              >

                My Profile

              </h1>


              <p
                className={`
                  mt-2
                  ${
                    darkMode
                    ?"text-slate-400"
                    :"text-slate-500"
                  }
                `}
              >

                Manage your TrackWise account information

              </p>


            </div>



            <button

              onClick={()=>setDarkMode(!darkMode)}

              className="
                bg-slate-900
                hover:bg-slate-800
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
                transition
              "
            >

              {darkMode
              ?"Light Mode"
              :"Dark Mode"}

            </button>


          </div>





          {/* Profile Card */}


          <div
            className={`
              rounded-3xl
              border
              p-8
              shadow-xl
              ${
                darkMode
                ?
                "bg-slate-800 border-slate-700"
                :
                "bg-white border-slate-200"
              }
            `}
          >


            <div className="flex flex-col sm:flex-row items-center gap-6">


              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-slate-900
                  flex
                  items-center
                  justify-center
                  text-white
                  text-4xl
                  font-bold
                "
              >

                {user.name?.charAt(0).toUpperCase()}

              </div>



              <div className="text-center sm:text-left">


                <h2
                  className={`
                    text-3xl
                    font-bold
                    ${
                      darkMode
                      ?"text-white"
                      :"text-slate-900"
                    }
                  `}
                >

                  {user.name}

                </h2>


                <p className="text-slate-500 mt-1">

                  Financial Dashboard Member

                </p>


              </div>


            </div>
                        {/* User Details */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">


              <div
                className={`
                  rounded-2xl
                  p-5
                  border
                  ${
                    darkMode
                    ?
                    "bg-slate-700 border-slate-600"
                    :
                    "bg-slate-50 border-slate-200"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <FiMail className="text-slate-900 text-xl"/>

                  <div>

                    <p className="text-sm text-slate-500">
                      Email
                    </p>

                    <p
                      className={`
                        font-semibold
                        ${
                          darkMode
                          ?"text-white"
                          :"text-slate-800"
                        }
                      `}
                    >
                      {user.email}
                    </p>

                  </div>

                </div>

              </div>




              <div
                className={`
                  rounded-2xl
                  p-5
                  border
                  ${
                    darkMode
                    ?
                    "bg-slate-700 border-slate-600"
                    :
                    "bg-slate-50 border-slate-200"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <FiCalendar className="text-slate-900 text-xl"/>

                  <div>

                    <p className="text-sm text-slate-500">
                      Member Since
                    </p>

                    <p
                      className={`
                        font-semibold
                        ${
                          darkMode
                          ?"text-white"
                          :"text-slate-800"
                        }
                      `}
                    >

                      {new Date(user.createdAt)
                      .toLocaleDateString("en-IN")}

                    </p>

                  </div>

                </div>

              </div>




              <div
                className={`
                  rounded-2xl
                  p-5
                  border
                  ${
                    darkMode
                    ?
                    "bg-slate-700 border-slate-600"
                    :
                    "bg-slate-50 border-slate-200"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <FiActivity className="text-slate-900 text-xl"/>

                  <div>

                    <p className="text-sm text-slate-500">
                      Account Status
                    </p>

                    <p className="font-semibold text-green-600">

                      Active

                    </p>

                  </div>

                </div>

              </div>


            </div>





            {/* Stats Cards */}


            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">



              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">

                <div className="flex justify-between">

                  <p className="text-slate-500">
                    Transactions
                  </p>

                  <FiActivity className="text-slate-900"/>

                </div>


                <h2 className="text-3xl font-bold text-slate-900 mt-4">

                  {stats.totalTransactions}

                </h2>


              </div>





              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">


                <div className="flex justify-between">

                  <p className="text-slate-500">
                    Income
                  </p>


                  <FiTrendingUp className="text-green-600"/>

                </div>


                <h2 className="text-3xl font-bold text-green-600 mt-4">

                  ₹{stats.totalIncome.toLocaleString()}

                </h2>


              </div>





              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">


                <div className="flex justify-between">

                  <p className="text-slate-500">
                    Expense
                  </p>


                  <FiTrendingDown className="text-red-600"/>

                </div>


                <h2 className="text-3xl font-bold text-red-600 mt-4">

                  ₹{stats.totalExpense.toLocaleString()}

                </h2>


              </div>





              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">


                <div className="flex justify-between">

                  <p className="text-slate-500">
                    Balance
                  </p>


                  <FiDollarSign className="text-indigo-600"/>

                </div>


                <h2 className="text-3xl font-bold text-indigo-600 mt-4">

                  ₹{stats.balance.toLocaleString()}

                </h2>


              </div>



            </div>





            {/* Logout Button */}


            <div className="mt-10">


              <button

                onClick={handleLogout}

                className="
                  px-8
                  py-3
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-semibold
                  transition
                "
              >

                Logout

              </button>


            </div>



          </div>


        </div>


      </section>


    </main>

  );

}