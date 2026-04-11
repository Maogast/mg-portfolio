"use client";
import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function DianiExperience() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 relative overflow-x-hidden">
      {/* Background decorative waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full h-64 text-blue-200/30 dark:text-blue-900/20" viewBox="0 0 1440 320" fill="currentColor">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <Head>
        <title>Diani Easter Experience – Stephen Magare</title>
        <meta name="description" content="Reflections on humility, love, and grace from Diani Beach, Easter 2026" />
      </Head>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle dark mode"
      >
        {mounted ? (darkMode ? "☀️" : "🌙") : "🌓"}
      </button>

      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Hero section with card effect */}
        <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/30 mb-12 animate-slide-up">
          <div className="relative h-96 w-full">
            <Image
              src="/images/diani-sunset.jpeg"
              alt="Diani Beach sunset"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-mono bg-black/40 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Easter 2026</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-center bg-linear-to-r from-amber-600 via-orange-500 to-rose-500 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent mb-4">
              What the Ocean Taught Me
            </h1>
            <div className="text-center text-gray-500 dark:text-gray-400 mb-8 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-block w-8 h-px bg-amber-400"></span>
              <span className="flex items-center gap-1">📅 3rd – 6th April 2026</span>
              <span className="inline-block w-8 h-px bg-amber-400"></span>
              <span className="w-full mt-1 flex items-center justify-center gap-2">
                <span className="inline-block w-6 h-px bg-amber-400/50"></span>
                🌊 Diani Beach, Kenya
                <span className="inline-block w-6 h-px bg-amber-400/50"></span>
              </span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-gray-700 dark:text-gray-200 font-medium text-xl italic border-l-4 border-amber-500 pl-4">
                I came thinking I knew life. I left knowing I knew nothing at all.
              </p>

              <p>This Easter, far from the noise I had built around myself, the ocean whispered a truth my pride had drowned out for years.</p>

              <p>I used to look at people and silently judge their choices, their struggles, their falls. I placed myself on a pedestal of “elevated” understanding – convinced that my path was superior, my convictions unshakable.</p>

              <p>But Diani broke me – gently.</p>

              <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl my-8 border-l-8 border-amber-500">
                <p className="text-gray-800 dark:text-gray-200 italic text-lg">
                  I met souls whose outward conditions I had once dismissed. Yet beneath their surface, I found battles I could never imagine, faiths stronger than mine, and a resilience that humbled me to my core.
                </p>
              </div>

              <blockquote className="text-center text-2xl font-serif my-8">
                “We never know another’s full story. We never know the weight they carry, the tears they hide, the prayers they whisper at 2am.”
              </blockquote>

              <p>So now, instead of judging – I weep with the erring one.<br />
              Instead of condemning – I reach out to raise a falling brother or sister.<br />
              Instead of rushing to conclusions – I choose longsuffering, patience, and the kind of love that doesn&apos;t keep score.</p>

              <p>Because the cross taught me one thing: God did not wait for us to be perfect before He loved us. He loved us while we were still broken, still wandering, still wrong.</p>

              <p>That is the love I want to give – imperfectly but sincerely.</p>

              <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl my-8 text-center">
                <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                  This Easter, I left a piece of my pride in the sands of Diani. And I picked up humility, compassion, and a quiet resolve: <em>to love as I have been loved.</em>
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl mt-10 text-center border border-amber-200 dark:border-amber-800">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  “Be kind to everyone you meet, for they are fighting a battle you know nothing about.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return button */}
        <div className="text-center mt-12 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Portfolio
          </Link>
        </div>
      </main>

      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm py-8 border-t border-gray-200 dark:border-gray-800 mt-16">
        © {new Date().getFullYear()} Stephen Magare – Master Guide Portfolio
      </footer>
    </div>
  );
}