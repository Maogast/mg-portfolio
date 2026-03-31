"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import data from "@/data/prayer.json";

type PrayerChapter = {
  chapter: number;
  title: string;
  quote: string;
  summary: string;
  prayerFocus: string;
};

// Component for copying a chapter-specific link (per chapter)
const CopyChapterLink = ({
  chapter,
  copied,
  onCopy,
}: {
  chapter: number;
  copied: boolean;
  onCopy: (chapter: number) => void;
}) => {
  const getChapterUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("chapter", chapter.toString());
    return url.toString();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getChapterUrl());
    onCopy(chapter);
    setTimeout(() => onCopy(-1), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
    >
      🔗 {copied ? "Copied!" : "Share Chapter"}
    </button>
  );
};

// Global share buttons (WhatsApp & Twitter) – shares the current page URL
const GlobalShareButtons = () => {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageUrl(window.location.href);
  }, []);

  const shareText = `📖 Prayer – Meditations from Ellen G. White\n\nCheck out this encouraging collection on prayer. ${pageUrl}`;

  return (
    <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 justify-center">
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 self-center">
        Share this page:
      </span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm hover:bg-green-200 dark:hover:bg-green-800/40 transition"
      >
        📱 WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800/40 transition"
      >
        🐦 Twitter / X
      </a>
    </div>
  );
};

export default function PrayerPage() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [copiedChapter, setCopiedChapter] = useState<number>(-1);
  const chapterRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Memoize chapters to avoid recreation on every render
  const chapters: PrayerChapter[] = useMemo(
    () => (Array.isArray(data) ? data : [data]),
    []
  );

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

  // Scroll to chapter based on URL query parameter
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const chapterParam = params.get("chapter");
    if (chapterParam) {
      const chapterNum = parseInt(chapterParam, 10);
      const targetRef = chapterRefs.current[chapterNum];
      if (targetRef) {
        targetRef.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add a temporary highlight effect
        targetRef.style.transition = "background-color 0.3s";
        targetRef.style.backgroundColor = "#fef9c3";
        setTimeout(() => {
          targetRef.style.backgroundColor = "";
        }, 1500);
      }
    }
  }, [chapters]);

  // Simple markdown-like renderer for the summary
  const renderSummary = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl font-semibold mt-4 mb-2">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={idx} className="mb-2 font-bold">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.startsWith("*") && line.endsWith("*")) {
        return (
          <p key={idx} className="mb-2 italic">
            {line.slice(1, -1)}
          </p>
        );
      } else if (line.trim() === "") {
        return <br key={idx} />;
      } else {
        return (
          <p key={idx} className="mb-2">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Head>
        <title>Prayer – Encouragement for the Weary Soul | Stephen Ogaro</title>
        <meta
          name="description"
          content="Meditations on prayer from Ellen G. White to refresh and restore your spirit."
        />
      </Head>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle dark mode"
      >
        {mounted ? (darkMode ? "☀️" : "🌙") : "🌓"}
      </button>

      {/* Back to Home link */}
      <div className="container mx-auto px-4 pt-6 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          ← Back to Home
        </Link>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Prayer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meditations from the writings of Ellen G. White on prayer – to refresh your
            spirit and draw you closer to the One who hears every cry.
          </p>
        </div>

        {/* Render all chapters with refs and per‑chapter share button */}
        {chapters.map((chapter, idx) => (
          <div
            key={chapter.chapter || idx}
            ref={(el) => {
              chapterRefs.current[chapter.chapter] = el;
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-blue-500 overflow-hidden mb-8 scroll-mt-20"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                Chapter {chapter.chapter}: {chapter.title}
              </h2>
              <div className="italic border-l-4 border-blue-500 pl-4 my-3 text-gray-600 dark:text-gray-400">
                “{chapter.quote}”
              </div>
              <div className="text-gray-700 dark:text-gray-300 space-y-1">
                {renderSummary(chapter.summary)}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  🙏 Prayer Focus
                </h3>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  {chapter.prayerFocus}
                </p>
              </div>
              {/* Chapter-specific share button */}
              <div className="mt-4">
                <CopyChapterLink
                  chapter={chapter.chapter}
                  copied={copiedChapter === chapter.chapter}
                  onCopy={(ch) => setCopiedChapter(ch)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Global social share buttons */}
        <GlobalShareButtons />

        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-12 pt-8 border-t dark:border-gray-800">
          © {new Date().getFullYear()} Stephen Magare Ogaro – Master Guide Portfolio
        </footer>
      </main>
    </div>
  );
}