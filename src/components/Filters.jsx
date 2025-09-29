import React from "react";

export default function Filters({ search, setSearch, tab, setTab }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por autor o texto…"
        className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-gray-100 placeholder-gray-500 border-gray-700 w-full md:max-w-md"
      />
      <div className="flex gap-2 justify-center md:justify-start">
        {[
          { k: "all", label: "Todas" },
          { k: "pending", label: "Pendientes" },
          { k: "done", label: "Completadas" },
        ].map((f) => (
          <button
            key={f.k}
            onClick={() => setTab(f.k)}
            className={`text-sm rounded-full px-3 py-1.5 transition border shadow-sm ${
              tab === f.k
                ? "bg-purple-600 border-purple-600 text-white"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
