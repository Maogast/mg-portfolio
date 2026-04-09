"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/trainers.json";

export default function TrainersPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial = stored !== null ? JSON.parse(stored) : prefersDark;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Head>
        <title>Master Guide Trainers & Leaders | Stephen Ogaro</title>
        <meta
          name="description"
          content="Meet the dedicated trainers and leaders who have guided my Master Guide journey."
        />
      </Head>

      {/* Dark Mode Toggle – hydration safe */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle dark mode"
      >
        {mounted ? (darkMode ? "☀️" : "🌙") : "🌓"}
      </button>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Back to Home link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {data.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These are the dedicated men and women who have poured into my Master
            Guide journey — teaching, mentoring, and leading by example.
          </p>
        </div>

        {/* Trainers Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold border-b-2 border-blue-200 dark:border-blue-700 pb-2 mb-8 inline-block">
            🙌 Trainers & Instructors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.trainers.map((trainer, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                    {trainer.role}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {trainer.subjects.map((subject, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {trainer.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Directors & Coordinators Section */}
        {data.directors && data.directors.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold border-b-2 border-blue-200 dark:border-blue-700 pb-2 mb-8 inline-block">
              👥 Directors & Coordinators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.directors.map((director, idx) => (
                <div
                  key={idx}
                  className="flex gap-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{director.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-2">
                      {director.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {director.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-20 pt-8 border-t dark:border-gray-800">
          © {new Date().getFullYear()} Stephen Magare Ogaro – Master Guide
          Portfolio
        </footer>
      </main>
    </div>
  );
}
