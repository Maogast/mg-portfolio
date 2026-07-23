import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function TemperanceHonorPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Head>
        <title>Mg Steve – Temperance AY Honor</title>
        <meta
          name="description"
          content="Master Guide Stephen Magare Ogaro - Complete AY Honor Temperance requirements."
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
            Temperance Honor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            AY Honor – Spiritual Growth, Outreach & Heritage (Est. 1976)
          </p>
          <div className="bg-teal-50 dark:bg-teal-900/20 inline-block px-6 py-4 rounded-xl text-left mx-auto mt-2">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
              <strong>Temperance Pledge:</strong>
              <br />
              &ldquo;Realizing the importance of healthy body and mind, I (Mg Steve) promise, with the help of God, to live a Christian life of true temperance in all good things and total abstinence from the use of tobacco, alcohol, or any other narcotic.&rdquo;
            </p>
          </div>
          <p className="mt-6 text-lg font-light max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            This honor focuses on the sacredness of the human body as the temple of the Holy Spirit, providing biblical and scientific evidence for a clean, chemical-free lifestyle.
          </p>
        </section>

        {/* Requirements Section */}
        <section className="mb-16 animate-fade-in animation-delay-100">
          <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-6 inline-block">
            📝 Honor Requirements & My Portfolio Evidence
          </h2>

          <div className="space-y-8">
            {/* Req 1 & 2 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                Requirements 1 & 2: Pledge & Memorization
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Pledge:</strong> I have signed and committed to the official Temperance Pledge (displayed in the hero section above).
                </li>
                <li>
                  <strong>Scripture Memorized:</strong> I have committed two texts to memory:
                  <ul className="list-disc pl-6 mt-2 list-inside space-y-1">
                    <li><span className="italic">&ldquo;Do you not know that your body is a temple of the Holy Spirit... honor God with your body.&rdquo;</span> – 1 Corinthians 6:19, 20</li>
                    <li><span className="italic">&ldquo;But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.&rdquo;</span> – Galatians 5:22, 23</li>
                  </ul>
                </li>
                <li>
                  <strong>Ellen G. White Quotations Memorized:</strong>
                  <ul className="list-disc pl-6 mt-2 list-inside space-y-1">
                    <li><span className="italic">&ldquo;True temperance teaches us to abstain entirely from that which is injurious, and to use judiciously only healthful and nutritious articles of food.&rdquo;</span> – Temperance, p. 3</li>
                    <li><span className="italic">&ldquo;The only safe course is to touch not, taste not, handle not, tea, coffee, wines, tobacco, opium, and alcoholic drinks.&rdquo;</span> – Counsels on Diet and Foods, p. 428</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Req 3 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                Requirement 3: Completed 4 of 7 Activities
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">To fulfill this honor, the following 4 tasks were selected and executed:</p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>3a - Speech:</strong> Delivered a 5-minute oration during Sabbath School on how temperance leads to a clearer mind for spiritual growth.
                </li>
                <li>
                  <strong>3b - Essay:</strong> Wrote a 200-word essay detailing the harmful effects of vaping on a teen&apos;s physical health and my commitment to a pure, athletic lifestyle.
                </li>
                <li>
                  <strong>3d - Poster:</strong> Designed a 22x28 inch poster titled &ldquo;Your Body = God&apos;s Temple&rdquo; featuring the 7 harmful ingredients of tobacco smoke, displayed in our local Pathfinder room.
                </li>
                <li>
                  <strong>3g - Pledge Collection:</strong> Personally shared my testimonies and experiences from this honor with 5 friends outside my immediate relatives. All 5 signed the official Temperance Pledge.
                </li>
              </ul>
            </div>

            {/* Req 4 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                Requirement 4: Knowledge & Explanations
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>4a - Cigarette Warning:</strong> The label &quot;Smoking is a health hazard&quot; exists because smoking causes lung cancer, heart disease, and emphysema. The Surgeon General&apos;s warning is a legal mandate to inform the public of these proven, fatal consequences.
                </li>
                <li>
                  <strong>4b - 7 Ingredients of Smoke:</strong> <span className="font-semibold">1.</span> Nicotine (addictive stimulant), <span className="font-semibold">2.</span> Arsenic (poisonous metalloid), <span className="font-semibold">3.</span> Formaldehyde (carcinogen used for embalming), <span className="font-semibold">4.</span> Carbon Monoxide (suffocates cells by replacing oxygen), <span className="font-semibold">5.</span> Cyanide (irreversible enzyme inhibitor), <span className="font-semibold">6.</span> Phenolbenzophyrine (carcinogenic from incomplete combustion), <span className="font-semibold">7.</span> Ammonia (enhances nicotine absorption).
                </li>
                <li>
                  <strong>4c - Diseases:</strong> <span className="font-semibold">Emphysema</span> is the destruction of the lung&apos;s air sacs (alveoli) causing chronic breathlessness. <span className="font-semibold">Cirrhosis</span> is the scarring of liver tissue caused primarily by alcoholism, leading to liver failure. <span className="font-semibold">Addiction</span> is a recurring psychological and physical compulsion to engage in a specific harmful activity despite severe consequences.
                </li>
                <li>
                  <strong>4d - Effects on Pregnancy:</strong> Tobacco, alcohol, and drugs pass directly through the placenta to the baby. These toxins cause low birth weight, premature birth, developmental disabilities (Fetal Alcohol Syndrome), sudden infant death syndrome (SIDS), and severe behavioral issues later in childhood.
                </li>
              </ul>
            </div>

            {/* Req 5 & 6 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                Requirements 5 & 6: Spirit of Prophecy & Positive Habits
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>5 - Ministry of Healing Summary:</strong> In chapter 26, Ellen White illustrates that caffeine, alcohol, and tobacco do not actually give strength—they stimulate and then depress the system. The chapter emphasizes that true health comes from God&apos;s natural remedies. We must take personal responsibility for our bodies, not for vanity, but to be able to serve God with maximum energy and clear judgment.
                </li>
                <li>
                  <strong>6 - Three Things Contributing to Good Health:</strong> Using the study materials provided (Temperance, p.139 & CD, p.406):
                  <ul className="list-disc pl-6 mt-2 list-inside space-y-1">
                    <li><span className="font-semibold">Temperance in Labor:</span> Do not overwork. Keep a sensible balance between work and rest so the body is not exhausted (Temperance, p. 139).</li>
                    <li><span className="font-semibold">Temperance in Diet:</span> Eat only healthful, nutritious foods. Avoid overeating and avoid anything harmful to the system (Counsels on Diet and Foods, p. 406).</li>
                    <li><span className="font-semibold">Temperance in Study:</span> Do not exhaust mental powers trying to acquire too much knowledge at once. Keep the mind fresh for God&apos;s work (Temperance, p. 140).</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Req 7 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                Requirement 7: Roleplay & Scenario Preparation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <span className="font-bold block mb-2">Scenario A:</span>
                  <span className="text-sm">Best friend offers a cigarette. I decline politely, stating that my body is God&apos;s temple. If they insist, I will quickly change the topic to a fun activity we can do instead.</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <span className="font-bold block mb-2">Scenario B:</span>
                  <span className="text-sm">Classmate offers money to sell marijuana. I firmly say &quot;No&quot; and explain that I prefer to earn money honestly. If it continues, I will walk away and report it to an adult.</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <span className="font-bold block mb-2">Scenario C:</span>
                  <span className="text-sm">Older relative offers beer. I respond respectfully, &quot;I appreciate the offer, but I don&apos;t drink alcohol because I made a temperance pledge with God.&quot;</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <span className="font-bold block mb-2">Scenario D (Stranger smoke):</span>
                  <span className="text-sm">I will politely move to a different seat or ask the stranger if they could please blow the smoke the other way. If it&apos;s unbearable, I will leave the area.</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg md:col-span-2">
                  <span className="font-bold block mb-2">Scenario F (Drunk friend driving):</span>
                  <span className="text-sm">I will firmly take the keys, call a trusted family member or an Uber, and insist we wait together until a safe ride arrives. I will never enter the car.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Reflection */}
        <section className="mb-16 bg-teal-50 dark:bg-teal-900/20 p-8 rounded-xl border border-teal-200 dark:border-teal-800 animate-fade-in animation-delay-300">
          <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4 text-center">
            🙏 My Personal Reflection
          </h2>
          <blockquote className="italic text-center text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            &ldquo;Doing the Temperance Honor opened my eyes to the staggering reality of how the enemy uses addictive substances to ruin our health and steal our spiritual drive. But learning the science behind it, combined with God&apos;s promises from His Word and Spirit of Prophecy, has equipped me to be a beacon of hope for my peers. I want to lead by example, proving that true joy doesn&apos;t come from artificial substances, but from a pure mind guided by the Holy Spirit.&rdquo;
          </blockquote>
          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            — Mg Steve, Master Guide
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-20 pt-8 border-t dark:border-gray-800">
          &copy; {new Date().getFullYear()} Mg Steve – Master Guide Portfolio
        </footer>
      </main>
    </div>
  );
}