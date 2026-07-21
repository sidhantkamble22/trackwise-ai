"use client";

import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import TrackWiseAIContent from "../components/ai/TrackWiseAIContent";


export default function AIPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);


  return (

    <main
      className={`
        flex 
        min-h-screen 
        w-full
        overflow-x-hidden
        ${
          darkMode
            ? "bg-slate-900"
            : "bg-slate-100"
        }
      `}
    >


      {/* Sidebar */}

      <Sidebar

        isOpen={sidebarOpen}

        onClose={() =>
          setSidebarOpen(false)
        }

        darkMode={darkMode}

      />



      {/* Main Area */}

      <section
        className="
          flex-1
          min-w-0
          w-full
        "
      >


        {/* Navbar */}

        <Navbar

          onMenuClick={() =>
            setSidebarOpen(true)
          }

          darkMode={darkMode}

          setDarkMode={setDarkMode}

        />



        {/* Page Content */}

        <div
          className="
            w-full
            max-w-full
            p-4
            sm:p-6
            lg:p-8
          "
        >

          <TrackWiseAIContent />

        </div>


      </section>


    </main>

  );

}