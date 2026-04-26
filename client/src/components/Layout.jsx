import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout({ user, onLogout }) {
  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}