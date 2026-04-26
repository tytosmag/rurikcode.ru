import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Registr from './pages/Registr';
import Restore from './pages/Restore';
import Profile from './pages/Profile';
import { logoutRequest, meRequest } from './api/authApi';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await meRequest();
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    init();
  }, []);

  const handleLogout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} onLogout={handleLogout} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/registr" element={<Registr />} />
          <Route path="/restore" element={<Restore />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}