import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    await logout();
    showToast('Вы вышли из аккаунта', 'success');
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          Код Рюрика
        </Link>

        <nav className="header-nav">
          <Link to="/">Главная</Link>
          <Link to="/game">Игра</Link>
          <Link to="/leaderboard">Лидеры</Link>
          <Link to="/about">О проекте</Link>

          {user ? (
            <>
              <Link to="/profile">Профиль</Link>
              <button type="button" className="header-button" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login">
              <button type="button" className="header-button">
                Авторизация
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}