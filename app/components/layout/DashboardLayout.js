"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
  darkMode,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <main className="flex min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

      <section className="flex-1 bg-gray-100 overflow-y-auto">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}