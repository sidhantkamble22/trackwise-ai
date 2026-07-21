"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoClose } from "react-icons/io5";
import {
  MdDashboard,
  MdReceiptLong,
  MdAnalytics,
  MdAccountBalanceWallet,
  MdPsychology,
  MdPerson,
  MdSettings,
} from "react-icons/md";

export default function Sidebar({
  isOpen,
  onClose,
  darkMode,
}) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <MdReceiptLong size={22} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <MdAnalytics size={22} />,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: <MdAccountBalanceWallet size={22} />,
    },
    {
       name: "AI Assistant",
  path: "/ai",
      icon: <MdPsychology size={22} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <MdPerson size={22} />,
    },
   
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          min-h-screen
          w-64
          ${
            darkMode
              ? "bg-slate-950 text-white"
              : "bg-slate-900 text-white"
          }
          p-6
          z-50
          transform
          transition-all
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="flex justify-between items-center mb-10">
          <Link href="/">
          <h1 className="text-2xl font-bold">
            TrackWise AI
          </h1>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden text-3xl"
          >
            <IoClose />
          </button>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${
                      pathname === item.path
                        ? "bg-slate-800 text-white shadow-lg"
                        : "text-gray-300 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}