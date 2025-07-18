import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MoodChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Mood Counts',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const getColorForMood = (mood) => {
    switch (mood) {
      case 'happy':
        return 'rgba(255, 206, 86, 0.7)';
      case 'sad':
        return 'rgba(54, 162, 235, 0.7)';
      case 'stressed':
        return 'rgba(255, 99, 132, 0.7)';
      case 'anxious':
        return 'rgba(153, 102, 255, 0.7)';
      case 'excited':
        return 'rgba(75, 192, 192, 0.7)';
      case 'bored':
        return 'rgba(75, 192, 75, 0.7)';
      case 'angry':
        return 'rgba(255, 0, 0, 0.7)';
      default:
        return 'rgba(100, 100, 100, 0.7)';
    }
  };

  useEffect(() => {
    async function fetchMoodCounts() {
      const { data, error } = await supabase.from('moods').select('category');

      if (error) {
        console.error('Error fetching moods:', error);
        return;
      }

      // Normalize category strings: lowercase + trim spaces
      const counts = data.reduce((acc, mood) => {
        const cat = mood.category.toLowerCase().trim();
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(counts);
      const values = Object.values(counts);
      const colors = labels.map(getColorForMood);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Mood Counts',
            data: values,
            backgroundColor: colors,
          },
        ],
      });
    }

    fetchMoodCounts();
  }, []);

  return (
    <div>
      <h3>Mood Counts by Category</h3>
      <Bar data={chartData} />
    </div>
  );
}