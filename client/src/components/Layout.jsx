import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <div className={isHomePage ? 'app-shell app-shell-home' : 'app-shell'}>
      {!isHomePage && <Header />}
      <main className={isHomePage ? 'home-main' : 'container'}>
        <Outlet />
      </main>
    </div>
  );
}
