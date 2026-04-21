import Link from 'next/link';
import Image from 'next/image';
import AssignmentForm from '@/components/AssignmentForm';

export const metadata = {
  title: 'Sanctuary Honor – Master Guide Portfolio',
  description: 'Pathfinder Sanctuary Honour – notes and assignments',
};

export default function SanctuaryHonorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Portfolio
        </Link>
        <h1 className="text-4xl font-bold mb-4">Sanctuary Honor</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Complete the requirements for the Pathfinder Sanctuary Honour. Below is my hand‑drawn scale model,
          followed by the written assignments.
        </p>

        {/* Requirement 1: Hand‑drawn scale model */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">1. Scale Model of the Sanctuary</h2>
          <p className="mb-2">
            Hand‑drawn scale model showing the courtyard, the tabernacle, all furnishings, and cardinal directions.
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
            <p className="text-sm text-gray-500 mt-2">
              (Drawn by hand, scanned and uploaded)
            </p>
          </div>
        </section>

        {/* Requirements 2–4: Written assignments (using JSON data) */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">2–4. Written Assignments</h2>
          <AssignmentForm />
        </section>

        {/* Study notes (optional) */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">📚 Study Notes</h2>
          <details className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <summary className="cursor-pointer font-medium">Click to view sanctuary facts</summary>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Three parts:</strong> Court, Holy Place, Most Holy Place.</p>
              <p><strong>Furnishings in the Court:</strong> Altar of Sacrifice, Laver.</p>
              <p><strong>Holy Place:</strong> Table of Showbread, Lampstand, Altar of Incense.</p>
              <p><strong>Most Holy Place:</strong> Ark of the Covenant, Mercy Seat, Cherubim.</p>
              <p><strong>Coverings:</strong> Inner linen (Jesus&apos; character), Goats&lsquo; hair (perfection), Rams&lsquo; skins (blood), Badgers&#39; skins (humanity).</p>
            </div>
          </details>
        </section>
      </div>
    </div>
  );
}