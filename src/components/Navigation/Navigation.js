import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';

export const Navigation = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <nav className={styles.navigation}>
            <ul>
                <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/catalog">All sideways</NavLink></li>
                {isAuthenticated && (
                    <>
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/create">Create sideway</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/profile">Profile</NavLink></li>
                        {/* <span>({userEmail})</span> */}
                        <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/logout">Logout</NavLink></li>
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