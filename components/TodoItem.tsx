"use client";

import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
  </svg>
);

export function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg">
      <label className="flex flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5 cursor-pointer accent-indigo-500"
          aria-label={`Marcar tarea ${todo.text}`}
        />
        <span
          className={`text-base font-medium text-slate-800 transition ${
            todo.isCompleted ? "line-through text-slate-400" : ""
          }`}
        >
          {todo.text}
        </span>
      </label>
      <button
        type="button"
        onClick={() => deleteTodo(todo.id)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-600 transition hover:bg-red-500 hover:text-white"
        aria-label={`Eliminar tarea ${todo.text}`}
      >
        <TrashIcon />
      </button>
    </li>
  );
}
