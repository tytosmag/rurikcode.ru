import { useEffect, useState } from 'react';
import { meRequest, updateProfileRequest } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await meRequest();

        setForm({
          email: data.email || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          middle_name: data.middle_name || '',
          password: ''
        });

        setUser(data);
      } catch (err) {
        console.error('Ошибка загрузки профиля:', err);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user, setUser]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const payload = { ...form };

      if (!payload.password.trim()) {
        delete payload.password;
      }

      const { data } = await updateProfileRequest(payload);
      setUser(data.user);
      setMessage('Изменения сохранены');
      setForm((prev) => ({
        ...prev,
        password: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка сохранения профиля');
    }
  };

  return (
    <section className="form-section">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Личный кабинет</h2>

        <input
          type="text"
          name="last_name"
          placeholder="Фамилия"
          value={form.last_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="first_name"
          placeholder="Имя"
          value={form.first_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="middle_name"
          placeholder="Отчество"
          value={form.middle_name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Новый пароль"
          value={form.password}
          onChange={handleChange}
        />

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit">Сохранить</button>
      </form>
    </section>
  );
}