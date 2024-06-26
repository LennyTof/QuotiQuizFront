import { useState, useEffect } from 'react';
import LogoutButton from './Buttons/LogoutButton';
import { Link } from 'react-router-dom';
import { useLogin } from './Users/LoginContext';
import useIsAdmin from './Users/IsAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import '../style/banner.css';

const Banner = () => {

  // vérifie si l'utilisateur est connecté pour afficher les bons boutons
  const { isLoggedIn, updateLoginStatus } = useLogin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAdmin = useIsAdmin();


  useEffect(() => {

    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      updateLoginStatus(!!token);
    }

    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [updateLoginStatus]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="banner mb-3">
        <div className="banner-title-container">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>QuotiQuiz</h1>
          </Link>
        </div>
      <div className='greeting-center'>
        {isLoggedIn && <h3>Bonjour {localStorage.username} !</h3>}
      </div>
      <div className='space-between'>
        <button className='btn btn-success' onClick={toggleSidebar}>{isSidebarOpen ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faList} />}</button>
        <div>
          {isLoggedIn && <Link to="/profil" className='btn btn-success m-1'>Profil</Link>}
          {isLoggedIn ? <LogoutButton className="btn btn-success m-1" onLogout={() => updateLoginStatus(false)}/> :  <Link to="/login" className='btn btn-success mb-1'>Créer un compte/ Se connecter</Link>}
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {isAdmin && <Link to="/component" className='btn btn-success mb-1 me-1'>Accéder aux questions</Link>}
        {isAdmin && <Link to="/asked-question" className='btn btn-success mb-1 me-1'>Accéder aux questions proposées</Link>}
        <Link to="/quiz-page" className='btn btn-success m-1' onClick={toggleSidebar}>Lancer une session Quiz</Link>
        <Link to="/quiz-form" className='btn btn-success m-1' onClick={toggleSidebar}>Propose une question</Link>
        <Link to="/leaderboard" className='btn btn-success m-1' onClick={toggleSidebar}>Score Global du jour</Link>
      </div>
    </div>
  )
}

export default Banner;
