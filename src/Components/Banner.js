import LogoutButton from './Buttons/LogoutButton';
import { Link } from 'react-router-dom';
import { useLogin } from './Users/LoginContext';
import isAdmin from './Users/IsAdmin';
import '../style/banner.css';

const Banner = () => {

  // vérifie si l'utilisateur est connecté pour afficher les bons boutons
  const { isLoggedIn, updateLoginStatus } = useLogin();

  return (
    <div className="banner mb-3">
      <div className='space-between p-1'>
          {isLoggedIn && <Link to="/profil" className='btn btn-success m-1'>Profil</Link>}
          {isLoggedIn ? <LogoutButton className="btn btn-success m-1" onLogout={() => updateLoginStatus(false)}/> :  <Link to="/login" className='btn btn-success mb-1'>Créer un compte/ Se connecter</Link>}
      </div>
      <Link to="/" style={{ textDecoration:'none', color:'white'}}><h1 className="title">QuotiQuiz</h1></Link>
      <Link to="/" style={{ textDecoration:'none', color:'white'}}><h3 className="title">Le site de quiz quotidien</h3></Link>
      <div className='m-l 3 link'>
        {isLoggedIn && <h3>Bonjour {localStorage.username} !</h3>}
        <div className='space-between'>
          {isAdmin() && <Link to="/component" className='btn btn-success mb-1 me-1'>Accéder aux questions</Link>}
          {isAdmin() && <Link to="/asked-question" className='btn btn-success mb-1 me-1'>Accéder aux questions proposées</Link>}
          <Link to="/quiz-form" className='btn btn-success m-1'>Propose une question</Link>
          <Link to="/quiz-page" className='btn btn-success m-1'>Lancer une session Quiz</Link>
          <Link to="/leaderboard" className='btn btn-success m-1'>Score Global</Link>
        </div>
      </div>
    </div>
  )
}

export default Banner;
