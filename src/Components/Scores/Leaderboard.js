import axios from "axios";
import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchDailyScores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/daily-leaderboard');
        setScores(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des scores journaliers:', error);
      }
    };

    fetchDailyScores();
  }, []);

  return (
    <div>
      <h2>Leaderboard du jour</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score.user.username} a obtenu : {score.value}/5 à son quiz aujourd'hui !</li>
       ))}
      </ul>
    </div>
  );
};

export default Leaderboard
