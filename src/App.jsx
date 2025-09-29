import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

import {
  STORAGE_KEY_TASKS,
  STORAGE_KEY_USERS,
  STORAGE_KEY_USER,
} from "./utils/storageKeys";



function AppContent({ currentUser, setCurrentUser, users }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TASKS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  function addTask(newTask) {
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function editTask(id, newText) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  function requestDelete(id) {
    setConfirmId(id);
  }

  function confirmDelete() {
    setTasks((prev) => prev.filter((t) => t.id !== confirmId));
    setConfirmId(null);
  }

  function cancelDelete() {
    setConfirmId(null);
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  }

  const pendingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = tasks;
    if (q)
      list = list.filter(
        (t) =>
          t.author.toLowerCase().includes(q) || t.text.toLowerCase().includes(q)
      );
    if (tab === "pending") list = list.filter((t) => !t.completed);
    if (tab === "done") list = list.filter((t) => t.completed);
    return list;
  }, [tasks, search, tab]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-501 animate-pulse">
        Cargando...
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-black text-gray-100">
      <div className="flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-3xl">
          <Header currentUser={currentUser} onGoToLogin={logout} />
          <TaskForm currentUser={currentUser} onAdd={addTask} />

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">
              {pendingCount} pendiente{pendingCount === 1 ? "" : "s"} · {tasks.length} total
            </span>
            <button
              onClick={clearCompleted}
              className="text-sm rounded-lg px-3 py-1.5 border bg-gray-800 text-gray-300 hover:bg-gray-700 transition shadow-sm border-gray-700"
            >
              Limpiar completadas
            </button>
          </div>

          <Filters search={search} setSearch={setSearch} tab={tab} setTab={setTab} />

          <section className="rounded-2xl border shadow-sm overflow-hidden bg-gray-900 border-gray-800">
            <TaskList
              tasks={filtered}
              loading={loading}
              onToggle={toggleComplete}
              onEdit={editTask}
              onRequestDelete={requestDelete}
            />
          </section>

          <footer className="text-center text-xs text-gray-500 mt-6">
            Team To‑Do • Juan Garcia - Samuel Mariño
          </footer>
        </div>
      </div>

      <ConfirmDeleteModal
        open={!!confirmId}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState(() => {
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEY_USERS);
      if (rawUsers) {
        const parsed = JSON.parse(rawUsers);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [
      { id: "u1", name: "Juan Camilo" },
      { id: "u2", name: "Samuel" },
    ];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const rawUser = localStorage.getItem(STORAGE_KEY_USER);
      if (rawUser) {
        const parsedUser = JSON.parse(rawUser);
        if (parsedUser && parsedUser.id) return parsedUser;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  return (
    <>
   <Router>
      <Routes>
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginScreen
                initialUsers={users}
                onSaveUsersAndEnter={(newUsers, chosenUser) => {
                  setUsers(newUsers);
                  setCurrentUser(chosenUser);
                  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(newUsers));
                  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(chosenUser));
                }}
              />
            )
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoute currentUser={currentUser}>
              <AppContent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                users={users}
                setUsers={setUsers}
              />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
