import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/authApi';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <input
        placeholder="Логин"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Войти</button>
      <div className="form-links">
        <Link to="/registr">Регистрация</Link>
        <Link to="/restore">Восстановить пароль</Link>
      </div>
    </form>
  );
}