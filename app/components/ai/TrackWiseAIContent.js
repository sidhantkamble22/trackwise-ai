"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiCpu,
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
  FiActivity,
} from "react-icons/fi";
import toast from "react-hot-toast";



export default function TrackWiseAI() {

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState([
    {
      role: "ai",
      text: `Hello !

I'm TrackWise AI.

I can analyze your expenses, suggest savings, explain your spending habits and answer finance related questions.

How can I help you today?`,
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  const quickActions = [
    {
      icon: <FiTrendingUp size={18} />,
      title: "Analyze Expenses",
      prompt: "Analyze my expenses",
    },
    {
      icon: <FiDollarSign size={18} />,
      title: "Saving Tips",
      prompt: "Give me saving tips",
    },
    {
      icon: <FiPieChart size={18} />,
      title: "Monthly Report",
      prompt: "Give me my monthly financial summary",
    },
    {
      icon: <FiActivity size={18} />,
      title: "Budget Advice",
      prompt: "Give me budget advice",
    },
  ];

  const sendMessage = async (customPrompt = null) => {

    const userMessage = customPrompt || message;

    if (!userMessage.trim()) return;

    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        setChat((prev) => [
          ...prev,
          {
            role: "ai",
            text: data.answer,
          },
        ]);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error("AI response failed");

    } finally {

      setLoading(false);

    }

  };
    return (
    <main className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Premium Header */}

        <div className="rounded-3xl bg-slate-900 p-8 shadow-2xl">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">

                  <FiCpu className="text-white text-3xl" />

                </div>

                <div>

                  <h1 className="text-4xl font-bold text-white">

                    TrackWise AI

                  </h1>

                  <p className="text-slate-300 mt-2">

                    AI Powered Personal Financial Assistant

                  </p>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-white font-medium">

                AI Online

              </span>

            </div>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="flex flex-wrap gap-3 mt-6">

  {quickActions.map((item, index) => (

    <button
      key={index}
      onClick={() => sendMessage(item.prompt)}
      className="
        flex
        items-center
        gap-2
        px-4
        py-2.5
        rounded-xl
        bg-slate-900
        text-white
        text-sm
        font-medium
        hover:bg-slate-800
        transition
      "
    >

      {item.icon}

      <span>
        {item.title}
      </span>

    </button>

  ))}

</div>


        {/* Chat Container */}

     {/* Chat Container */}

<div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">


  {/* Chat Header */}

  <div className="px-5 sm:px-8 py-5 border-b border-slate-200 flex items-center justify-between">

    <div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
        TrackWise AI Chat
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Your personal finance assistant
      </p>

    </div>


    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm">

      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

      Online

    </div>


  </div>



  {/* Messages */}


  <div
    className="
    h-[60vh]
    sm:h-[550px]
    overflow-y-auto
    bg-slate-50
    px-4
    sm:px-8
    py-6
    space-y-5
    "
  >


    {chat.map((item,index)=>(


      <div
        key={index}
        className={`flex ${
          item.role==="user"
          ?"justify-end"
          :"justify-start"
        }`}
      >


        <div
          className={`
          max-w-[90%]
          sm:max-w-[75%]
          rounded-3xl
          px-5
          py-4
          shadow-sm
          ${
            item.role==="user"
            ?
            "bg-slate-900 text-white rounded-br-md"
            :
            "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
          }
          `}
        >


          <div className="flex items-center gap-2 mb-2">


            {
              item.role==="user"
              ?
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs">
                U
              </div>
              :
              <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center">
                <FiCpu className="text-white text-sm"/>
              </div>
            }


            <span
              className={`text-xs font-semibold ${
                item.role==="user"
                ?
                "text-slate-300"
                :
                "text-slate-500"
              }`}
            >

              {
                item.role==="user"
                ?
                "You"
                :
                "TrackWise AI"
              }

            </span>


          </div>



          <p className="whitespace-pre-wrap leading-7 text-sm sm:text-base">

            {item.text}

          </p>


        </div>


      </div>


    ))}



    {
      loading && (

        <div className="flex justify-start">

          <div className="bg-white border rounded-3xl px-5 py-4 shadow-sm">


            <div className="flex gap-2">


              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>

              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>

              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></span>


            </div>


          </div>


        </div>

      )
    }



    <div ref={bottomRef}></div>


  </div>




  {/* Input */}


  <div className="p-4 sm:p-6 border-t bg-white">


    <div className="flex gap-3 text-black">


      <textarea 

        rows={1}

        value={message}

        onChange={(e)=>setMessage(e.target.value)}

        onKeyDown={(e)=>{

          if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            sendMessage();

          }

        }}

        placeholder="Message TrackWise AI..."

        className="
        flex-1
        resize-none
        rounded-2xl
        border
        border-slate-300
        px-4
        py-3
        text-sm
        sm:text-base
        outline-none
        focus:ring-2
        focus:ring-slate-900
        "
      />



      <button

        onClick={()=>sendMessage()}

        disabled={loading}

        className="
        bg-slate-900
        hover:bg-black
        text-white
        rounded-2xl
        px-5
        flex
        items-center
        justify-center
        transition
        "
      >

        <FiSend size={20}/>

      </button>



    </div>


  </div>


</div>

      </div>

    </main>
  );
}
          