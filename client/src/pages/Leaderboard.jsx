import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeaderboardRequest } from '../api/leaderboardApi';
import loginIcon from '../assets/home/menu-back0.png';
import logoMenu from '../assets/home/logo_menu.png';
import bronzeMedal from '../assets/home/medal-bronse.png';
import goldMedal from '../assets/home/medal-gold.png';
import silverMedal from '../assets/home/medal-silvers.png';
import rurikCharacter from '../assets/home/rurik_menu.png';
import soundOffIcon from '../assets/home/sound-off.png';
import soundOnIcon from '../assets/home/sound-on0.png';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const medals = [goldMedal, silverMedal, bronzeMedal];

function formatTime(seconds) {
  if (!seconds && seconds !== 0) {
    return '—';
  }

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes > 0 ? `${minutes}:${String(rest).padStart(2, '0')}` : `${rest} сек`;
}

function StatBadge({ index }) {
  if (index > 2) {
    return <span className="stats-place">{index + 1}</span>;
  }

  return <img src={medals[index]} className="stats-medal" alt={`${index + 1} место`} />;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const { data } = await getLeaderboardRequest();
        setLeaders(data.leaders || []);
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
        showToast('Ошибка загрузки статистики', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, [showToast]);

  const handleLogout = async () => {
    await logout();
    showToast('Вы вышли из аккаунта', 'success');
  };

  return (
    <section className="stats-page" aria-label="Статистика игроков">
      <div className="stats-top-ui">
        <button
          type="button"
          className="stats-icon-btn"
          aria-label={isSoundEnabled ? 'Выключить звук' : 'Включить звук'}
          onClick={() => setIsSoundEnabled((current) => !current)}
        >
          <img src={isSoundEnabled ? soundOnIcon : soundOffIcon} alt="" />
        </button>

        {user ? (
          <button type="button" className="stats-icon-btn" aria-label="Выйти" onClick={handleLogout}>
            <img src={loginIcon} alt="" />
          </button>
        ) : (
          <Link to="/login" className="stats-icon-btn" aria-label="Войти">
            <img src={loginIcon} alt="" />
          </Link>
        )}
      </div>

      <img src={logoMenu} className="stats-logo" alt="Код Рюрика" />
      <h1 className="stats-brand">КОД РЮРИКА</h1>

      <div className="stats-board">
        <div className="stats-heading">
          <h2>СТАТИСТИКА</h2>
          <p>Лучшие результаты игроков</p>
        </div>

        {isLoading ? (
          <div className="stats-empty">Загрузка...</div>
        ) : leaders.length === 0 ? (
          <div className="stats-empty">Пока нет результатов</div>
        ) : (
          <div className="stats-table" role="table" aria-label="Рейтинг игроков">
            <div className="stats-row stats-row-head" role="row">
              <span>Место</span>
              <span>Игрок</span>
              <span>Очки</span>
              <span>Время</span>
              <span>Уровень</span>
            </div>

            {leaders.map((player, index) => (
              <div key={player.id || `${player.username}-${index}`} className="stats-row" role="row">
                <span>
                  <StatBadge index={index} />
                </span>
                <span className="stats-player">{player.username || 'Игрок'}</span>
                <span>{player.score ?? '—'}</span>
                <span>{formatTime(player.time_seconds)}</span>
                <span>{player.level || '—'}</span>
              </div>
            ))}
          </div>
        )}

        <Link to="/" className="stats-back-btn">
          В МЕНЮ
        </Link>
      </div>

      <img src={rurikCharacter} className="stats-character" alt="" />
    </section>
  );
}
