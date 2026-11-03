"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Added Image import

export default function CampingSkillsPage() {
  const [activeTab, setActiveTab] = useState<"level1" | "level2">("level1");
  
  // ✅ State for the certificate lightbox
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation & Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Portfolio
          </Link>
          <span className="font-extrabold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Outdoor Ministry
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-6">⛺🔥</div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Camping Skills Honors
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Mastering the wilderness, respecting creation, and building character through outdoor survival and camping etiquette.
          </p>
        </section>

        {/* ✅ NEW: Certificate of Participation Evidence Section */}
        <section className="mb-16 animate-fade-in animation-delay-100">
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden group">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-4">
                  <span>🏅</span> Official Evidence
                </div>
                <h2 className="text-3xl font-extrabold mb-3 text-slate-900 dark:text-white">
                  Masterguide Campout 2026
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  This certifies my active participation in the Masterguide Campout held at the Laikipia Youth Camp Site. A weekend dedicated to practical outdoor survival, leadership development, and fellowship in God&apos;s creation.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm font-medium">
                  <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-300">
                    📍 Laikipia Youth Camp Site
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-300">
                    📅 15–18 Oct 2026
                  </span>
                </div>
              </div>

              {/* Certificate Image Container */}
              <div 
                className="flex-1 w-full max-w-sm md:max-w-md cursor-pointer relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-emerald-500/20 dark:ring-emerald-400/20 transition-transform duration-300 hover:scale-105"
                onClick={() => setIsCertModalOpen(true)}
                title="Click to view full certificate"
              >
                <Image 
                  src="/images/camping/nanyuki-campout.png" 
                  alt="Masterguide Campout Certificate of Participation for Stephen Ogaro"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    Click to Enlarge
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-full inline-flex shadow-inner">
            <button
              onClick={() => setActiveTab("level1")}
              className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === "level1" 
                  ? "bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md transform scale-105" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              Level I (Grade 5+)
            </button>
            <button
              onClick={() => setActiveTab("level2")}
              className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === "level2" 
                  ? "bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md transform scale-105" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              Level II (Grade 6+)
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in" key={activeTab}>
          {activeTab === "level1" ? <LevelOne /> : <LevelTwo />}
        </div>
      </main>

      {/* ✅ NEW: Full-Screen Certificate Lightbox Modal */}
      {isCertModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setIsCertModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsCertModalOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white hover:text-emerald-400 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Close certificate"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Enlarged Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image 
                src="/images/camping/nanyuki-campout.png"
                alt="Masterguide Campout Certificate Full Size"
                width={1200}
                height={1600}
                className="rounded-xl object-contain max-h-[85vh] w-auto h-auto shadow-2xl ring-4 ring-emerald-500/30"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// LEVEL I COMPONENT
// ---------------------------------------------------------
function LevelOne() {
  return (
    <div className="space-y-8">
      {/* Warning Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
        <h3 className="font-bold text-amber-800 dark:text-amber-400 text-xl flex items-center gap-2 mb-2">
          ⚠️ The Golden Rule of Being Lost
        </h3>
        <p className="text-amber-700 dark:text-amber-300">
          If you realize you are lost, <strong>DON&apos;T PANIC. STAY PUT.</strong> Find a trail or a clearing, mark your location, and blow a whistle three times (the universal distress signal). Pray, and prepare for a comfortable night if the sun is setting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leave No Trace */}
        <Card title="🌿 Leave No Trace" icon="🌍">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li>1. Plan ahead and prepare.</li>
            <li>2. Travel and camp on durable surfaces.</li>
            <li>3. Dispose of waste properly (Cat holes 60m from water).</li>
            <li>4. Leave what you find.</li>
            <li>5. Minimize campfire impacts.</li>
            <li>6. Respect wildlife.</li>
            <li>7. Be considerate of other visitors.</li>
          </ul>
        </Card>

        {/* Fire Building */}
        <Card title="🔥 Fire Safety & Building" icon="🪵">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Clear the area:</strong> 3 meters around the fire pit.</li>
            <li><strong>Never use accelerants:</strong> No gasoline or lighter fluid.</li>
            <li><strong>Tinder:</strong> Pine needles, birch bark, dryer lint.</li>
            <li><strong>Kindling:</strong> Pencil-sized sticks up to 4cm thick.</li>
            <li><strong>Fuel:</strong> Logs greater than 7cm thick.</li>
            <li><strong>Extinguish:</strong> Douse with water, stir coals, ensure it&apos;s cold to the touch.</li>
          </ul>
        </Card>

        {/* Sleeping Gear */}
        <Card title="🛌 Sleeping Equipment" icon="🎒">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Mummy Bags:</strong> Best heat retention, lightweight, highly packable.</li>
            <li><strong>Rectangular Bags:</strong> Roomy, great for general camping and warmer weather.</li>
            <li><strong>Sleeping Mats:</strong> Protect from cold ground and provide comfort.</li>
            <li><strong>Inner Sheets:</strong> Keeps the bag clean and adds slight warmth.</li>
            <li><strong>Pillows:</strong> Lightweight inflatables or bundled clothes.</li>
          </ul>
        </Card>

        {/* Knife & Hatchet Safety */}
        <Card title="🪓 Knife & Hatchet Safety" icon="🔪">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li>Keep blades sharp (dull blades cause accidents).</li>
            <li>Always cut <strong>away</strong> from your body.</li>
            <li>Never hammer on the back of a knife blade.</li>
            <li>Keep blades away from heat (ruins the temper).</li>
            <li>Sheathe tools when not in use.</li>
            <li>Ensure the axe head is firmly attached to the handle.</li>
          </ul>
        </Card>

        {/* Packing List */}
        <Card title="🎒 Weekend Packing List" icon="📋">
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
            <div><strong>Wearing:</strong> Layers, rain gear, sturdy shoes, hat.</div>
            <div><strong>Eating:</strong> Billy, utensils, food, scourer.</div>
            <div><strong>Sleeping:</strong> Bag, mat, tent, ground sheet.</div>
            <div><strong>Safety:</strong> First aid, map, compass, torch, rope.</div>
            <div><strong>Hygiene:</strong> Toothbrush, soap, towel, TP.</div>
            <div><strong>God:</strong> Pocket Bible, devotional book.</div>
          </div>
        </Card>

        {/* Tent Care */}
        <Card title="⛺ Tent Pitching & Striking" icon="🏕️">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li>Lay ground cloth, test for lumps.</li>
            <li>Stake down the canopy before raising poles.</li>
            <li>Keep the fly off the inner canopy to prevent condensation.</li>
            <li><strong>Crucial:</strong> Never store a wet tent. Set it up at home to dry completely to prevent mold.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// LEVEL II COMPONENT
// ---------------------------------------------------------
function LevelTwo() {
  return (
    <div className="space-y-8">
       {/* Warning Banner */}
       <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-2xl shadow-sm">
        <h3 className="font-bold text-blue-800 dark:text-blue-400 text-xl flex items-center gap-2 mb-2">
          🧭 The 6 W&apos;s of Campsite Selection
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm"><strong className="text-blue-600 dark:text-blue-400">Wind:</strong> Seek shelter behind hills/trees.</div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm"><strong className="text-blue-600 dark:text-blue-400">Water:</strong> Access to fresh water, avoid flood zones.</div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm"><strong className="text-blue-600 dark:text-blue-400">Weather:</strong> Check the forecast. Avoid ridge tops.</div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm"><strong className="text-blue-600 dark:text-blue-400">Wild Things:</strong> Look out for animal tracks/droppings.</div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm"><strong className="text-blue-600 dark:text-blue-400">Wood:</strong> Plenty of dead wood available. No widowmakers above.</div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm"><strong className="text-blue-600 dark:text-blue-400">Willingness:</strong> Always ask permission before entering others&apos; camps.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stoves & Lanterns */}
        <Card title="🔥 Camp Stoves & Lanterns" icon="💡">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Liquid Fuel:</strong> Must be filled away from flames (50ft). Needs to vaporize before lighting.</li>
            <li><strong>Propane/Gas:</strong> Light the match/lighter first, <em>then</em> turn on the gas to avoid a fireball.</li>
            <li>Always keep a fire extinguisher nearby.</li>
            <li>If you smell gas, turn everything off and ventilate.</li>
          </ul>
        </Card>

        {/* Fire Types */}
        <Card title="🪵 Advanced Fire Types" icon="🏕️">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Fuzz Sticks:</strong> Use a knife to shave a dry stick (like a pencil) to create curls that catch fire easily.</li>
            <li><strong>Council Fire (Crisscross):</strong> Lay logs in a square/box shape, stacked several layers high. Very stable, burns hot, great for coals.</li>
            <li><strong>Hunter&apos;s Fire:</strong> Two large logs parallel with a fire between them. Great for resting a frying pan on top.</li>
          </ul>
        </Card>

        {/* Camp Cranes */}
        <Card title="🏗️ Building Camp Cranes" icon="🪝">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Simple Crane:</strong> A long stick propped over a forked branch or rock with a weight on the back.</li>
            <li><strong>Adjustable Crane:</strong> A tripod setup with a rope wrapped around the vertical stick. Twist to raise/lower the pot.</li>
            <li><strong>Double Support:</strong> A crossbar supported by two Y-shaped branches for maximum stability.</li>
          </ul>
        </Card>

        {/* Food & Cooking */}
        <Card title="🍳 Cooking & Food Storage" icon="🍲">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Keep Cool:</strong> Place food in a mesh bag in a running stream, or wrap in wet burlap and hang in the shade.</li>
            <li><strong>Boiling:</strong> Pasta, oatmeal, eggs.</li>
            <li><strong>Frying:</strong> Pancakes, eggs, veggie burgers.</li>
            <li><strong>Baking:</strong> Bread on a stick, foil-wrapped potatoes/corn directly in the coals.</li>
          </ul>
        </Card>

        {/* Breaking Wood */}
        <Card title="🪓 Cutting & Breaking Wood" icon="🪵">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Sawing:</strong> Prop the log up so the cut is past the support to prevent the saw from pinching.</li>
            <li><strong>Breaking Dead Wood:</strong> Prop one end on a rock. Bring your foot down sharply 30-45cm from the support. (Only for wood up to 7cm thick).</li>
            <li><strong>Safety:</strong> Always wear closed-toe shoes and keep bystanders away.</li>
          </ul>
        </Card>

        {/* Sleeping Gear Care */}
        <Card title="🛌 Bedding Maintenance" icon="🧼">
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Packing:</strong> Stuffing the bag into a sack is better than folding, as it prevents creasing the insulation.</li>
            <li><strong>Keeping Dry:</strong> Keep it inside the tent, off the floor, and take off muddy boots.</li>
            <li><strong>Cleaning:</strong> Turn inside out, hang on a line, and beat with a stick. <em>Never</em> machine wash unless the label permits.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// REUSABLE CARD COMPONENT
// ---------------------------------------------------------
function Card({ title, icon, children }: { title: string, icon: string, children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
        <span className="text-3xl">{icon}</span>
        {title}
      </h3>
      <div className="text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
}