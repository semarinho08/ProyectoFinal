import React, { useState } from "react";
import { uid } from "../utils/uid";

export default function TaskForm({ currentUser, onAdd }) {
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;

    onAdd({
      id: uid(),
      author: currentUser.name,
      text: clean,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    });

    setText("");
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border p-5 mb-4 shadow-sm bg-gray-900 border-gray-800">
      <label className="block text-sm font-medium mb-2 text-gray-300">Nueva tarea</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe la tarea…"
          className="flex-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-gray-100 placeholder-gray-500 border-gray-700"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-xl px-4 py-2 font-medium bg-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-700 transition shadow"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
