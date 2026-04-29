import { useEffect, useState } from 'react';
import { getLeaderboardRequest } from '../api/leaderboardApi';
import { useToast } from '../context/ToastContext';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const { data } = await getLeaderboardRequest();
        setLeaders(data.leaders || []);
      } catch (error) {
        console.error('Ошибка загрузки таблицы лидеров:', error);
        showToast('Ошибка загрузки таблицы лидеров', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, [showToast]);

  if (isLoading) {
    return (
      <section className="content-page">
        <h1>Таблица лидеров</h1>
        <p>Загрузка...</p>
      </section>
    );
  }

  return (
    <section className="content-page">
      <h1>Таблица лидеров</h1>

      {leaders.length === 0 ? (
        <div className="content-card">
          <p>Пока нет результатов.</p>
        </div>
      ) : (
        <div className="leaderboard-card">
          <div className="leaderboard-row leaderboard-head">
            <span>Место</span>
            <span>Игрок</span>
            <span>Очки</span>
          </div>

          {leaders.map((player, index) => (
            <div key={player.id} className="leaderboard-row">
              <span>{index + 1}</span>
              <span>{player.username}</span>
              <span>{player.score}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}