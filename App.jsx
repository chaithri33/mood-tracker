import MoodForm from './components/MoodForm';
import MoodChart from './components/MoodChart';

function App() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Developer Mood Check-in</h1>
      <MoodForm onMoodAdded={() => window.location.reload()} />
      <MoodChart />
    </main>
  );
}

export default App;
