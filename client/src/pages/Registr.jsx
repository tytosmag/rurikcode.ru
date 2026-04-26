import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../api/authApi';

export default function Registr() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const { data } = await registerRequest(form);
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
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
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <button type="submit">Создать аккаунт</button>
    </form>
  );
}