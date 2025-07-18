import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function MoodForm({ onMoodAdded }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [suggestion, setSuggestion] = useState(''); // ✅ NEW

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('moods')
      .insert([{ category, description, date: today }]);

    if (error) {
      alert(error.message);
    } else {
      // ✅ Generate the tip
      const moodTip = getSuggestion(category);
      setSuggestion(moodTip);

      // ✅ Show in popup too
      alert(`Mood added! ${moodTip}`);

      // ✅ Reset fields
      setCategory('');
      setDescription('');

      // ✅ Notify parent
      onMoodAdded();
    }
  };

  // ✅ Mood suggestion logic
  const getSuggestion = (category) => {
    switch (category.toLowerCase()) {
      case 'happy':
        return "😊 Keep spreading your positive vibes!";
      case 'sad':
        return "💙 It’s okay to feel sad. Be gentle with yourself today.";
      case 'stressed':
        return "💆‍♀️ Try a short break or deep breaths. You’ve got this!";
      case 'anxious':
        return "🧘‍♂️ Breathe slowly — remember you’re not alone.";
      case 'excited':
        return "🎉 Enjoy the moment! Celebrate your wins.";
      case 'bored':
        return "✨ Maybe try a small new task to spark interest!";
      default:
        return "🌱 Thanks for checking in. Take care!";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Mood Category:</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <label>Description:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Add Mood</button>
      </form>

      {/* ✅ Show suggestion below form if present */}
      {suggestion && (
        <div
          style={{
            marginTop: '20px',
            background: '#f0f9ff',
            border: '1px solid #90cdf4',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          <strong>Tip:</strong> {suggestion}
        </div>
      )}
    </div>
  );
}
