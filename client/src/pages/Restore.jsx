import { useState } from 'react';
import { restoreRequest } from '../api/authApi';

export default function Restore() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await restoreRequest({ email });
    setMessage(data.message);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Восстановление пароля</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {message && <p className="success">{message}</p>}
      <button type="submit">Отправить</button>
    </form>
  );
}