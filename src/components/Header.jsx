import React from "react";

export default function Header({ currentUser, onGoToLogin }) {
  return (
    <header className="mb-6 flex items-center justify-between relative">
      <div className="text-center w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Team To‑Do</h1>
        <p className="text-sm mt-2 text-gray-400">¡Bienvenido, {currentUser.name}!</p>
      </div>
      <div className="absolute right-0 top-0">
        <button
          onClick={onGoToLogin}
          title="Cambiar usuarios"
          className="rounded-lg px-3 py-1.5 border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs"
        >
          Cambiar usuarios
        </button>
      </div>
    </header>
  );
}
