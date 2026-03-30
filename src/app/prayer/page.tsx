"use client";

import { useState, useEffect } from "react";
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

// ShareButtons component
const ShareButtons = ({
  title,
  copied,
  onCopy,
  pageUrl,
}: {
  title: string;
  copied: boolean;
  onCopy: () => void;
  pageUrl: string;
}) => {
  const shareText = `📖 Prayer – ${title}\n\nCheck out this encouraging meditation on prayer from the writings of Ellen G. White. ${pageUrl}`;

  return (
    <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 self-center">
        Share this chapter:
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
      <button
        onClick={onCopy}
        className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      >
        🔗 {copied ? "Copied!" : "Copy Link"}
      </button>
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
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle both single object and array
  const chapterData = Array.isArray(data) ? data[0] : data;
  const chapter = chapterData as PrayerChapter | null;

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

        {chapter && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-blue-500 overflow-hidden">
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
            </div>
          </div>
        )}

        {/* Share buttons */}
        <ShareButtons
          title={chapter?.title || "Prayer"}
          copied={copied}
          onCopy={handleCopyLink}
          pageUrl={pageUrl}
        />

        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-20 pt-8 border-t dark:border-gray-800">
          © {new Date().getFullYear()} Stephen Magare Ogaro – Master Guide
          Portfolio
        </footer>
      </main>
    </div>
  );
}