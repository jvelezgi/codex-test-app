"use client";

import { useState, type KeyboardEvent } from "react";

interface TodoInputProps {
  addTodo: (text: string) => void;
}

export function TodoInput({ addTodo }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Añade una nueva tarea..."
        className="flex-1 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring focus:ring-indigo-200"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Agregar
      </button>
    </div>
  );
}
