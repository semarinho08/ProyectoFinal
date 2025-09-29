import React from "react";

export default function ConfirmDeleteModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-800 p-5 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-2">¿Eliminar esta tarea?</h2>
        <p className="text-sm text-gray-400 mb-4">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-3 py-1.5 border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg px-3 py-1.5 border border-red-800 bg-red-600 text-white hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
