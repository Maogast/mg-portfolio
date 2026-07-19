import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function FireBuildingPage() {
  // Event details from your announcement
  const eventDetails = {
    host: "Master Guide Club – SDA Zimmerman Church",
    facilitator: "MG James",
    date: "Sunday, 19th July 2026",
    time: "11:00 AM – 4:00 PM",
    attendance: "30–40 Participants",
    venue: "SDA Zimmerman Church",
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Head>
        <title>Mg Steve – Fire Building & Camp Cookery Honor</title>
        <meta
          name="description"
          content="A complete guide to the Fire Building & Camp Cookery Honor completed by Master Guide Steve."
        />
      </Head>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          ← Back to Portfolio
        </Link>

        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fire Building & Camp Cookery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Level 2 Pathfinder Honor (Est. 1956)
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 inline-block px-6 py-4 rounded-xl text-left mx-auto mt-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Host:</strong> {eventDetails.host}
              <br />
              <strong>Facilitator:</strong> {eventDetails.facilitator}
              <br />
              <strong>Date & Time:</strong> {eventDetails.date} @ {eventDetails.time}
              <br />
              <strong>Venue:</strong> {eventDetails.venue}
              <br />
              <strong>Attendance:</strong> {eventDetails.attendance}
            </p>
          </div>
          <p className="mt-6 text-lg font-light max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            An engaging and practical hands-on session designed to equip Master Guides with the essential outdoor skills needed to build fires, cook nutritious meals, and respect God&apos;s creation through proper wilderness stewardship.
          </p>
        </section>

        {/* Multimedia Showcase */}
        <section className="mb-16 animate-fade-in animation-delay-100">
          <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2 mb-6 inline-block">
            🏕️ Practical Hands-On Session
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/tentPitching.jpg"
                  alt="Pathfinders pitching a tent during the honor class"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center bg-white dark:bg-gray-800">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  ⛺ Tent Pitching
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mastering camp setup and coordination.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="relative h-64 w-full bg-black flex items-center justify-center">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/images/tentPitching.jpg"
                >
                  <source src="/videos/Campfire.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4 text-center bg-white dark:bg-gray-800">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  🔥 Fire Lighting Demonstration
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Succeeding with the one-match challenge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What I Learned - Detailed Notes */}
        <section className="mb-16 animate-fade-in animation-delay-200">
          <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2 mb-6 inline-block">
            
          </h2>

          <div className="space-y-8">
            {/* Category 1 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                🔥 Fire Building & Sourcing
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Req 1 - Five Types of Fires & Their Uses:</strong> Learned to lay <strong>Hunter&apos;s</strong> and <strong>Council</strong> fires (ideal for cooking), <strong>Reflector</strong> fires (warmth and baking), <strong>Star</strong> fires (uses long logs pushed in as they burn), <strong>Teepee</strong> fires (easiest to light with a good draft), and <strong>Log Cabin</strong> fires (stable and fall inwards).
                </li>
                <li>
                  <strong>Req 3 - Correct Starting Techniques:</strong> Understood the importance of stacking fuel by size. Tinder must be lightweight and dry. Kindling must be stacked with ~50% air and 50% wood to allow proper airflow to transfer heat to the main fuel logs (properly wrapping them around the tinder).
                </li>
                <li>
                  <strong>Req 2 & 4 - Fuzz Sticks & One-Match Challenge:</strong> Safely used a knife to carve a dry stick into thin, feather-like shavings while keeping them attached to the stick. Used these fuzz sticks to successfully light a fire that burned steadily for over 10 minutes using just one single match.
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                ⚠️ Safety, Weather, & Woodwork
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Req 7 - Weather Challenges:</strong> We practiced the technique of splitting wet logs to find perfectly dry wood inside the center, using a tarp to protect the collected tinder/kindling, and using tea candles in the pile to guarantee a sustained ignition even when starting a fire on a rainy day or in the snow.
                </li>
                <li>
                  <strong>Req 6 - Safe Axe and Woodcutting:</strong> Learned proper grip, foot placement, and swinging techniques for splitting logs safely. Crucial tips included laying the log to be cut on top of a smaller supporting log to prevent it from sinking into the ground, and clearing a 12ft safety zone in front of the swing.
                </li>
                <li>
                  <strong>Req 5 - Fire Safety Rules:</strong> Always clear a 10ft radius around the fire. Never use liquid accelerants. Always keep a bucket of water or sand nearby. Ensure the ashes are cool enough to touch before leaving a campsite.
                </li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                🍳 Camp Cookery & Meal Prep
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Req 8 - Cooking Techniques:</strong> Mastered simmering (for carrots and beans), boiling (for pasta and oatmeal), frying (pancakes and veggie burgers), and baking bread on a stick (holding it over the coals and rotating until golden brown).
                </li>
                <li>
                  <strong>Req 8 - Foil & Reflector Oven Baking:</strong> Learned to bake foil-wrapped potatoes and stuffed apples directly in the hot embers. We also improvised a working oven using a cardboard box lined with aluminum foil to bake biscuits using the radiant heat from the fire.
                </li>
                <li>
                  <strong>Req 12 - Complete & Balanced Six-Meal Plan:</strong> 
                  <br /><em>Trail Meal (Req 12a):</em> High-calorie trail mix, a whole-grain peanut butter tortilla, and a fresh apple (No cooking required, lightweight and nutritious).
                  <br /><em>Remaining Five Meals (Req 12b):</em> 1) Oatmeal with dried fruits (Breakfast). 2) Grilled cheese sandwiches with tomato soup (Lunch). 3) <strong>One-pot Red Beans & Rice with veggies (Dinner - the mandatory one-pot meal)</strong>. 4) Foil-baked potato, carrot, and veggie burger patties (Dinner). 5) Campfire bread-on-a-stick with cinnamon sugar (Dessert/Snack).
                </li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                🏞️ Wilderness Stewardship, Hygiene & Trash Disposal
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Req 9 - Keeping Food Cool:</strong> Understood the &quot;danger zone&quot; for food spoilage (4°C to 60°C). Learned how to use mesh bags and a wet burlap sack suspended from a tree branch to keep food cool through evaporative cooling if ice is unavailable.
                </li>
                <li>
                  <strong>Req 10 - Wildlife Safety:</strong> Discovered the critical rule of never keeping food in a sleeping tent. We practiced proper &quot;bear bagging&quot; by suspending food 10 feet off the ground and 5 feet away from the tree trunk to keep raccoons, skunks, and bears away.
                </li>
                <li>
                  <strong>Req 11 & 14 - Food Handling, Trash Disposal, & Cleaning:</strong> We strictly managed cross-contamination by storing raw veg and alternatives in leak-proof containers at the bottom of the cooler. We practiced &quot;Leave No Trace&quot; by separating burnable and non-burnable trash and packing everything out in garbage bags (never leaving scraps exposed). We also utilized a system of numbered plates and hosiery bags to ensure every participant cleaned their own dishes immediately after a meal.
                </li>
              </ul>
            </div>

            {/* Category 5 - New Addition */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                🧰 Req 13 - Complete Meal Supply List
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 font-semibold">Based on our six-meal menu, we packed the following essential gear:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Cookware:</strong> Large one-pot, skillet/frying pan, stirrer/spatula, ladle, pot holders, cutting board, sharp kitchen knife.</li>
                <li><strong>Dining Gear:</strong> Numbered plates/bowls, forks, spoons, cups, and individual hosiery bags for personal cleanup.</li>
                <li><strong>Cooking Fuel & Fire Gear:</strong> Fire safety bucket, waterproof matches, tarp for sheltering wood, axe/hatchet/saw, and a sharp knife for carving fuzz sticks.</li>
                <li><strong>Ingredients:</strong> Oats, dried fruits, flour, peanut butter, tortillas, trail mix, veggie burgers, cheese, bread, potatoes, carrots, beans, rice, olive oil, salt/pepper, garlic powder, and cinnamon sugar.</li>
                <li><strong>Storage:</strong> Waterproof containers, a cooler (with blocks of ice), wet burlap sack or mesh bag for stream cooling (if needed).</li>
                <li><strong>Cleaning & Trash:</strong> Biodegradable dish soap, sponge, trash bags (for pack-it-in, pack-it-out), and large water jugs for washing greywater.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Personal Reflection */}
        <section className="mb-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800 animate-fade-in animation-delay-300">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
            🙏 My Personal Reflection
          </h2>
          <blockquote className="italic text-center text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            &ldquo;This Fire Building & Camp Cookery class was more than just learning survival skills. It taught me that a Master Guide must be prepared to serve. Whether it&apos;s providing a warm fire for a cold camping group or ensuring our camp is clean enough to protect God&apos;s wildlife, every skill we learned is a tool for leadership and stewardship. I feel much more confident leading my future outdoor pathfinder outings!&rdquo;
          </blockquote>
          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            — Mg Steve, Master Guide
          </p>
        </section>

        {/* Footer Navigation */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-20 pt-8 border-t dark:border-gray-800">
          &copy; {new Date().getFullYear()} Mg Steve – Master Guide Portfolio
        </footer>
      </main>
    </div>
  );
}