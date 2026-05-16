import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backIcon from '../assets/home/menu-back.png';
import homeIcon from '../assets/home/menu-home.png';
import soundOffIcon from '../assets/home/sound-off.png';
import soundOnIcon from '../assets/home/sound-on.png';

export default function GameTopBar({ className = '' }) {
  const navigate = useNavigate();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  return (
    <div className={`game-topbar ${className}`.trim()}>
      <div className="game-topbar-left">
        <button type="button" className="game-topbar-btn" aria-label="Назад" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="" />
        </button>
        <Link to="/" className="game-topbar-btn" aria-label="Главное меню">
          <img src={homeIcon} alt="" />
        </Link>
      </div>

      <button
        type="button"
        className="game-topbar-btn game-topbar-sound"
        aria-label={isSoundEnabled ? 'Выключить звук' : 'Включить звук'}
        onClick={() => setIsSoundEnabled((current) => !current)}
      >
        <img src={isSoundEnabled ? soundOnIcon : soundOffIcon} alt="" />
      </button>
    </div>
  );
}
