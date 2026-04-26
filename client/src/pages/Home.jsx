import { Link } from 'react-router-dom';

export default function Home({ user }) {
  return (
    <section className="hero">
      <h1>Код Рюрика</h1>
      <div className="menu-grid">
        <button>Новая игра</button>
        <button>Таблица лидеров</button>
        <button>О проекте</button>
        {user ? (
          <button>Выйти</button>
        ) : (
          <Link to="/login"><button>Авторизация</button></Link>
        )}
      </div>
    </section>
  );
}