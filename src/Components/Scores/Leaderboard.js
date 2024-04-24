import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import '../../style/leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  const userUsername = localStorage.getItem('username');

  const todayDate = () => {
    return new Date()
  }

  // affiche les dates au format français
  const formatDate = (dateString) => {
    return moment(dateString).tz('Europe/Paris').format('DD/MM');
  };

  useEffect(() => {

    // récupére les scores globals du jour
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
    <div className="leaderboard">
      <h2>Les scores du jour {formatDate(todayDate())}</h2>
      {scores.length === 0 ?
        <h3>Il n'y a pas eu de participant pour l'instant</h3> :
        <ul className="scoreList">
          {scores.map((score, index) => (
            <li key={index} className={score.user.username === userUsername ? "score yellow" : "score"}>
               {score.user.username === userUsername ?
                `Tu as obtenu ${score.value}/5 à ton quiz aujourd'hui !` :
                `${score.user.username} a obtenu : ${score.value}/5 à son quiz aujourd'hui !`}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Leaderboard;
