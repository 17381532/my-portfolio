import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './LanguageStats.css';

function LanguageStats({ projects }) {
  // Calculate language usage from projects
  const calculateLanguageStats = () => {
    const languageCount = {};

    projects.forEach((project) => {
      if (project.languages && Array.isArray(project.languages)) {
        project.languages.forEach((lang) => {
          languageCount[lang] = (languageCount[lang] || 0) + 1;
        });
      }
    });

    // Convert to array format for Recharts
    return Object.entries(languageCount).map(([name, count]) => ({
      name,
      count,
    }));
  };

  const data = calculateLanguageStats();

  if (data.length === 0) {
    return (
      <div className="language-stats">
        <h2>Languages Used</h2>
        <p>No language data available. Add languages to your projects.</p>
      </div>
    );
  }

  return (
    <div className="language-stats">
      <h2>Languages Used in Portfolio</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#3498db" name="Number of Projects" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LanguageStats;
