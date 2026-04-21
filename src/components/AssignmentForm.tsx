'use client';
import { useState, useEffect } from 'react';
import defaultData from '@/data/sanctuaryHonor.json';

export default function AssignmentForm() {
  const [gcSummary, setGcSummary] = useState('');
  const [hebrewsSummary, setHebrewsSummary] = useState('');
  const [christParagraph, setChristParagraph] = useState('');
  const [shareOptions, setShareOptions] = useState(defaultData.shareOptions);

  useEffect(() => {
    // Load saved data from localStorage, otherwise use defaults
    const saved = localStorage.getItem('sanctuaryHonor');
    if (saved) {
      const data = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGcSummary(data.gcSummary || defaultData.greatControversy);
      setHebrewsSummary(data.hebrewsSummary || defaultData.hebrews);
      setChristParagraph(data.christParagraph || defaultData.christInSanctuary);
      setShareOptions(data.shareOptions || defaultData.shareOptions);
    } else {
      // First time: use defaults
      setGcSummary(defaultData.greatControversy);
      setHebrewsSummary(defaultData.hebrews);
      setChristParagraph(defaultData.christInSanctuary);
    }
  }, []);

  const saveData = () => {
    localStorage.setItem(
      'sanctuaryHonor',
      JSON.stringify({ gcSummary, hebrewsSummary, christParagraph, shareOptions })
    );
    alert('Progress saved!');
  };

  const addShareOption = () => {
    setShareOptions([...shareOptions, { quote: '', source: '' }]);
  };

  const updateShareOption = (index: number, field: 'quote' | 'source', value: string) => {
    const updated = [...shareOptions];
    updated[index][field] = value;
    setShareOptions(updated);
  };

  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-500 pl-4">
        <h3 className="text-xl font-semibold mb-2">📖 2. Summary of Great Controversy p.488</h3>
        <textarea
          rows={6}
          className="w-full p-2 border rounded dark:bg-gray-800"
          value={gcSummary}
          onChange={(e) => setGcSummary(e.target.value)}
        />
        <h3 className="text-xl font-semibold mt-4 mb-2">📖 Hebrews 4:14-16 Summary</h3>
        <textarea
          rows={4}
          className="w-full p-2 border rounded dark:bg-gray-800"
          value={hebrewsSummary}
          onChange={(e) => setHebrewsSummary(e.target.value)}
        />
      </div>

      <div className="border-l-4 border-green-500 pl-4">
        <h3 className="text-xl font-semibold mb-2">✝️ 3. Christ in the Sanctuary</h3>
        <textarea
          rows={6}
          className="w-full p-2 border rounded dark:bg-gray-800"
          value={christParagraph}
          onChange={(e) => setChristParagraph(e.target.value)}
        />
      </div>

      <div className="border-l-4 border-purple-500 pl-4">
        <h3 className="text-xl font-semibold mb-2">💬 4. Share Section (2 quotes/verses)</h3>
        {shareOptions.map((opt, idx) => (
          <div key={idx} className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <input
              type="text"
              placeholder="Quote or verse"
              className="w-full p-2 border rounded mb-2 dark:bg-gray-700"
              value={opt.quote}
              onChange={(e) => updateShareOption(idx, 'quote', e.target.value)}
            />
            <input
              type="text"
              placeholder="Source"
              className="w-full p-2 border rounded dark:bg-gray-700"
              value={opt.source}
              onChange={(e) => updateShareOption(idx, 'source', e.target.value)}
            />
          </div>
        ))}
        <button onClick={addShareOption} className="text-blue-600 text-sm">
          + Add another share option
        </button>
      </div>

      <button
        onClick={saveData}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        💾 Save My Progress
      </button>
    </div>
  );
}