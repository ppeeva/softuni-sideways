
import styles from './Home.module.css';

export const Home = ({
    plansCount,
    visitsCount,
    sidewaysCount
}) => {
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