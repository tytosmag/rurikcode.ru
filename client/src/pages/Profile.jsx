import { useEffect, useState } from 'react';
import { meRequest, updateProfileRequest } from '../api/authApi';

export default function Profile({ user, setUser }) {
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await meRequest();
      setForm((prev) => ({
        ...prev,
        email: data.email || '',
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        middle_name: data.middle_name || '',
      }));
      setUser(data);
    };

    if (user) loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await updateProfileRequest(form);
    setUser(data.user);
    setMessage('Изменения сохранены');
  };

  if (!user) {
    return <p>Для доступа к профилю войдите в систему.</p>;
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Личный кабинет</h2>
      <input placeholder="Фамилия" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
      <input placeholder="Имя" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
      <input placeholder="Отчество" value={form.middle_name} onChange={(e) => setForm({ ...form, middle_name: e.target.value })} />
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Новый пароль" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {message && <p className="success">{message}</p>}
      <button type="submit">Сохранить</button>
    </form>
  );
}