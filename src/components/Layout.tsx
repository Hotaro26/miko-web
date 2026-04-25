import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Compass as ExploreIcon, 
  Heart as FavouritesIcon,
  Settings as SettingsIcon
} from 'lucide-react';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/explore', label: 'Explore', icon: ExploreIcon },
    { path: '/favourites', label: 'Favourites', icon: FavouritesIcon },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/' && location.pathname === '');
          
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => isActive ? styles.active : styles.link}
            >
              <div className={styles.iconWrapper}>
                <div className={styles.indicator} />
                <item.icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={styles.icon}
                />
              </div>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
