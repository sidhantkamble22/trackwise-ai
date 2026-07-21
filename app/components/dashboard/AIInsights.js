"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FiCpu, FiArrowRight, FiRefreshCw, FiLoader } from "react-icons/fi";

export default function AIInsights() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);

      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const lines = data.answer
          .split("\n")
          .filter((item) => item.trim() !== "");

        setInsights(lines);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Unable to load AI Insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center">
            <FiCpu className="text-white text-xl" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 text-lg">TrackWise AI</h2>

            <p className="text-slate-500 text-sm">Live Financial Insights</p>
          </div>
        </div>

        <button
          onClick={fetchInsights}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FiLoader className="animate-spin text-slate-700" />

            <span className="text-slate-700 font-medium">
              TrackWise AI is analyzing...
            </span>
          </div>

          <div className="space-y-3">
            <div className="h-4 rounded bg-slate-200 animate-pulse"></div>

            <div className="h-4 rounded bg-slate-200 animate-pulse w-5/6"></div>

            <div className="h-4 rounded bg-slate-200 animate-pulse w-4/6"></div>

            <div className="h-4 rounded bg-slate-200 animate-pulse w-3/6"></div>
          </div>
        </div>
      )}
      {/* Error */}

      {!loading && error && (
        <div className="text-center py-10">
          <div className="text-red-500 font-semibold mb-4">{error}</div>

          <button
            onClick={fetchInsights}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Success */}

      {!loading && !error && (
        <>
          <div className="space-y-3">
            {insights.map((item, index) => (
              <div
                key={index}
                className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
                hover:bg-slate-100
                transition
                "
              >
                <div
                  className="
                  w-8
                  h-8
                  rounded-full
                  bg-slate-900
                  text-white
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                  shrink-0
                  "
                >
                  ✓
                </div>

                <p className="text-slate-700 leading-7">{item}</p>
              </div>
            ))}
          </div>

          {/* Footer */}

          <div className="border-t border-slate-200 mt-6 pt-5">
            <button
              onClick={() => router.push("/ai")}
              className="
              w-full
              bg-slate-900
              hover:bg-black
              text-white
              rounded-2xl
              py-3
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition
              "
            >
              Open AI Chat
              <FiArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
