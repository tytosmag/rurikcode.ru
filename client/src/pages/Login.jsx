import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
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