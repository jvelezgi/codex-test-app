"use client";

import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import { TodoInput } from "../components/TodoInput";
import { TodoItem } from "../components/TodoItem";
import type { Todo } from "../types/todo";

const createTodo = (text: string): Todo => ({
  id: typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  text,
  isCompleted: false,
});

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Registro del Service Worker para habilitar capacidades PWA.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) => {
          console.error("Error al registrar el Service Worker", error);
        });
    }
  }, []);

  const remainingTodos = useMemo(
    () => todos.filter((todo) => !todo.isCompleted).length,
    [todos],
  );

  const addTodo = (text: string) => {
    setTodos((previous) => [...previous, createTodo(text)]);
  };

  const toggleTodo = (id: string) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Head>
        <title>To-Do List PWA</title>
        <meta name="description" content="Una lista de tareas moderna desarrollada con Next.js" />
        <meta name="theme-color" content="#4338ca" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <main className="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-4 py-16 text-slate-50">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-xl bg-white/10 p-8 shadow-2xl backdrop-blur">
          <header className="flex flex-col gap-2 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-200">Organiza tu día</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Tu lista de tareas inteligente</h1>
            <p className="text-sm text-indigo-100">
              {remainingTodos > 0
                ? `Te quedan ${remainingTodos} tarea${remainingTodos === 1 ? "" : "s"} por completar.`
                : "¡Has completado todas tus tareas!"}
            </p>
          </header>

          <TodoInput addTodo={addTodo} />

          <ul className="flex flex-col gap-3">
            {todos.length === 0 ? (
              <li className="rounded-xl border border-dashed border-indigo-300/50 bg-indigo-50/10 p-6 text-center text-sm text-indigo-100">
                Añade tus primeras tareas para comenzar a avanzar.
              </li>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))
            )}
          </ul>
        </div>
      </main>
    </>
  );
}
