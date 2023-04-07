import { Link } from 'react-router-dom';
import styles from '../MyProfile/MyProfile.module.css';

export const MyPlanned = ({
    plans,
}) => {

    return (
        <section id="plans-page">
            {plans?.length > 0 && (
                <>
                    {plans.map(x =>
                        <div key={x.sidewayId}>
                            <Link to={`/catalog/${x.sidewayId}`} className={styles['my-list-item']} >{x.sideway.title}</Link>
                        </div>
                    )}
                </>
            )}


            {plans?.length === 0 && (
                <h3 >No plans yet</h3>
            )}
        </section>
    );
};