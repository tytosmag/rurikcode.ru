import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  const { pathname } = useLocation();
  const isImmersivePage = ['/', '/leaderboard', '/login', '/registr', '/register'].includes(pathname);

  return (
    <div className={isImmersivePage ? 'app-shell app-shell-home' : 'app-shell'}>
      {!isImmersivePage && <Header />}
      <main className={isImmersivePage ? 'home-main' : 'container'}>
        <Outlet />
      </main>
    </div>
  );
}
