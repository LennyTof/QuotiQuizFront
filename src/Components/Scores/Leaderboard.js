import axios from "axios";
import { useEffect, useState, useRef } from "react";
import moment from "moment-timezone";
import ScoreDisplay from "./ScoreDisplay";
import '../../style/leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [activeScoreDetails, setActiveScoreDetails] = useState(null);
  const scoreDisplayRef = useRef(null)

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

  useEffect(() => {
    if (showScoreModal && scoreDisplayRef.current) {
      scoreDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showScoreModal]);

  const handleShowDetails = (score) => {
    setActiveScoreDetails(score.quizDetails);
    setShowScoreModal(true);
  };

  return (
    <div className="leaderboard">
      <h2>Les scores du jour {formatDate(todayDate())}</h2>
      {scores.length === 0 ?
        <h3>Il n'y a pas eu de participant pour l'instant</h3>
        : <div className="score-and-details">
            <ul className="score-list">
                {scores.map((score, index) => (
                  <li key={index} className={score.user.username === userUsername ? "score yellow" : "score"} onClick={() => handleShowDetails(score)}>
                    {score.user.username === userUsername ?
                      `Tu as obtenu ${score.value}/5 à ton quiz aujourd'hui !` :
                      `${score.user.username} a obtenu : ${score.value}/5 à son quiz aujourd'hui !`}
                  </li>
                ))}
              </ul>
              <div ref={scoreDisplayRef}>
                {showScoreModal && activeScoreDetails && (
                  <ScoreDisplay quizDetails={activeScoreDetails} onClose={() => setShowScoreModal(false)} showAnswers={false} />
                )}
              </div>
        </div>
      }
    </div>
  );
};

export default Leaderboard;
