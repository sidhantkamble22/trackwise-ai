"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function SettingsPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});

  const [currency, setCurrency] = useState("INR");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    router.push("/login");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Delete your account permanently?"
    );

    if (!confirmDelete) return;

    toast("Delete Account API will be added later.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }
    return (
    <main
      className={`flex min-h-screen ${
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

      <section className="flex-1">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
        />

        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* Header */}

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                Settings
              </h1>

              <p className={`${darkMode ? "text-slate-400" : "text-slate-500"} mt-2`}>
                Manage your application preferences.
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

          </div>

          {/* Account */}

          <div className={`rounded-2xl border p-6 mb-6 ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}>

            <h2 className={`text-xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}>
              Account
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <p className={`text-lg font-medium ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className={`text-lg ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  {user.email}
                </p>
              </div>

            </div>

          </div>

          {/* Preferences */}

          <div className={`rounded-2xl border p-6 mb-6 ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}>

            <h2 className={`text-xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}>
              Preferences
            </h2>

            <div className="space-y-6">

              <div className="flex justify-between items-center">

                <span className={darkMode ? "text-white" : "text-slate-900"}>
                  Notifications
                </span>

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() =>
                    setNotifications(!notifications)
                  }
                  className="w-5 h-5"
                />

              </div>

              <div className="flex justify-between items-center">

                <span className={darkMode ? "text-white" : "text-slate-900"}>
                  Currency
                </span>

                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value)
                  }
                  className="border rounded-lg px-3 py-2 text-black"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                </select>

              </div>

            </div>

          </div>

          {/* Security */}

          <div className={`rounded-2xl border p-6 ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}>

            <h2 className={`text-xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}>
              Security
            </h2>

            <div className="flex flex-wrap gap-4">

              <button
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
              >
                Logout
              </button>

              <button
                onClick={handleDeleteAccount}
                className="px-6 py-3 rounded-xl border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}