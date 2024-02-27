import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  const userUsername = localStorage.getItem('username');

  useEffect(() => {
    const fetchDailyScores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/daily-leaderboard');
        setScores(response.data);
        console.log(userUsername)
      } catch (error) {
        console.error('Erreur lors de la récupération des scores journaliers:', error);
      }
    };

    fetchDailyScores();
  }, []);

  return (
    <div>
      <h2>Les scores de la journée</h2>
      <ul className="scoreList">
        {scores.map((score, index) => (
          <li key={index} className={score.user.username === userUsername ? "currentUser" : ""}>{score.user.username} a obtenu : {score.value}/5 à son quiz aujourd'hui !</li>
       ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
