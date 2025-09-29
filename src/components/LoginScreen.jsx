import React, { useState } from "react";

export default function LoginScreen({ initialUsers, onSaveUsersAndEnter }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedIdx, setSelectedIdx] = useState(null);

  function updateUser(idx, newName) {
    setUsers((prev) => prev.map((u, i) => (i === idx ? { ...u, name: newName } : u)));
  }

  function handleContinue() {
    if (selectedIdx === null) return;
    onSaveUsersAndEnter(users, users[selectedIdx]);
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Team To‑Do</h1>
        <p className="text-sm text-gray-400 mb-6 text-center">Selecciona tu usuario para entrar</p>

        <ul className="divide-y divide-gray-800 mb-6">
          {users.map((u, idx) => (
            <li
              key={u.id}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                selectedIdx === idx ? "bg-purple-600/30" : "hover:bg-gray-800"
              }`}
            >
              <span className="text-sm font-medium text-gray-100">{u.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newName = prompt("Editar nombre de usuario", u.name);
                  if (newName && newName.trim()) updateUser(idx, newName.trim());
                }}
                className="text-xs rounded-lg px-2 py-1 border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleContinue}
          disabled={selectedIdx === null}
          className={`w-full rounded-xl px-4 py-2 font-medium transition ${
            selectedIdx === null
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {selectedIdx === null ? "Iniciar sesión" : `Iniciar sesión como ${users[selectedIdx].name}`}
        </button>
      </div>
    </div>
  );
}
