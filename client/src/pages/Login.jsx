import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/authApi';
import logoMenu from '../assets/home/logo_menu.png';
import GameTopBar from '../components/GameTopBar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await loginRequest(form);
      setUser(data.user);
      showToast('Вход выполнен', 'success');
      navigate('/profile');
    } catch (err) {
      const message = err.response?.data?.message || 'Ошибка входа';
      setError(message);
      showToast(message, 'error');
    }
  };

  return (
    <section className="auth-page auth-login-page" aria-label="Авторизация">
      <GameTopBar />

      <Link to="/" className="auth-logo" aria-label="На главную">
        <img src={logoMenu} alt="" />
        <span>КОД РЮРИКА</span>
      </Link>

      <form className="auth-panel" onSubmit={handleSubmit}>
        <h1>
          Чтобы продолжить,
          <br />
          нужна авторизация
        </h1>

        <label>
          Никнейм
          <input
            type="text"
            name="username"
            placeholder="Будет вашим логином в игре"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Пароль
          <span className="auth-password-field">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="auth-password-toggle"
              aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
              onClick={() => setIsPasswordVisible((current) => !current)}
            />
          </span>
        </label>

        <Link to="/restore" className="auth-forgot">
          Забыли пароль?
        </Link>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-switch">
          Ещё нет аккаунта? <Link to="/registr">Зарегистрируйтесь</Link>
        </p>

        <button type="submit" className="auth-submit">
          ВОЙТИ
        </button>
      </form>
    </section>
  );
}
