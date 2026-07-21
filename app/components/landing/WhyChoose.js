"use client";

import {
  FiCheckCircle,
  FiTrendingUp,
  FiShield,
  FiClock,
} from "react-icons/fi";

const benefits = [
  {
    icon: <FiTrendingUp size={22} />,
    title: "Powerful Analytics",
    description:
      "Understand your spending with clean charts and detailed reports.",
  },
  {
    icon: <FiShield size={22} />,
    title: "Secure & Reliable",
    description:
      "Your financial data is stored securely with modern authentication.",
  },
  {
    icon: <FiClock size={22} />,
    title: "Real-Time Tracking",
    description:
      "Instantly add, edit and monitor transactions anytime.",
  },
  {
    icon: <FiCheckCircle size={22} />,
    title: "Easy to Use",
    description:
      "Minimal, responsive and beginner-friendly interface.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Side */}
        <div>
          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Built for Smart Money Management
          </h2>

          <p className="text-slate-600 text-lg mt-6 leading-8">
            TrackWise AI combines beautiful design with powerful
            expense management features so you can stay focused
            on your financial goals.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-12">

            <div className="bg-slate-900 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-white">
                25K+
              </h3>

              <p className="text-slate-300 mt-2">
                Transactions
              </p>
            </div>

            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-white">
                98%
              </h3>

              <p className="text-blue-100 mt-2">
                User Satisfaction
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-slate-900">
                ₹10Cr+
              </h3>

              <p className="text-slate-600 mt-2">
                Money Managed
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-slate-900">
                24/7
              </h3>

              <p className="text-slate-600 mt-2">
                Available
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-8">

          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-2 leading-7">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}