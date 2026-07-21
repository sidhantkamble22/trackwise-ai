"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

   setLoading(true);

try {
  const response = await fetch(
    "http://localhost:5000/api/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message);
    setLoading(false);
    return;
  }

  toast.success(data.message);

  setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  router.push("/login");
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
            Join TrackWise AI
          </h1>

          <p className="mt-8 text-slate-300 text-lg leading-8">
            Create your account and start managing your
            finances with smart analytics, budgeting and
            AI-powered insights.
          </p>

          <div className="mt-12 space-y-5">
            <div className="bg-slate-800 rounded-xl p-5">
              ✓ Unlimited Transactions
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              ✓ Smart Expense Analytics
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              ✓ AI Financial Suggestions
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT */}

      <section className="flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3">
              Start your financial journey today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5"
          >
            {/* Name */}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>

              <div className="relative mt-2">
                <FiUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative mt-2">
                <FiMail className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 text-black outline-none focus:ring-2 focus:ring-blue-500"
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Confirm Password
              </label>

              <div className="relative mt-2">
                <FiLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 text-black outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showConfirm ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white py-3 rounded-xl transition"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <div className="flex items-center gap-3">
              <hr className="flex-1" />
              
            </div>

          
            
          </form>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?

            <Link
              href="/login"
              className="text-blue-600 font-semibold ml-2"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}