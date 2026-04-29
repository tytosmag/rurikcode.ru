import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createLeaderboardResultRequest } from '../api/leaderboardApi';
import { getStartSceneRequest, submitChoiceRequest } from '../api/gameApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Game() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [scene, setScene] = useState(null);
  const [score, setScore] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [startedAt, setStartedAt] = useState(null);

  useEffect(() => {
    const loadStartScene = async () => {
      try {
        const { data } = await getStartSceneRequest();
        setScene(data.scene);
        setScore(0);
        setStartedAt(Date.now());
      } catch (error) {
        console.error('Ошибка загрузки игры:', error);
        showToast('Ошибка загрузки игры', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadStartScene();
  }, []); //TODO: eslint потом может ругнуться

  const handleChoice = async (choiceId) => {
    if (!scene) return;

    try {
      const { data } = await submitChoiceRequest(scene.id, {
        choiceId,
        currentScore: score
      });

      setScene(data.scene);
      setScore(data.score);

      if (data.isFinal) {
        const seconds = Math.floor((Date.now() - startedAt) / 1000);
        setTimeSeconds(seconds);
        showToast('Финальная сцена достигнута', 'success');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Ошибка выбора';
      showToast(message, 'error');
    }
  };

  const handleSaveResult = async () => {
    if (!user) {
      showToast('Войдите в аккаунт, чтобы сохранить результат', 'error');
      return;
    }

    try {
      await createLeaderboardResultRequest({
        score,
        time_seconds: timeSeconds,
        level: scene?.id || 'unknown'
      });

      showToast('Результат сохранён', 'success');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Ошибка сохранения результата';

      showToast(message, 'error');
    }
  };

  const handleRestart = async () => {
    try {
      const { data } = await getStartSceneRequest();
      setScene(data.scene);
      setScore(0);
      setTimeSeconds(0);
      setStartedAt(Date.now());
      showToast('Игра начата заново', 'success');
    } catch {
      showToast('Ошибка перезапуска игры', 'error');
    }
  };

  if (isLoading) {
    return (
      <section className="content-page">
        <h1>Новая игра</h1>
        <p>Загрузка игры...</p>
      </section>
    );
  }

  if (!scene) {
    return (
      <section className="content-page">
        <h1>Новая игра</h1>
        <p>Сцена не найдена.</p>
      </section>
    );
  }

  return (
    <section className="content-page">
      <h1>Новая игра</h1>

      <div className="content-card game-card">
        <div className="game-stats">
          <span>Очки: {score}</span>
          <span>Сцена: {scene.id}</span>
          {timeSeconds > 0 && <span>Время: {timeSeconds} сек.</span>}
        </div>

        <h2>{scene.title}</h2>
        <p>{scene.text}</p>

        {scene.isFinal ? (
          <div className="game-actions">
            <button type="button" onClick={handleSaveResult}>
              Сохранить результат
            </button>

            <button type="button" onClick={handleRestart}>
              Начать заново
            </button>

            <Link to="/leaderboard">
              <button type="button">Открыть таблицу лидеров</button>
            </Link>
          </div>
        ) : (
          <div className="game-actions">
            {scene.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleChoice(choice.id)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        <Link to="/">
          <button type="button">Назад на главную</button>
        </Link>
      </div>
    </section>
  );
}