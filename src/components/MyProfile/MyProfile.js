import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink, Routes, Route } from 'react-router-dom';

import { MyFavourites } from './../MyFavourites/MyFavourites';
import { MyVisited } from './../MyVisited/MyVisited';
import { MyPlanned } from './../MyPlanned/MyPlanned';
import * as planService from '../../services/planService';
import * as favService from '../../services/favService';
import * as visitService from '../../services/visitService';
import * as sidewayService from '../../services/sidewayService';
import { MyCreated } from '../MyCreated/MyCreated';

import styles from '../Navigation/Navigation.module.css';
import profileStyles from './MyProfile.module.css';

export const MyProfile = () => {

    const [plans, setPlans] = useState([]);
    const [favs, setFavs] = useState([]);
    const [visits, setVisits] = useState([]);
    const [created, setCreated] = useState([]);
    const { userId, userEmail } = useContext(AuthContext);

    useEffect(() => {
        Promise.all([
            planService.getAllForUser(userId),
            favService.getAllForUser(userId),
            visitService.getAllForUser(userId),
            sidewayService.getAllForUser(userId),
        ]).then(([planData, favData, visitData, createdData]) => {
            setPlans(planData);
            setFavs(favData);
            setVisits(visitData);
            setCreated(createdData);
        });
    }, []);

    return (
        <section className={profileStyles['profile-page']}>
            <div className={profileStyles['user-info']}>
                <img src="/images/avatar.jpg" alt={userEmail} className={profileStyles['avatar']} />
                <h3>{userEmail}</h3>
            </div>

            <div>
                <div className={profileStyles['sub-nav']}>
                    <nav className={styles['main-nav']}>
                        <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="fav">My Favourites</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="planned">My Planned</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="visited">My Visited</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['nav-active'] : ''} to="createdbyme">Created by me</NavLink>
                    </nav>
                </div>

                <div className={profileStyles['my-list']}>
                    <Routes>
                        <Route path='/fav' element={<MyFavourites favs={favs} />} />
                        <Route path='/planned' element={<MyPlanned plans={plans} />} />
                        <Route path='/visited' element={<MyVisited visits={visits} />} />
                        <Route path='/createdbyme' element={<MyCreated created={created} />} />
                    </Routes>
                </div>
            </div>
        </section >
    );
};