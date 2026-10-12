"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/portfolio.json";
import React from "react";

// ----- Types -----
type ShareOption = { label: string; url: string };
type EventItem = { name: string; date: string; description: string };
type BaseItem = { title: string };
type ItemWithShare = BaseItem & { shareOptions: ShareOption[] };
type ItemWithEvents = BaseItem & { events: EventItem[] };
type ItemWithImages = BaseItem & { description?: string; images: string[] };
type ItemWithLink = BaseItem & { description?: string; link: string };
type ItemSimple = string;
type PortfolioItem =
  | ItemSimple
  | ItemWithShare
  | ItemWithEvents
  | ItemWithImages
  | ItemWithLink;

type DevotionItem = {
  date: string;
  bibleReading: string;
  materialRead?: string;
  reflection: string;
  application: string;
  prayerFocus: string;
  song: string;
};

type AccordionItem = {
  title: string;
  content: string;
};

type Section = {
  title: string;
  type: "list" | "cards" | "devotion-list" | "accordion";
  items: PortfolioItem[] | DevotionItem[] | AccordionItem[];
};

// Type guards
function isListSection(section: unknown): section is Section & { type: "list" } {
  return typeof section === "object" && section !== null && "type" in section && (section as { type: string }).type === "list";
}
function isCardsSection(section: unknown): section is Section & { type: "cards" } {
  return typeof section === "object" && section !== null && "type" in section && (section as { type: string }).type === "cards";
}
function isDevotionListSection(section: Section): section is Section & { type: "devotion-list"; items: DevotionItem[] } {
  return section.type === "devotion-list";
}
function isAccordionSection(section: Section): section is Section & { type: "accordion"; items: AccordionItem[] } {
  return section.type === "accordion";
}
function isStringItem(item: PortfolioItem): item is string {
  return typeof item === "string";
}
function hasShareOptions(item: PortfolioItem): item is ItemWithShare {
  return typeof item === "object" && "shareOptions" in item;
}
function hasEvents(item: PortfolioItem): item is ItemWithEvents {
  return typeof item === "object" && "events" in item;
}
function hasImages(item: PortfolioItem): item is ItemWithImages {
  return typeof item === "object" && "images" in item;
}
function hasLink(item: PortfolioItem): item is ItemWithLink {
  return typeof item === "object" && "link" in item;
}
function hasDescription(item: PortfolioItem): item is Exclude<PortfolioItem, string> & { description?: string } {
  return typeof item === "object" && "description" in item;
}
function getTitle(item: PortfolioItem): string {
  return isStringItem(item) ? item : item.title;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

function parseMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <p key={i} className="mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
  });
}

