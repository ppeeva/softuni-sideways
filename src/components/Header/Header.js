import { NavLink } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import styles from './../Navigation/Navigation.module.css'


export const Header = () => {

    return (
        <header>
            <h1 className={styles.navigation}>
                <NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="/">Sideways</NavLink>
            </h1>
            <Navigation />
        </header>
    );
};