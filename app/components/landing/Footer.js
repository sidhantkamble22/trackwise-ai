"use client";

import Link from "next/link";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold">
              TrackWise AI
            </h2>

            <p className="text-slate-400 mt-5 leading-7">
              Smart AI-powered expense tracking platform
              that helps you manage income, expenses,
              budgeting and financial analytics.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link
                  href="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <a
                  href="#features"
                  className="hover:text-white transition"
                >
                  Features
                </a>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition"
                >
                  Login
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Terms & Conditions
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Help Center
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Contact Us
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FiGithub size={22} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FiLinkedin size={22} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FiMail size={22} />
              </a>

            </div>

            <p className="text-slate-400 mt-6">
              Email
            </p>

            <p className="text-white">
              hello@trackwiseai.com
            </p>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between">

          <p className="text-slate-500 text-sm">
            © 2026 TrackWise AI. All rights reserved.
          </p>

          <p className="text-slate-500 text-sm mt-4 md:mt-0">
            Built with Next.js • React • Tailwind CSS
          </p>

        </div>

      </div>
    </footer>
  );
}