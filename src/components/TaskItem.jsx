import React, { useState } from "react";

function TaskItem({ task, onToggle, onEdit, onRequestDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  function saveEdit() {
    const clean = draft.trim();
    if (!clean || clean === task.text) {
      setIsEditing(false);
      return;
    }
    onEdit(task.id, clean);
    setIsEditing(false);
  }

  function onKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === "Escape") {
      setDraft(task.text);
      setIsEditing(false);
    }
  }

  return (
    <li className="p-4 md:p-5 flex items-center gap-3 hover:bg-gray-800/60 transition">
      {/* Botón de completar */}
      <button
        onClick={() => onToggle(task.id)}
        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
          task.completed ? "bg-purple-600 border-purple-600" : "bg-gray-900 border-gray-600"
        }`}
        title={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
      >
        {task.completed && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-white">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0L3.293 9.957a1 1 0 011.414-1.414l3.043 3.043 6.543-6.543a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Contenido de la tarea */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-medium text-gray-200 break-all">{task.author}</span>
          <span className="text-xs text-gray-500">•</span>
          <time className="text-xs text-gray-500" dateTime={task.createdAt}>
            {new Date(task.createdAt).toLocaleString()}
          </time>
          {task.completed && (
            <span className="ml-2 text-xs rounded-full bg-purple-100 text-purple-700 px-2 py-0.5">
              Completada
            </span>
          )}
        </div>

        {/* Texto de tarea o input de edición */}
        {!isEditing ? (
          <p
            className={`mt-1 text-sm break-words ${
              task.completed ? "line-through text-gray-500" : "text-gray-100"
            }`}
          >
            {task.text}
          </p>
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}
      </div>

      {/* Botones de acción */}
      <div className="ml-3 flex gap-2 text-xs">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg px-3 py-1.5 border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              Editar
            </button>
            <button
              onClick={() => onRequestDelete(task.id)}
              className="rounded-lg px-3 py-1.5 border border-red-800 bg-red-900/40 text-red-300 hover:bg-red-900/60 transition"
            >
              Borrar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={saveEdit}
              className="rounded-lg px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setDraft(task.text);
                setIsEditing(false);
              }}
              className="rounded-lg px-3 py-1.5 border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
