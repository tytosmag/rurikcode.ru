import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import homeIcon from '../assets/home/menu-home0.png';
import logoMenu from '../assets/home/logo_menu.png';
import menuIcon from '../assets/home/menu_pr0.png';
import profileIcon from '../assets/home/menu-back0.png';
import rurikCharacter from '../assets/home/rurik_menu.png';
import soundOffIcon from '../assets/home/sound-off.png';
import soundOnIcon from '../assets/home/sound-on0.png';

function MenuButton({ children, className = '', to, onClick }) {
  const button = (
    <button type="button" className={`rurik-btn ${className}`.trim()} onClick={onClick}>
      {children}
    </button>
  );

  if (!to) {
    return button;
  }

  return (
    <Link to={to} className="rurik-menu-link">
      {button}
    </Link>
  );
}

export default function Home() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleLogout = async () => {
    await logout();
    showToast('Вы вышли из аккаунта', 'success');
  };

  return (
    <section className="home-page" aria-label="Главное меню игры Код Рюрика">
      <div className="home-top-ui">
        <div className="home-ui-group">
          <Link to="/" className="home-icon-btn" aria-label="Главное меню">
            <img src={menuIcon} alt="" />
          </Link>
          <Link to="/" className="home-icon-btn" aria-label="Главная">
            <img src={homeIcon} alt="" />
          </Link>
        </div>

        <div className="home-ui-group">
          <button
            type="button"
            className="home-sound-btn"
            aria-label={isSoundEnabled ? 'Выключить звук' : 'Включить звук'}
            onClick={() => setIsSoundEnabled((current) => !current)}
          >
            <img src={isSoundEnabled ? soundOnIcon : soundOffIcon} alt="" />
          </button>
          <Link to={user ? '/profile' : '/login'} className="home-icon-btn" aria-label={user ? 'Профиль' : 'Войти'}>
            <img src={profileIcon} alt="" />
          </Link>
        </div>
      </div>

      <div className="home-content">
        <img src={logoMenu} className="home-logo" alt="Код Рюрика" />
        <h1 className="home-title">КОД РЮРИКА</h1>

        <nav className="home-actions" aria-label="Основные действия">
          <MenuButton to="/game" className="main">
            НОВАЯ ИГРА
          </MenuButton>
          <MenuButton to="/leaderboard">ТАБЛИЦА ЛИДЕРОВ</MenuButton>
          <MenuButton to="/about">О ПРОЕКТЕ</MenuButton>
          {user ? (
            <MenuButton onClick={handleLogout}>ВЫЙТИ</MenuButton>
          ) : (
            <MenuButton to="/login">АВТОРИЗАЦИЯ</MenuButton>
          )}
        </nav>
      </div>

      <img src={rurikCharacter} className="home-character" alt="" />
    </section>
  );
}
