import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import logoMenu from '../assets/home/logo_menu.png';
import loginIcon from '../assets/home/menu-back0.png';
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
        <button
          type="button"
          className="home-sound-btn"
          aria-label={isSoundEnabled ? 'Выключить звук' : 'Включить звук'}
          onClick={() => setIsSoundEnabled((current) => !current)}
        >
          <img src={isSoundEnabled ? soundOnIcon : soundOffIcon} alt="" />
        </button>
        {user ? (
          <button type="button" className="home-auth-btn" aria-label="Выйти" onClick={handleLogout}>
            <img src={loginIcon} alt="" />
          </button>
        ) : (
          <Link to="/login" className="home-auth-btn" aria-label="Войти">
            <img src={loginIcon} alt="" />
          </Link>
        )}
      </div>

      <div className="home-content">
        <img src={logoMenu} className="home-logo" alt="Код Рюрика" />
        <h1 className="home-title">КОД РЮРИКА</h1>

        <nav className="home-actions" aria-label="Основные действия">
          <MenuButton to="/game" className="main">
            НОВАЯ ИГРА
          </MenuButton>
          <MenuButton to="/leaderboard">СТАТИСТИКА</MenuButton>
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
