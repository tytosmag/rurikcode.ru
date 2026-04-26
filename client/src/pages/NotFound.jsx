import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="content-page not-found">
      <h1>404</h1>
      <p>Страница не найдена</p>

      <Link to="/">
        <button type="button">Вернуться на главную</button>
      </Link>
    </section>
  );
}