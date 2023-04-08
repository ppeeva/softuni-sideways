import { useState, useEffect } from 'react';

import * as sidewayService from '../../services/sidewayService';
import * as planService from '../../services/planService';
import * as visitService from '../../services/visitService';

import styles from './Home.module.css';

export const Home = () => {
    const [plansCount, setPlansCount] = useState(0);
    const [visitsCount, setVisitsCount] = useState(0);
    const [sidewaysCount, setSidewaysCount] = useState(0);


    useEffect(() => {
        Promise.all([
            planService.getCount(),
            visitService.getCount(),
            sidewayService.getCount(),
        ]).then(([planData, visitData, sidewayData]) => {
            setPlansCount(planData);
            setVisitsCount(visitData);
            setSidewaysCount(sidewayData);
        });
    }, []);

    return (
        <section className={styles['home-container']}>
            
            <div className={styles['home-card']}>
                <p className={styles['home-card-count']}>{sidewaysCount} </p>
                <p className={styles['home-card-text']}>sideways to choose from</p>
            </div>

            <div className={styles['home-card']}>
                <p className={styles['home-card-count']}>{plansCount} </p>
                <p className={styles['home-card-text']}>planned by users</p>
            </div>
            <div className={styles['home-card']}>
                <p className={styles['home-card-count']}>{visitsCount}</p>
                <p className={styles['home-card-text']}>already visited by adventurers</p>
            </div>

        </section>
    );
};