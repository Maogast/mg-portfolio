"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import data from '@/data/portfolio.json';

// ----- Types -----
type ShareOption = { label: string; url: string };
type EventItem = { name: string; date: string; description: string };
type BaseItem = { title: string };
type ItemWithShare = BaseItem & { shareOptions: ShareOption[] };
type ItemWithEvents = BaseItem & { events: EventItem[] };
type ItemWithImages = BaseItem & { description?: string; images: string[] };
type ItemWithLink = BaseItem & { description?: string; link: string };
type ItemSimple = string;
type PortfolioItem = ItemSimple | ItemWithShare | ItemWithEvents | ItemWithImages | ItemWithLink;

// Type for devotion items
type DevotionItem = {
  date: string;
  bibleReading: string;
  materialRead?: string;
  reflection: string;
  application: string;
  prayerFocus: string;
  song: string;
};

type Section = {
  title: string;
  type: 'list' | 'cards' | 'devotion-list';
  items: PortfolioItem[] | DevotionItem[];
};

// Type guards
function isListSection(section: unknown): section is Section & { type: 'list' } {
  return (
    typeof section === 'object' &&
    section !== null &&
    'type' in section &&
    (section as { type: string }).type === 'list'
  );
}

function isCardsSection(section: unknown): section is Section & { type: 'cards' } {
  return (
    typeof section === 'object' &&
    section !== null &&
    'type' in section &&
    (section as { type: string }).type === 'cards'
  );
}

function isDevotionListSection(section: Section): section is Section & { type: 'devotion-list'; items: DevotionItem[] } {
  return section.type === 'devotion-list';
}

function isStringItem(item: PortfolioItem): item is string {
  return typeof item === 'string';
}

function hasShareOptions(item: PortfolioItem): item is ItemWithShare {
  return typeof item === 'object' && 'shareOptions' in item;
}

function hasEvents(item: PortfolioItem): item is ItemWithEvents {
  return typeof item === 'object' && 'events' in item;
}

function hasImages(item: PortfolioItem): item is ItemWithImages {
  return typeof item === 'object' && 'images' in item;
}

function hasLink(item: PortfolioItem): item is ItemWithLink {
  return typeof item === 'object' && 'link' in item;
}

function hasDescription(item: PortfolioItem): item is Exclude<PortfolioItem, string> & { description?: string } {
  return typeof item === 'object' && 'description' in item;
}

function getTitle(item: PortfolioItem): string {
  return isStringItem(item) ? item : item.title;
}

export default function Home() {
  const [selectedDevotion, setSelectedDevotion] = useState<DevotionItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

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

  // Find the devotion section (there should be only one)
  const devotionSection = (data.sections as Section[]).find(s => s.type === 'devotion-list') as Section & { type: 'devotion-list'; items: DevotionItem[] } | undefined;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>{data.name} – Master Guide Portfolio</title>
        <meta name="description" content="Master Guide portfolio" />
      </Head>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {data.name}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{data.tagline}</p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{data.about}</p>
          <blockquote className="italic mt-6 border-l-4 border-blue-500 pl-4 text-gray-600 max-w-xl mx-auto">
            {data.mission}
          </blockquote>
        </section>

        {/* Dedication */}
        {data.dedication && (
          <section className="mb-16 text-center animate-fade-in animation-delay-200">
            <h2 className="text-2xl font-semibold mb-2">Dedication</h2>
            <p className="text-gray-600">{data.dedication}</p>
          </section>
        )}

        {/* Sections */}
        {(data.sections as Section[]).map((section, idx) => (
          <section key={idx} className="mb-16 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <h2 className="text-3xl font-bold border-b-2 border-blue-200 pb-2 mb-6 inline-block">
              {section.title}
            </h2>

            {isListSection(section) && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside">
                {(section.items as string[]).map((item, i) => (
                  <li key={i} className="text-gray-700">{item}</li>
                ))}
              </ul>
            )}

            {isCardsSection(section) && (
              <div className="space-y-6">
                {(section.items as PortfolioItem[]).map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                    <h3 className="text-xl font-semibold mb-2">{getTitle(item)}</h3>

                    {hasDescription(item) && item.description && (
                      <p className="text-gray-600 mb-3">{item.description}</p>
                    )}

                    {hasLink(item) && (
                      <a href={item.link} className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-medium transition">
                        Learn more →
                      </a>
                    )}

                    {hasShareOptions(item) && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.shareOptions.map((opt, j) => (
                          <a
                            key={j}
                            href={opt.url}
                            className="inline-block bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition"
                          >
                            {opt.label}
                          </a>
                        ))}
                      </div>
                    )}

                    {hasEvents(item) && (
                      <div className="mt-4 space-y-3">
                        {item.events.map((event, k) => (
                          <div key={k} className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium">{event.name}</p>
                            <p className="text-sm text-gray-500">{event.date}</p>
                            <p className="text-gray-600">{event.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {hasImages(item) && (
                      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                        {item.images.map((src, k) => (
                          <div key={k} className="relative h-32 w-32 shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={src}
                              alt={`${getTitle(item)} image ${k + 1}`}
                              fill
                              sizes="128px"
                              className="object-cover hover:scale-105 transition duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isDevotionListSection(section) && (
              <div className="text-center mt-8">
                <button
                  onClick={openListModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition transform hover:scale-105"
                >
                  View All 30‑Day Devotions →
                </button>
              </div>
            )}
          </section>
        ))}

        {/* Modal for single devotion detail */}
        {isDetailModalOpen && selectedDevotion && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeDetailModal}
          >
            <div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">
                  {new Date(selectedDevotion.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>
                <button
                  onClick={closeDetailModal}
                  className="text-gray-500 hover:text-gray-800 text-2xl transition"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">📖 Bible Reading</h3>
                  <p className="text-gray-700">{selectedDevotion.bibleReading}</p>
                </div>
                {selectedDevotion.materialRead && (
                  <div>
                    <h3 className="font-semibold text-lg">📚 Material Read</h3>
                    <p className="text-gray-700">{selectedDevotion.materialRead}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">💭 Reflection</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedDevotion.reflection}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">✅ Application</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedDevotion.application}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">🙏 Prayer Focus</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedDevotion.prayerFocus}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">🎵 Song</h3>
                  <p className="text-gray-700">{selectedDevotion.song}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for the list of all devotions */}
        {isListModalOpen && devotionSection && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeListModal}
          >
            <div
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">30‑Day Devotion Challenge</h2>
                <button
                  onClick={closeListModal}
                  className="text-gray-500 hover:text-gray-800 text-2xl transition"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4">
                {devotionSection.items.map((item, i) => {
                  const devotion = item as DevotionItem;
                  return (
                    <div
                      key={i}
                      className="border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                      onClick={() => {
                        closeListModal();
                        openDetailModal(devotion);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {new Date(devotion.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            📖 {devotion.bibleReading}
                          </p>
                          <p className="text-gray-700 mt-2 line-clamp-2">
                            {devotion.reflection}
                          </p>
                        </div>
                        <span className="text-blue-500 text-sm">Read more →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <footer className="text-center text-gray-500 text-sm mt-20 pt-8 border-t">
          © {new Date().getFullYear()} {data.name} – Master Guide Portfolio
        </footer>
      </main>
    </div>
  );
}