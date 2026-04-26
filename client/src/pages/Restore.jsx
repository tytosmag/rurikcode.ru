import { useState } from 'react';
import { restoreRequest } from '../api/authApi';
import { useToast } from '../context/ToastContext';

export default function Restore() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const { data } = await restoreRequest({ email });
      setMessage(data.message);
      showToast(data.message, 'success');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка восстановления';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    }
  };

  return (
    <section className="form-section">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Восстановление пароля</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit">Отправить</button>
      </form>
    </section>
  );
}