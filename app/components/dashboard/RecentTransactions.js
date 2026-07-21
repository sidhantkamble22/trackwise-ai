"use client";

import { MdDelete, MdEdit } from "react-icons/md";
import { FiClock } from "react-icons/fi";

export default function RecentTransactions({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      p-6
      h-[650px]
      flex
      flex-col
      shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Transactions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Track your latest financial activity
          </p>
        </div>

        <div
          className="
          px-3
          py-1.5
          rounded-full
          bg-slate-900
          text-white
          text-xs
          font-medium
          "
        >
          {transactions.length} Total
        </div>
      </div>

      {/* Empty State */}

      {transactions.length === 0 ? (
        <div
          className="
          flex
          flex-1
          flex-col
          items-center
          justify-center
          "
        >
          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-slate-100
            flex
            items-center
            justify-center
            text-2xl
            "
          ></div>

          <h3
            className="
            mt-5
            text-lg
            font-semibold
            text-slate-800
            "
          >
            No Transactions Yet
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Add your first transaction to get started.
          </p>
        </div>
      ) : (
        <div
          className="
          space-y-3
          overflow-y-auto
          pr-2
          flex-1
          "
        >
          {transactions.map((item) => (
            <div
              key={item._id}
              className="
              group
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-4
              p-4
              rounded-2xl
              border
              border-slate-200
              hover:border-slate-300
              hover:shadow-md
              transition-all
              duration-300
              "
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div
                  className={`
                  w-12
                  h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-lg

                  ${
                    item.type === "income"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }

                  `}
                >
                  {item.type === "income" ? "+" : "-"}
                </div>

                <div>
                  <h3
                    className="
                    font-semibold
                    text-slate-900
                    "
                  >
                    {item.title}
                  </h3>

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    mt-1
                    "
                  >
                    <span
                      className="
                      text-xs
                      px-2.5
                      py-1
                      rounded-full
                      bg-slate-100
                      text-slate-600
                      "
                    >
                      {item.category}
                    </span>

                    <span
                      className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      text-slate-400
                      "
                    >
                      <FiClock size={12} />

                      {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div
                className="
                flex
                items-center
                justify-between
                sm:justify-end
                gap-4
                "
              >
                <span
                  className={`
                  font-bold
                  text-lg

                  ${item.type === "income" ? "text-green-600" : "text-red-600"}

                  `}
                >
                  {item.type === "income" ? "+" : "-"}₹
                  {Number(item.amount).toLocaleString("en-IN")}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEditTransaction(item)}
                    className="
                    w-9
                    h-9
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-slate-900
                    hover:text-white
                    transition
                    "
                  >
                    <MdEdit size={18} />
                  </button>

                  <button
                    onClick={() => onDeleteTransaction(item._id)}
                    className="
                    w-9
                    h-9
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-red-600
                    hover:text-white
                    transition
                    "
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
