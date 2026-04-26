import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <section className="hero">
      <h1 className="hero-title">Код Рюрика</h1>
      <p className="hero-subtitle">
        Новая SPA-версия игры в микросервисной архитектуре
      </p>

      <div className="menu-grid">
        <button type="button">Новая игра</button>

        <Link to="/leaderboard" className="full-width-link">
          <button type="button">Таблица лидеров</button>
        </Link>

        <Link to="/about" className="full-width-link">
          <button type="button">О проекте</button>
        </Link>

        {user ? (
          <button type="button" onClick={logout}>
            Выйти
          </button>
        ) : (
          <Link to="/login" className="full-width-link">
            <button type="button">Авторизация</button>
          </Link>
        )}
      </div>
    </section>
  );
}