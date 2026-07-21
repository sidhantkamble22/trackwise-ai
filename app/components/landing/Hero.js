"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">

      {/* Background Blur */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300">
            AI Powered Finance Management
          </span>

          <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight">

            Track

            <span className="text-blue-400">
              {" "}
              Expenses
            </span>

            <br />

            Like a Pro.

          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-300 max-w-xl">

            Take control of your finances with beautiful analytics,
            AI-powered insights, budgeting tools and real-time
            expense tracking.

          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <Link
              href="/signup"
              className="px-7 py-4 rounded-xl bg-white text-slate-900 font-semibold hover:scale-105 transition"
            >
              Get Started
            </Link>

            <Link
              href="/dashboard"
              className="px-7 py-4 rounded-xl border border-slate-500 hover:bg-slate-800 transition"
            >
              Live Dashboard
            </Link>

          </div>

          {/* Stats */}

          <div className="flex gap-10 mt-14">

            <div>
              <h2 className="text-3xl font-bold">
                25K+
              </h2>

              <p className="text-slate-400">
                Transactions
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                ₹10Cr+
              </h2>

              <p className="text-slate-400">
                Managed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                98%
              </h2>

              <p className="text-slate-400">
                Satisfaction
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          {/* Main Card */}

          <div className="rounded-3xl bg-white p-8 shadow-2xl">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Total Balance
                </p>

                <h2 className="text-4xl font-bold text-slate-900 mt-2">
                  ₹32,700
                </h2>

              </div>

              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                ₹
              </div>

            </div>

            {/* Cards */}

            <div className="grid grid-cols-2 gap-5 mt-8">

              <div className="rounded-xl bg-green-100 p-5">

                <p className="text-gray-500">
                  Income
                </p>

                <h3 className="text-2xl font-bold text-green-700 mt-2">
                  ₹45,000
                </h3>

              </div>

              <div className="rounded-xl bg-red-100 p-5">

                <p className="text-gray-500">
                  Expense
                </p>

                <h3 className="text-2xl font-bold text-red-700 mt-2">
                  ₹12,300
                </h3>

              </div>

            </div>

            {/* Fake Chart */}

            <div className="mt-10">

              <p className="text-gray-500 mb-4">
                Monthly Overview
              </p>

              <div className="flex items-end gap-3 h-36">

                <div className="bg-blue-500 w-8 rounded-t h-14"></div>

                <div className="bg-blue-500 w-8 rounded-t h-24"></div>

                <div className="bg-blue-500 w-8 rounded-t h-20"></div>

                <div className="bg-blue-500 w-8 rounded-t h-32"></div>

                <div className="bg-blue-500 w-8 rounded-t h-16"></div>

                <div className="bg-blue-500 w-8 rounded-t h-28"></div>

              </div>

            </div>

          </div>

          {/* Floating Card */}

          <div className="absolute -left-8 top-10 bg-white rounded-2xl shadow-xl p-4 hidden lg:block">

            <p className="text-gray-500 text-sm">
              Savings
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              +18%
            </h3>

          </div>

          <div className="absolute -right-6 bottom-10 bg-white rounded-2xl shadow-xl p-4 hidden lg:block">

            <p className="text-gray-500 text-sm">
              AI Score
            </p>

            <h3 className="text-2xl font-bold text-blue-600">
              92/100
            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}