"use client";

import Link from "next/link";
import { FiMail, FiArrowLeft } from "react-icons/fi";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT */}

      <section className="hidden lg:flex bg-slate-900 text-white items-center justify-center p-16">

        <div className="max-w-md">

          <h1 className="text-5xl font-bold">
            Forgot Password?
          </h1>

          <p className="mt-8 text-slate-300 text-lg leading-8">
            Don't worry. Enter your registered email and
            we'll send you a password reset link.
          </p>

          <div className="mt-12 space-y-5">

            <div className="bg-slate-800 rounded-xl p-5">
              ✓ Secure Password Reset
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              ✓ Email Verification
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              ✓ Fast Recovery Process
            </div>

          </div>

        </div>

      </section>

      {/* RIGHT */}

      <section className="flex items-center justify-center bg-gray-50 p-8">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-slate-900">
              Reset Password
            </h2>

            <p className="text-gray-500 mt-3">
              Enter your email to receive a reset link.
            </p>

          </div>

          <form className="mt-10 space-y-6">

            <div>

              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative mt-2">

                <FiMail className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition"
            >
              Send Reset Link
            </button>

          </form>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 mt-8 text-blue-600 hover:underline"
          >
            <FiArrowLeft />
            Back to Login
          </Link>

        </div>

      </section>

    </main>
  );
}