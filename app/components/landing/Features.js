"use client";

import {
  FiPieChart,
  FiDollarSign,
  FiCpu,
  FiShield,
  FiDownload,
  FiMoon,
} from "react-icons/fi";

const features = [
  {
    icon: <FiDollarSign size={28} />,
    title: "Expense Tracking",
    description:
      "Track every income and expense with a simple and intuitive interface.",
  },
  {
    icon: <FiPieChart size={28} />,
    title: "Analytics Dashboard",
    description:
      "Understand your spending using interactive charts and reports.",
  },
  {
    icon: <FiCpu size={28} />,
    title: "AI Insights",
    description:
      "Receive smart financial suggestions based on your spending habits.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure Authentication",
    description:
      "Your financial data stays protected with secure login and encryption.",
  },
  {
    icon: <FiDownload size={28} />,
    title: "CSV Export",
    description:
      "Export your transaction history anytime with a single click.",
  },
  {
    icon: <FiMoon size={28} />,
    title: "Dark Mode",
    description:
      "Switch between light and dark themes for a better viewing experience.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <p className="text-blue-600 font-semibold uppercase tracking-wider">
            Features
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Everything You Need
          </h2>

          <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-lg">
            Powerful tools to manage your finances efficiently,
            visualize spending, and make smarter financial decisions.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-blue-600 transition">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="text-slate-600 mt-4 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}