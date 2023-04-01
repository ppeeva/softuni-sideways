import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';

export const Navigation = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <nav className={styles.navigation}>
            <ul>
                <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/catalog">Sideways</NavLink></li>
                {isAuthenticated && (
                    <>
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/create">Create</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/profile">Profile</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/logout">Logout</NavLink></li>
                        <span>({userEmail})</span>
                    </>
                )}

                {!isAuthenticated && (
                    <>
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/login">Login</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/register">Register</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    );
};