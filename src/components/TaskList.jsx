import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, loading, onToggle, onEdit, onRequestDelete }) {
  if (loading) {
    return <div className="p-6 text-center text-gray-500 animate-pulse">Cargando tareas…</div>;
  }

  if (tasks.length === 0) {
    return <div className="p-8 text-center text-gray-400">No hay tareas que coincidan</div>;
  }

  return (
    <ul className="divide-y divide-gray-800">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
