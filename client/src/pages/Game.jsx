import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createLeaderboardResultRequest } from '../api/leaderboardApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Game() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [score, setScore] = useState(100);
  const [timeSeconds, setTimeSeconds] = useState(60);
  const [level, setLevel] = useState('intro');

  const handleSaveResult = async () => {
    if (!user) {
      showToast('Войдите в аккаунт, чтобы сохранить результат', 'error');
      return;
    }

    try {
      await createLeaderboardResultRequest({
        score,
        time_seconds: timeSeconds,
        level
      });

      showToast('Результат сохранён', 'success');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Ошибка сохранения результата';

      showToast(message, 'error');
    }
  };

  return (
    <section className="content-page">
      <h1>Новая игра</h1>

      <div className="content-card game-card">
        <p>
          Это временный тестовый игровой экран. Сейчас через него проверяем
          сохранение результата в leaderboard-service.
        </p>

        <div className="game-form">
          <label>
            Очки
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </label>

          <label>
            Время, секунд
            <input
              type="number"
              value={timeSeconds}
              onChange={(e) => setTimeSeconds(e.target.value)}
            />
          </label>

          <label>
            Уровень
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </label>
        </div>

        <button type="button" onClick={handleSaveResult}>
          Сохранить результат
        </button>

        <Link to="/leaderboard">
          <button type="button">Открыть таблицу лидеров</button>
        </Link>

        <Link to="/">
          <button type="button">Назад на главную</button>
        </Link>
      </div>
    </section>
  );
}