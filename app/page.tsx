"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
            Task Manager
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            Built with Supabase & Next.js
          </p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            A production-ready task management application demonstrating
            authentication, database operations, and deployment with Supabase
            and Vercel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="font-semibold mb-2">Secure Auth</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email authentication powered by Supabase
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Real-time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant updates with PostgreSQL
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deployed with Vercel CI/CD
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-8">
          <button
            onClick={() => router.push("/auth/signin")}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth/signup")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Sign Up
          </button>
        </div>

        <div className="pt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Learn more about{" "}
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Supabase
            </a>{" "}
            and{" "}
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
