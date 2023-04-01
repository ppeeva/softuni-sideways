import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink, Routes, Route } from 'react-router-dom';

import { MyFavourites } from './../MyFavourites/MyFavourites';
import { MyVisited } from './../MyVisited/MyVisited';
import { MyPlanned } from './../MyPlanned/MyPlanned';
import styles from './../Navigation/Navigation.module.css';

export const MyProfile = () => {

    const { userEmail } = useContext(AuthContext);

    return (
        <section>
            <h1>My profile</h1>
            <h3>{userEmail}</h3>

            <nav className={styles.navigation}>
                <ul>
                    <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="fav">My Favourites</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="visited">My Visited</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? styles['nav-active'] : '' } to="planned">My Planned</NavLink></li>
                </ul>
            </nav>

            <Routes>
                <Route path='/fav' element={<MyFavourites />} />
                <Route path='/visited' element={<MyVisited />} />
                <Route path='/planned' element={<MyPlanned />} />
            </Routes>

        </section >
    );
};