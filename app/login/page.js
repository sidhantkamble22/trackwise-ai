"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
} from "react-icons/fi";

export default function LoginPage() {

  const router = useRouter();

  
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

  setLoading(true);

try {
  const response = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message);
    return;
  }

  // Save JWT
  localStorage.setItem("token", data.token);

  // Save User
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  toast.success("Login Successful!");

  router.push("/dashboard");

} catch (error) {
  console.error(error);
  toast.error("Something went wrong");
} finally {
  setLoading(false);
}
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT */}

      <section className="hidden lg:flex bg-slate-900 text-white items-center justify-center p-16">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            TrackWise AI
          </h1>

          <p className="mt-8 text-slate-300 leading-8 text-lg">
            Welcome back.
            <br />
            <br />
            Manage your expenses, monitor your income,
            visualize analytics and get AI powered
            financial insights.
          </p>

          <div className="mt-12 space-y-6">
            <div className="bg-slate-800 rounded-xl p-5">
              ✓ Expense Tracking
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              ✓ Smart Analytics
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              ✓ AI Suggestions
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT */}

      <section className="flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-3">
              Login to your account
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >
            {/* Email */}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative mt-2">
                <FiMail className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative mt-2">
                <FiLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember */}

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition disabled:opacity-60"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-3">
             

              <hr className="flex-1" />
            </div>

            {/* Google */}

         
          
          </form>

          <p className="text-center mt-8 text-gray-500">
            Don't have an account?

            <Link
              href="/signup"
              className="text-blue-600 font-semibold ml-2"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}