import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../api/authApi';
import logoMenu from '../assets/home/logo_menu.png';
import GameHeader from '../components/GameHeader';
import { useToast } from '../context/ToastContext';

export default function Registr() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
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
    setMessage('');

    try {
      const { data } = await registerRequest(form);
      setMessage(data.message || 'Аккаунт создан');
      showToast('Регистрация успешна', 'success');

      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка регистрации';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    }
  };

  return (
    <section className="auth-page auth-register-page" aria-label="Регистрация">
      <GameHeader />

      <Link to="/" className="auth-logo" aria-label="На главную">
        <img src={logoMenu} alt="" />
        <span>КОД РЮРИКА</span>
      </Link>

      <form className="auth-panel" onSubmit={handleSubmit}>
        <h1>Создать аккаунт</h1>

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
              placeholder="Пароль"
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

        {message && <p className="auth-success">{message}</p>}
        {error && <p className="auth-error">{error}</p>}

        <p className="auth-switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>

        <button type="submit" className="auth-submit">
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </form>
    </section>
  );
}
