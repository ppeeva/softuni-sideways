import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';

export const Navigation = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <header>
            <nav className={styles['main-nav']}>
                <NavLink className={styles['main-nav-link']} to="/">Sideways</NavLink>
                <div className={styles['main-nav-inner']}>
                    <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="/catalog">All sideways</NavLink>
                    {isAuthenticated && (
                        <>
                            <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="/create">Create sideway</NavLink>
                            <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="/profile">Profile</NavLink>
                            {/* <span>({userEmail})</span> */}
                            <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="/logout">Logout</NavLink>
                        </>
                    )}

                    {!isAuthenticated && (
                        <>
                            <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="/login">Login</NavLink>
                            <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="/register">Register</NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};