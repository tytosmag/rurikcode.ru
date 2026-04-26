import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}