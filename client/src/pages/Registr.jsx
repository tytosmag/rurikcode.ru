import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerRequest } from '../api/authApi';
import { useToast } from '../context/ToastContext';

export default function Registr() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
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
      setMessage(data.message);
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
    <section className="form-section">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>

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

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit">Создать аккаунт</button>

        <div className="form-links">
          <Link to="/login">Уже есть аккаунт?</Link>
        </div>
      </form>
    </section>
  );
}