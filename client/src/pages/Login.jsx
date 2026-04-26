import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
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
    <section className="form-section">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Авторизация</h2>

        <input
          type="text"
          name="username"
          placeholder="Логин"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Войти</button>

        <div className="form-links">
          <Link to="/registr">Регистрация</Link>
          <Link to="/restore">Восстановить пароль</Link>
        </div>
      </form>
    </section>
  );
}