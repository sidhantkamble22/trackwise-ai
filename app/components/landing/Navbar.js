"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          TrackWise AI
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
          <a
            href="#features"
            className="hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="hover:text-white transition"
          >
            Pricing
          </a>

          <a
            href="#contact"
            className="hover:text-white transition"
          >
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all duration-300"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  );
}