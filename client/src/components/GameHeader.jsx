import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backIcon from '../assets/ui/icon-back.svg';
import homeIcon from '../assets/ui/icon-home.svg';
import loginIcon from '../assets/ui/icon-login.svg';
import soundIcon from '../assets/ui/icon-sound.svg';
import userIcon from '../assets/ui/icon-user.svg';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function GameHeader({ className = '' }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleLogout = async () => {
    await logout();
    showToast('Вы вышли из аккаунта', 'success');
  };

  return (
    <header className={`game-header ${className}`.trim()} aria-label="Игровая навигация">
      <div className="game-header-group">
        <button type="button" className="game-header-btn" aria-label="Назад" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="" />
        </button>

        <Link to="/" className="game-header-btn" aria-label="Главное меню">
          <img src={homeIcon} alt="" />
        </Link>
      </div>

      <div className="game-header-group">
        <button
          type="button"
          className={isSoundEnabled ? 'game-header-btn' : 'game-header-btn is-muted'}
          aria-label={isSoundEnabled ? 'Выключить звук' : 'Включить звук'}
          onClick={() => setIsSoundEnabled((current) => !current)}
        >
          <img src={soundIcon} alt="" />
        </button>

        {user ? (
          <button type="button" className="game-header-btn" aria-label="Выйти" onClick={handleLogout}>
            <img src={userIcon} alt="" />
          </button>
        ) : (
          <Link to="/login" className="game-header-btn" aria-label="Авторизация">
            <img src={loginIcon} alt="" />
          </Link>
        )}
      </div>
    </header>
  );
}
