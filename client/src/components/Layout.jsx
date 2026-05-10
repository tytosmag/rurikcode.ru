import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  const { pathname } = useLocation();
  const isImmersivePage = pathname === '/' || pathname === '/leaderboard';

  return (
    <div className={isImmersivePage ? 'app-shell app-shell-home' : 'app-shell'}>
      {!isImmersivePage && <Header />}
      <main className={isImmersivePage ? 'home-main' : 'container'}>
        <Outlet />
      </main>
    </div>
  );
}
