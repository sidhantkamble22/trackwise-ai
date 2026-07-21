"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border border-slate-700 p-12 lg:p-16">

          {/* Background Blur */}
          <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl"></div>

          <div className="relative z-10 text-center">

            <p className="text-blue-400 font-semibold uppercase tracking-widest">
              Get Started Today
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-5">
              Ready to Take Control of
              <br />
              Your Finances?
            </h2>

            <p className="text-slate-300 text-lg mt-6 max-w-2xl mx-auto leading-8">
              Join TrackWise AI and manage your income, expenses,
              analytics and budgeting from one beautiful dashboard.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-10">

              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all duration-300 hover:scale-105"
              >
                Create Free Account
              </Link>

              <Link
                href="/login"
                className="px-8 py-4 rounded-xl border border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}