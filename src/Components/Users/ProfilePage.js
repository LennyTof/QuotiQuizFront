import axios from '../axiosConfig';
import { useEffect, useState, useRef } from 'react';
import moment from 'moment-timezone';
import { useLogin } from './LoginContext';
import InfoForm from '../Forms/InfoForm';
import ScoreDisplay from '../Scores/ScoreDisplay';
import '../../style/profile.css';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [activeScoreDetails, setActiveScoreDetails] = useState(null);
  const isLoggedIn = useLogin();
  const scoreDisplayRef = useRef(null);

  const formatDate = (dateString) => {
    return moment(dateString).tz('Europe/Paris').format('DD/MM/YYYY');
  };

  // récupére les scores obtenus par l'utilisateur connecté
  useEffect(() => {
    axios.get('/user/profil', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      withCredentials: true,
    })
    .then(response => {
      setUserProfile(response.data);
    })
    .catch(error => {
      console.error('Impossible de récupérer les données du profil :', error);
    });
  }, []);

  useEffect(() => {
    if (showScoreModal && scoreDisplayRef.current) {
      scoreDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showScoreModal]);

  const handleShowDetails = (score) => {
    setActiveScoreDetails(score.quizDetails)
    setShowScoreModal(true)
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className='profil-page'>
          <div className='profil-button'>
            <button className='btn btn-success mb-1 me-1' onClick={() => setShowModal(true)}>Voir/Modifier les informations</button>
          </div>
        <h1>Profil</h1>
        {showModal && <InfoForm emailState={userProfile.email} usernameState={userProfile.username} userId={userProfile._id} onClose={() => setShowModal(false)} />}
        {userProfile ? (
          <div>
            {showModal ? (
            <div></div>
          ) : (
            <>
              {userProfile.scores === 0 ? (
                <h2>Tu n'as pas encore fait de quiz</h2>
              ) : (
                <>
                  <h3>Tes 30 derniers résultats</h3>
                  <h5>N'hésite pas à cliquer dessus</h5>
                  <div className='score-and-details'>
                    <ul className='score-list'>
                      {userProfile.scores.map((score, index) => (
                        <li key={index} className='personnal-score' onClick={() => handleShowDetails(score)}>Tu as obtenu {score.value} points sur 5 le {formatDate(score.date)}</li>
                      ))}
                    </ul>
                    <div ref={scoreDisplayRef}>
                      {showScoreModal && activeScoreDetails && (
                        <ScoreDisplay quizDetails={activeScoreDetails} onClose={() => setShowScoreModal(false)} showAnswers={true} />
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          </div>
        ) : (
          <>
            <p>Chargement du profil...</p>
            <p>Tu es peut être déconnecté</p>
          </>
        )}
      </div>) : (
        <div>
          <h2>Veuillez vous connecter pour accéder à cette page</h2>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
