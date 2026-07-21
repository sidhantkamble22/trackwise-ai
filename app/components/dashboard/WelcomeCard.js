"use client";
import { useEffect, useState } from "react";

import {
  FiSun,
  FiMoon,
  FiCloud,
  FiClock,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";

export default function WelcomeCard({ darkMode }) {
  const [userName, setUserName] = useState("User");
  const [greeting, setGreeting] = useState("");
  const [today, setToday] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchUser();
    updateGreeting();
    updateClock();

    const timer = setInterval(() => {
      updateClock();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/user/profile",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        setUserName(data.user.fullName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }

    setToday(
      new Date().toLocaleDateString(
        "en-IN",

        {
          weekday: "long",

          day: "numeric",

          month: "long",

          year: "numeric",
        },
      ),
    );
  };

  const updateClock = () => {
    setTime(
      new Date().toLocaleTimeString(
        "en-IN",

        {
          hour: "2-digit",

          minute: "2-digit",
        },
      ),
    );
  };

  const GreetingIcon = () => {
    if (greeting === "Good Morning") {
      return <FiSun size={28} />;
    }

    if (greeting === "Good Afternoon") {
      return <FiCloud size={28} />;
    }

    if (greeting === "Good Evening") {
      return <FiSun size={28} />;
    }

    return <FiMoon size={28} />;
  };

  return (
    <div
      className={`
relative
overflow-hidden
rounded-3xl
border
shadow-xl
transition-all
duration-300

${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}

`}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-slate-900/5 blur-3xl"></div>

      <div className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                <GreetingIcon />
              </div>

              <div>
                <h1
                  className={`text-4xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  {greeting},<span className="ml-2">{userName}</span>
                </h1>

                <p
                  className={`mt-2 text-lg ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  Welcome back to TrackWise AI
                </p>
              </div>
            </div>

            <p
              className={`mt-8 max-w-2xl leading-8 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              Manage your income, track every expense, stay within budget, and
              grow your savings using AI-powered financial insights.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <div
                className={`
    flex items-center gap-3
    rounded-2xl
    px-5
    py-4
    border

    ${
      darkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
    `}
              >
                <FiClock
                  className="text-slate-900 bg-white rounded-lg p-1"
                  size={28}
                />

                <div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Current Time
                  </p>

                  <h3
                    className={`font-bold text-lg ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {time}
                  </h3>
                </div>
              </div>

              <div
                className={`
    flex items-center gap-3
    rounded-2xl
    px-5
    py-4
    border

    ${
      darkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
    `}
              >
                <FiActivity className="text-green-500" size={24} />

                <div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    AI Status
                  </p>

                  <h3 className="font-bold text-green-500">Online</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}

          <div
            className={`
lg:w-[360px]
rounded-3xl
border
p-8
flex
flex-col
justify-between

${darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}
`}
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <FiTrendingUp />
                TrackWise AI
              </div>

              <h2
                className={`text-3xl font-bold mt-8 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Financial Health
              </h2>

              <p
                className={`mt-3 leading-7 ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Your finance dashboard is active. Track spending, control your
                budget, and improve savings with AI recommendations.
              </p>
            </div>

            <div className="mt-10">
              <div
                className={`
rounded-2xl
p-6
border

${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}
`}
              >
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Today's Date
                </p>

                <h3
                  className={`text-xl font-bold mt-2 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {today}
                </h3>
              </div>

              <div
                className={`
mt-5
rounded-2xl
bg-slate-900
text-white
p-6
`}
              >
                <p className="text-sm text-slate-300">Financial Score</p>

                <h1 className="text-5xl font-bold mt-3">96%</h1>

                <p className="mt-3 text-slate-300">
                  Excellent Financial Health
                </p>

                <div className="mt-5 w-full h-2 bg-slate-700 rounded-full">
                  <div className="h-full w-[96%] bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