// ----- Honor Modules Data -----
const honorModules = [
  {
    href: "/sanctuary-honor",
    title: "🏛️ Sanctuary Honor",
    desc: "Complete Pathfinder sanctuary requirements.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/fire-building-camp-cookery",
    title: "🔥 Fire Building & Camp Cookery",
    desc: "Complete the Fire Building & Camp Cookery honor requirements.",
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/spiritual-growth-28-beliefs",
    title: "📖 Spiritual Growth: 28 Beliefs",
    desc: "Teaching 5 fundamental beliefs to children using 'God loves me 28 ways'.",
    color: "from-purple-500 to-pink-500",
  },
  {
    href: "/temperance-honor",
    title: "💧 AY Temperance Honor",
    desc: "Pledge, studies, and project evidence for the Temperance Honor.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/diani-experience",
    title: "🏖️ Diani Easter Reflection",
    desc: "Read my personal reflection from the Diani Easter experience.",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function Home() {
  const [selectedDevotion, setSelectedDevotion] = useState<DevotionItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openDetailModal = (devotion: DevotionItem) => {
    setSelectedDevotion(devotion);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDevotion(null);
  };
  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);

  const openImageModal = (src: string) => {
    setSelectedImage(src);
    setIsImageModalOpen(true);
  };
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const devotionSection = (data.sections as Section[]).find(
    (s) => s.type === "devotion-list"
  ) as (Section & { type: "devotion-list"; items: DevotionItem[] }) | undefined;

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "explore", label: "Explore Honors" },
    ...(data.dedication ? [{ id: "dedication", label: "Dedication" }] : []),
    ...(data.sections as Section[]).map((section) => ({
      id: section.type === "devotion-list" ? "devotion-challenge" : slugify(section.title),
      label: section.title,
    })),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-blue-500/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-60 bg-transparent">
        <div 
          className="h-full bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Head>
        <title>{data.name} – Master Guide Portfolio</title>
        <meta name="description" content="Master Guide portfolio" />
      </Head>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm transition-all border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="text-2xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition z-50 relative"
          >
            {data.name.split(" ")[0]}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-sm font-semibold transition-colors relative group ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 ${activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </a>
            ))}
          </nav>

          {/* Mobile/Tablet Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-4 shadow-2xl absolute w-full left-0 max-h-[80vh] overflow-y-auto z-40">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block py-4 text-base font-semibold transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Dark Mode Toggle - Improved with SVG Icons */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-24 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          // Sun Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        ) : (
          // Moon Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        )}
      </button>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      <main className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Hero Section */}
        <section id="hero" className="text-center py-20 md:py-28 animate-fade-in scroll-mt-24 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl w-96 h-96 mx-auto -top-20 animate-pulse" />
          
          <div className="flex justify-center mb-10 relative z-10 w-full px-2">
            {/* Professional Banner Display */}
            <div className="relative w-full max-w-4xl rounded-4xl group">
              {/* Soft Glow behind the image */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-4xl blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse" />
              
              <div className="relative w-full rounded-4xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white dark:bg-slate-800">
                <Image
                  src="/images/profile.jpg"
                  alt={data.name}
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight relative z-10 drop-shadow-sm">
            {data.name}
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 mb-8 font-light tracking-wide relative z-10">
            {data.tagline}
          </p>
          
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto text-lg md:text-xl relative z-10 px-4">
            {data.about.split(/(\(https?:\/\/[^\s]+\))/g).map((part, i) => {
              const match = part.match(/^\((https?:\/\/[^\s]+)\)$/);
              if (match) {
                return (
                  <a key={i} href={match[1]} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors">
                    {match[1]}
                  </a>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </p>

          <blockquote className="italic mt-10 border-l-4 border-blue-500 pl-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg bg-slate-100/50 dark:bg-slate-800/50 py-6 rounded-r-2xl relative z-10 backdrop-blur-sm">
            &quot;{data.mission}&quot;
          </blockquote>

          <div className="mt-12 flex flex-wrap justify-center gap-4 relative z-10 px-4">
            <a
              href="#explore"
              onClick={(e) => handleNavClick(e, "explore")}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Start Exploring ↓
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 text-lg"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* Explore Honors Section */}
        <section id="explore" className="py-20 scroll-mt-24 animate-fade-in animation-delay-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold border-b-4 border-blue-500/30 dark:border-blue-500/50 pb-4 mb-6 inline-block">
              Explore My Journey
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
              &quot;Dive into the specific honors, experiences, and milestones that have shaped my Master Guide path.&quot;
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {honorModules.map((module, i) => (
              <Link 
                key={i} 
                href={module.href}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col h-full"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 grow text-lg">
                    {module.desc}
                  </p>
                  <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-2 transition-transform duration-300 mt-auto text-lg">
                    View Honor 
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Dedication */}
        {data.dedication && (
          <section id="dedication" className="py-20 text-center animate-fade-in animation-delay-300 scroll-mt-24 bg-white dark:bg-slate-800/50 rounded-3xl my-12 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Dedication</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl italic leading-relaxed px-6">
              &quot;{data.dedication}&quot;
            </p>
          </section>
        )}

        {/* Teaching Ministry / Rangers Class Section */}
        <section id="teaching-ministry" className="py-20 animate-fade-in scroll-mt-24 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold border-b-4 border-blue-500/30 dark:border-blue-500/50 pb-4 mb-6 inline-block">
              Teaching Ministry: Rangers Class
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Every 2nd and last Sunday of the month, I have the privilege of teaching the Rangers class at Zimmerman SDA church. 
              It is a blessing to guide these young Pathfinders through their honors and spiritual journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "/images/teaching/teach.jpg",
              "/images/teaching/teach1.jpg",
              "/images/teaching/teach2.jpg"
            ].map((src, index) => (
              <div 
                key={index} 
                className="relative h-72 rounded-3xl overflow-hidden cursor-pointer group/img shadow-md border border-slate-100 dark:border-slate-800"
                onClick={() => openImageModal(src)}
              >
                <Image 
                  src={src} 
                  alt={`Teaching Rangers class ${index + 1}`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
                  className="object-cover transition duration-500 group-hover/img:scale-110" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 font-bold text-lg bg-blue-600/80 px-6 py-2 rounded-full backdrop-blur-sm">
                    View Image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sections */}
        <div className="max-w-5xl mx-auto">
          {(data.sections as Section[]).map((section, idx) => {
            const sectionId = section.type === "devotion-list" ? "devotion-challenge" : slugify(section.title);
            return (
              <React.Fragment key={idx}>
                <section id={sectionId} className="py-20 animate-fade-in scroll-mt-24 border-b border-slate-100 dark:border-slate-800 last:border-0" style={{ animationDelay: `${idx * 100}ms` }}>
                  <h2 className="text-3xl md:text-4xl font-extrabold border-b-4 border-blue-500/30 dark:border-blue-500/50 pb-4 mb-10 inline-block">
                    {section.title}
                  </h2>

                  {/* 1. Lists */}
                  {isListSection(section) && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside bg-slate-50 dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                      {(section.items as string[]).map((item, i) => (
                        <li key={i} className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 2. Cards */}
                  {isCardsSection(section) && (
                    <div className="space-y-10">
                      {(section.items as PortfolioItem[]).map((item, i) => (
                        <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800/50 group">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {getTitle(item)}
                          </h3>

                          {hasDescription(item) && item.description && (
                            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          {hasLink(item) && (
                            <a href={item.link} className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-lg">
                              Learn more 
                              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </a>
                          )}

                          {hasShareOptions(item) && (
                            <div className="mt-6 flex flex-wrap gap-3">
                              {item.shareOptions.map((opt, j) => (
                                <a key={j} href={opt.url} className="inline-block bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-5 py-2.5 rounded-full text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  {opt.label}
                                </a>
                              ))}
                            </div>
                          )}

                          {hasEvents(item) && (
                            <div className="mt-8 space-y-4">
                              {item.events.map((event, k) => (
                                <div key={k} className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl border-l-4 border-blue-500">
                                  <p className="font-bold text-xl">{event.name}</p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{event.date}</p>
                                  <p className="text-slate-600 dark:text-slate-300 text-lg">{event.description}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {hasImages(item) && (
                            <div className="mt-8 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                              {item.images.map((src, k) => (
                                <div key={k} className="relative h-48 w-48 shrink-0 rounded-2xl overflow-hidden cursor-pointer group/img shadow-md" onClick={() => openImageModal(src)}>
                                  <Image src={src} alt={`${getTitle(item)} image ${k + 1}`} fill sizes="192px" className="object-cover transition duration-500 group-hover/img:scale-110" />
                                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 font-semibold">View</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. Devotion List */}
                  {isDevotionListSection(section) && (
                    <div className="text-center mt-10 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-12 rounded-3xl border border-blue-100 dark:border-blue-800/50 shadow-sm">
                      <p className="text-xl mb-8 text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        I documented my spiritual journey with a 30-day devotion challenge. Click below to read my daily reflections.
                      </p>
                      <button onClick={openListModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl text-lg">
                        View All 30‑Day Devotions →
                      </button>
                    </div>
                  )}

                  {/* 4. Accordion */}
                  {isAccordionSection(section) && (
                    <div className="space-y-5">
                      {section.items.map((item, i) => {
                        const isOpen = activeAccordion === i;
                        return (
                          <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                              onClick={() => setActiveAccordion(isOpen ? null : i)}
                              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <span className="font-bold text-xl text-slate-900 dark:text-white">
                                {item.title}
                              </span>
                              <svg className={`w-6 h-6 text-blue-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isOpen && (
                              <div className="px-8 pb-8 pt-4 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/50 text-lg leading-relaxed">
                                {parseMarkdown(item.content)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Fitness Evidence for Lifestyle Development */}
                {section.title === "Lifestyle Development (Stature)" && (
                  <div className="mt-10 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm bg-white dark:bg-slate-800/50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                          📱 Physical Fitness Evidence
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                          Tracking my daily steps, active time, and calories burnt using Samsung Health. 
                          Consistency is key to maintaining a healthy lifestyle for God&apos;s service.
                        </p>
                      </div>
                      <div className="flex gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Best Steps</p>
                          <p className="text-xl font-extrabold text-green-500">14,674</p>
                        </div>
                        <div className="text-center border-l border-slate-200 dark:border-slate-700 pl-4">
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Best Active</p>
                          <p className="text-xl font-extrabold text-blue-500">148 min</p>
                        </div>
                        <div className="text-center border-l border-slate-200 dark:border-slate-700 pl-4">
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Max Dist.</p>
                          <p className="text-xl font-extrabold text-purple-500">11.45 km</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                      {[
                        "/images/fitness/record.jpg",
                        "/images/fitness/record2.jpg",
                        "/images/fitness/record3.jpg",
                        "/images/fitness/record4.jpg",
                        "/images/fitness/record5.jpg",
                        "/images/fitness/record6.jpg",
                        "/images/fitness/record7.jpg"
                      ].map((src, index) => (
                        <div
                          key={index}
                          className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group/img shadow-md border border-slate-100 dark:border-slate-700"
                          onClick={() => openImageModal(src)}
                        >
                          <Image
                            src={src}
                            alt={`Samsung Health Fitness Record ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition duration-500 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 font-semibold text-sm bg-blue-600/80 px-4 py-2 rounded-full backdrop-blur-sm">
                              View
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* Preserved: Diani Easter Reflection link */}
                {section.title === "Community Outreach & Service" && (
                  <div className="text-center py-12">
                    <Link
                      href="/diani-experience"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition transform hover:scale-105 shadow-xl text-lg"
                    >
                      Read my Diani Easter Reflection →
                    </Link>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Modals */}
        {isDetailModalOpen && selectedDevotion && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-100 p-4" onClick={closeDetailModal}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 shadow-2xl custom-scrollbar border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-white">
                  {new Date(selectedDevotion.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </h2>
                <button onClick={closeDetailModal} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-4xl transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 leading-none">
                  &times;
                </button>
              </div>
              <div className="space-y-8 text-slate-700 dark:text-slate-300">
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">📖 Bible Reading</h3>
                  <p className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl text-lg">{selectedDevotion.bibleReading}</p>
                </div>
                {selectedDevotion.materialRead && (
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">📚 Material Read</h3>
                    <p className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl text-lg">{selectedDevotion.materialRead}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">💭 Reflection</h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-lg">{selectedDevotion.reflection}</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">✅ Application</h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-lg">{selectedDevotion.application}</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">🙏 Prayer Focus</h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-lg">{selectedDevotion.prayerFocus}</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">🎵 Song</h3>
                  <p className="italic text-lg">{selectedDevotion.song}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isListModalOpen && devotionSection && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-100 p-4" onClick={closeListModal}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 shadow-2xl custom-scrollbar border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
                <h2 className="text-3xl font-extrabold dark:text-white">30‑Day Devotion Challenge</h2>
                <button onClick={closeListModal} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-4xl transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 leading-none">
                  &times;
                </button>
              </div>
              <div className="space-y-5">
                {devotionSection.items.map((item, i) => {
                  const devotion = item as DevotionItem;
                  return (
                    <div key={i} className="border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700" onClick={() => { closeListModal(); openDetailModal(devotion); }}>
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-blue-600 dark:text-white">
                            {new Date(devotion.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">📖 {devotion.bibleReading}</p>
                          <p className="text-slate-700 dark:text-slate-300 mt-4 line-clamp-2 text-lg leading-relaxed">{devotion.reflection}</p>
                        </div>
                        <span className="text-blue-500 font-bold whitespace-nowrap md:ml-6 mt-2 md:mt-0 flex items-center">
                          Read more 
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {isImageModalOpen && selectedImage && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-100 p-4" onClick={closeImageModal}>
            <div className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeImageModal} className="absolute top-4 right-4 text-white text-5xl hover:text-slate-300 transition z-10 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 leading-none">
                &times;
              </button>
              <Image src={selectedImage} alt="Full size" fill sizes="100vw" className="object-contain" priority={false} />
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-20 animate-fade-in scroll-mt-24 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-linear-to-br from-blue-600 to-purple-700 p-10 md:p-16 rounded-[2.5rem] text-center mb-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 relative z-10">Let&apos;s Connect! 👋</h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto relative z-10">Whether it&apos;s a project, collaboration, or just a hello, I&apos;d love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a href="https://wa.me/254705001193?text=Hello%20Stephen%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center gap-6 p-10 bg-green-50 dark:bg-green-900/10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-green-100 dark:border-green-800/50 hover:-translate-y-2">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">📱</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">WhatsApp</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-lg">Send me a message – I&apos;ll reply as soon as possible.</p>
                <span className="text-xl text-green-600 dark:text-green-400 font-bold">+254 705 001 193</span>
              </div>
            </a>

            <a href="mailto:stevemagare4@gmail.com?subject=Inquiry%20from%20your%20portfolio&body=Hello%20Stephen%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20..." className="flex flex-col items-center text-center gap-6 p-10 bg-blue-50 dark:bg-blue-900/10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-blue-100 dark:border-blue-800/50 hover:-translate-y-2">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">📧</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Email</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-lg">Write to me for any inquiries or collaborations.</p>
                <span className="text-xl text-blue-600 dark:text-blue-400 font-bold">stevemagare4@gmail.com</span>
              </div>
            </a>
          </div>

          <div className="flex justify-center gap-10 mt-16">
            <a href="https://maogastsoftworks.com" target="_blank" rel="noopener noreferrer" className="text-4xl hover:scale-125 transition-transform duration-300 hover:-translate-y-3" title="Portfolio">🌐</a>
          </div>
        </section>

        <footer className="text-center text-slate-400 dark:text-slate-500 text-sm py-12 border-t border-slate-100 dark:border-slate-800">
          <p className="text-lg">© {new Date().getFullYear()} {data.name} – Master Guide Portfolio</p>
        </footer>
      </main>
    </div>
  );
}