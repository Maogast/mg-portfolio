'use client';
import { useState, useEffect } from 'react';
import honorData from '@/data/sanctuaryHonor.json';

export default function AssignmentForm() {
  // Written assignments state
  const [greatControversy, setGreatControversy] = useState('');
  const [hebrews, setHebrews] = useState('');
  const [christInSanctuary, setChristInSanctuary] = useState('');
  const [shareOptions, setShareOptions] = useState<{ quote: string; source: string }[]>([]);

  // Load from localStorage or use defaults
  useEffect(() => {
    const saved = localStorage.getItem('sanctuaryWritten');
    if (saved) {
      const data = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGreatControversy(data.greatControversy || honorData.writtenAssignments.greatControversy);
      setHebrews(data.hebrews || honorData.writtenAssignments.hebrews);
      setChristInSanctuary(data.christInSanctuary || honorData.writtenAssignments.christInSanctuary);
      setShareOptions(data.shareOptions || honorData.writtenAssignments.shareOptions);
    } else {
      // initialise with defaults
      setGreatControversy(honorData.writtenAssignments.greatControversy);
      setHebrews(honorData.writtenAssignments.hebrews);
      setChristInSanctuary(honorData.writtenAssignments.christInSanctuary);
      setShareOptions(honorData.writtenAssignments.shareOptions);
    }
  }, []);

  const saveAll = () => {
    const toSave = {
      greatControversy,
      hebrews,
      christInSanctuary,
      shareOptions,
    };
    localStorage.setItem('sanctuaryWritten', JSON.stringify(toSave));
    alert('Written assignments saved!');
  };

  const resetToDefault = () => {
    setGreatControversy(honorData.writtenAssignments.greatControversy);
    setHebrews(honorData.writtenAssignments.hebrews);
    setChristInSanctuary(honorData.writtenAssignments.christInSanctuary);
    setShareOptions(honorData.writtenAssignments.shareOptions);
    localStorage.setItem('sanctuaryWritten', JSON.stringify({
      greatControversy: honorData.writtenAssignments.greatControversy,
      hebrews: honorData.writtenAssignments.hebrews,
      christInSanctuary: honorData.writtenAssignments.christInSanctuary,
      shareOptions: honorData.writtenAssignments.shareOptions,
    }));
    alert('Reset to default answers.');
  };

  const addShareOption = () => {
    setShareOptions([...shareOptions, { quote: '', source: '' }]);
  };

  const updateShareOption = (idx: number, field: 'quote' | 'source', value: string) => {
    const updated = [...shareOptions];
    updated[idx][field] = value;
    setShareOptions(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">📖 Great Controversy p.488 Summary</h3>
        <textarea rows={6} className="w-full p-2 border rounded dark:bg-gray-800" value={greatControversy} onChange={e => setGreatControversy(e.target.value)} />
      </div>
      <div>
        <h3 className="text-xl font-semibold">📖 Hebrews 4:14-16 Summary</h3>
        <textarea rows={4} className="w-full p-2 border rounded dark:bg-gray-800" value={hebrews} onChange={e => setHebrews(e.target.value)} />
      </div>
      <div>
        <h3 className="text-xl font-semibold">✝️ Christ in the Sanctuary</h3>
        <textarea rows={6} className="w-full p-2 border rounded dark:bg-gray-800" value={christInSanctuary} onChange={e => setChristInSanctuary(e.target.value)} />
      </div>
      <div>
        <h3 className="text-xl font-semibold">💬 Share Options</h3>
        {shareOptions.map((opt, idx) => (
          <div key={idx} className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <input type="text" placeholder="Quote" className="w-full p-2 border rounded mb-2 dark:bg-gray-700" value={opt.quote} onChange={e => updateShareOption(idx, 'quote', e.target.value)} />
            <input type="text" placeholder="Source" className="w-full p-2 border rounded dark:bg-gray-700" value={opt.source} onChange={e => updateShareOption(idx, 'source', e.target.value)} />
          </div>
        ))}
        <button onClick={addShareOption} className="text-blue-600 text-sm">+ Add another share option</button>
      </div>
      <div className="flex gap-4 mt-6">
        <button onClick={saveAll} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">💾 Save Written Assignments</button>
        <button onClick={resetToDefault} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">⟳ Reset to Default</button>
      </div>
    </div>
  );
}