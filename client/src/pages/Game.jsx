import { Link } from 'react-router-dom';

export default function Game() {
  return (
    <section className="content-page">
      <h1>Новая игра</h1>

      <div className="content-card">
        <p>
          Здесь будет основной игровой экран новой версии проекта «Код Рюрика».
        </p>

        <p>
          На следующем этапе сюда можно добавить сценарии, вопросы, уровни,
          игровые события и сохранение прогресса игрока.
        </p>

        <Link to="/">
          <button type="button">Назад на главную</button>
        </Link>
      </div>
    </section>
  );
}