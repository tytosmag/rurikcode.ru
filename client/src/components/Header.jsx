import { Link } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <Link to="/" className="logo">Код Рюрика</Link>
      <nav>
        {user ? (
          <button onClick={onLogout}>Выйти</button>
        ) : (
          <Link to="/login"><button>Авторизация</button></Link>
        )}
      </nav>
    </header>
  );
}