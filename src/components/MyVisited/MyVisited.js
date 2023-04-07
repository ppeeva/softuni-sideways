import { Link } from 'react-router-dom';

import styles from '../MyProfile/MyProfile.module.css';

export const MyVisited = ({
    visits,
}) => {

    return (
        <section id="visits-page">
            {visits?.length > 0 && (
                <>
                    {visits.map(x =>
                        <div key={x.sidewayId}>
                            <Link to={`/catalog/${x.sidewayId}`} className={styles['my-list-item']}>{x.sideway.title}</Link>
                        </div>
                    )}
                </>
            )}


            {visits?.length === 0 && (
                <h3 >No visits yet</h3>
            )}
        </section>
    );
};