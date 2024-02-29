import '../style/banner.css';
import LogoutButton from './Buttons/LogoutButton';
import { Link } from 'react-router-dom';
import { useLogin } from './Users/LoginContext';

const Banner = () => {

  const { isLoggedIn, updateLoginStatus } = useLogin();

  return (
    <div className="banner">
      <h1 className="title">QuotiQuiz</h1>
        <div>
        {isLoggedIn && <Link to="/profil" className='btn btn-success mb-1 me-1'>Profil</Link>}
        <Link to="/leaderboard" className='btn btn-success mb-1 me-1'>Score Global</Link>
        <Link to="/quiz-page" className='btn btn-success mb-1 me-1'>Lancer une session Quiz</Link>
        {isLoggedIn ? <LogoutButton onLogout={() => updateLoginStatus(false)}/> :  <Link to="/login" className='btn btn-success mb-1'>Créer un compte/ Se connecter</Link>}
        </div>
    </div>
  )
}

export default Banner;
