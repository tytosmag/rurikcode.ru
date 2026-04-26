import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          Код Рюрика
        </Link>

        <nav className="header-nav">
          <Link to="/">Главная</Link>
          <Link to="/leaderboard">Лидеры</Link>
          <Link to="/about">О проекте</Link>

          {user ? (
            <>
              <Link to="/profile">Профиль</Link>
              <button type="button" onClick={logout}>
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login">
              <button type="button">Авторизация</button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}