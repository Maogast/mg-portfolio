"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AssignmentForm from "@/components/AssignmentForm";
import honorData from "@/data/sanctuaryHonor.json"; // unified JSON file

export default function SanctuaryHonorPage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return false;
    }
    return false;
  });
  const [mounted, setMounted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

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

  // Load quiz answers from localStorage or use defaults from JSON
  useEffect(() => {
    const saved = localStorage.getItem("sanctuaryQuizAnswers");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuizAnswers(JSON.parse(saved));
    } else {
      const defaults: Record<string, string> = {};
      honorData.quizQuestions.forEach((q) => {
        defaults[q.id] = q.answer;
      });
      setQuizAnswers(defaults);
    }
  }, []);

  const updateQuizAnswer = (id: string, value: string) => {
    const updated = { ...quizAnswers, [id]: value };
    setQuizAnswers(updated);
    localStorage.setItem("sanctuaryQuizAnswers", JSON.stringify(updated));
  };

  const resetQuizAnswers = () => {
    const defaults: Record<string, string> = {};
    honorData.quizQuestions.forEach((q) => {
      defaults[q.id] = q.answer;
    });
    setQuizAnswers(defaults);
    localStorage.setItem("sanctuaryQuizAnswers", JSON.stringify(defaults));
    alert("Quiz answers reset to default.");
  };

  const saveQuizAnswers = () => {
    localStorage.setItem("sanctuaryQuizAnswers", JSON.stringify(quizAnswers));
    alert("Quiz answers saved!");
  };

  const sharePage = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200/30 dark:bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl"></div>
        <svg className="absolute bottom-0 left-0 w-full h-48 text-amber-200/20 dark:text-amber-900/10" viewBox="0 0 1440 320" fill="currentColor">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle dark mode"
      >
        {mounted ? (darkMode ? "☀️" : "🌙") : "🌓"}
      </button>

      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Back link with icon */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Hero / Title section with card effect */}
        <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/30 mb-12">
          <div className="p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent mb-4">
              Sanctuary Honor
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A complete digital portfolio of the Pathfinder Sanctuary Honour – including hand‑drawn scale model, written assignments, and all quiz questions.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={sharePage}
                className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-full text-sm hover:bg-amber-200 dark:hover:bg-amber-800/60 transition"
              >
                📋 {copied ? "Link copied!" : "Share this page"}
              </button>
            </div>
          </div>
        </div>

        {/* Requirement 1: Hand‑drawn scale model */}
        <section className="mb-12 bg-white/50 dark:bg-gray-800/30 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold border-b-2 border-amber-300 dark:border-amber-700 pb-2 mb-4 inline-block">
            1. Scale Model of the Sanctuary
          </h2>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            Hand‑drawn scale model showing the courtyard, the tabernacle, all furnishings, and cardinal directions (N, S, E, W).
          </p>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
            <Image
              src="/images/sanctuary-hand-drawn.png"
              alt="Hand-drawn sanctuary scale model"
              width={800}
              height={600}
              className="mx-auto border rounded shadow-sm"
              priority
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              (Drawn by hand, scanned and uploaded)
            </p>
          </div>
        </section>

        {/* Requirements 2–4: Written assignments (using AssignmentForm) */}
        <section className="mb-12 bg-white/50 dark:bg-gray-800/30 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold border-b-2 border-amber-300 dark:border-amber-700 pb-2 mb-4 inline-block">
            2–4. Written Assignments
          </h2>
          <AssignmentForm />
        </section>

        {/* Quiz Questions (1a–11) from unified JSON */}
        <section className="mb-12 bg-white/50 dark:bg-gray-800/30 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold border-b-2 border-amber-300 dark:border-amber-700 pb-2 mb-4 inline-block">
            📋 All Sanctuary Honour Questions (1a–11)
          </h2>
          <div className="space-y-6 mt-4">
            {honorData.quizQuestions.map((q) => (
              <div key={q.id} className="border-l-4 border-amber-500 pl-4">
                <h3 className="text-lg font-semibold mb-1">
                  {q.id}. {q.question}
                </h3>
                <textarea
                  rows={3}
                  className="w-full p-2 border rounded dark:bg-gray-800"
                  value={quizAnswers[q.id] || ""}
                  onChange={(e) => updateQuizAnswer(q.id, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={saveQuizAnswers}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              💾 Save Quiz Answers
            </button>
            <button
              onClick={resetQuizAnswers}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              ⟳ Reset to Default
            </button>
          </div>
        </section>

        {/* Study notes (optional) */}
        <section className="mb-12 bg-white/50 dark:bg-gray-800/30 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold border-b-2 border-amber-300 dark:border-amber-700 pb-2 mb-4 inline-block">
            📚 Quick Study Notes
          </h2>
          <details className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <summary className="cursor-pointer font-medium">Click to view sanctuary facts</summary>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Three parts:</strong> Court, Holy Place, Most Holy Place.</p>
              <p><strong>Furnishings in the Court:</strong> Altar of Sacrifice, Laver.</p>
              <p><strong>Holy Place:</strong> Table of Showbread, Lampstand, Altar of Incense.</p>
              <p><strong>Most Holy Place:</strong> Ark of the Covenant, Mercy Seat, Cherubim.</p>
              <p><strong>Coverings:</strong> Inner linen (Jesus&lsquo; character), Goats&rsquo; hair (perfection), Rams&lsquo; skins (blood), Badgers&#39; skins (humanity).</p>
            </div>
          </details>
        </section>

        {/* Return button */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Portfolio
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm py-8 border-t border-gray-200 dark:border-gray-800 mt-16">
        © {new Date().getFullYear()} Stephen Magare – Master Guide Portfolio
      </footer>
    </div>
  );
}