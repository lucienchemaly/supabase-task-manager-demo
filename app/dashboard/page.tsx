"use client";

import { useEffect, useState } from "react";
import { supabase, type Task } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    checkUser();
    fetchTasks();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/signin");
    } else {
      setUserEmail(session.user.email || "");
    }
  }

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("tasks").insert([
      {
        user_id: user.id,
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false,
      },
    ]);

    if (error) {
      console.error("Error adding task:", error);
      alert("Error adding task: " + error.message);
    } else {
      setNewTaskTitle("");
      setNewTaskDescription("");
      fetchTasks();
    }
  }

  async function toggleTask(task: Task) {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task:", error);
    } else {
      fetchTasks();
    }
  }

  async function deleteTask(taskId: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      fetchTasks();
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Task Manager
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {userEmail}
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Task Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <form onSubmit={addTask} className="space-y-4">
            <div>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task title"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>
            <div>
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Task description (optional)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

          {tasks.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No tasks yet. Add your first task above!
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-start gap-4"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`mt-1 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    Created {new Date(task.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
