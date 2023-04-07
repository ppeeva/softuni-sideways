import { Link } from 'react-router-dom';

import styles from '../Navigation/Navigation.module.css';

export const MyCreated = ({
    created,
}) => {

    return (
        <section id="my-created-page">
            {created?.length > 0 && (
                <>
                    {created.map(x =>
                        <div key={x._id}>
                            <Link to={`/catalog/${x._id}`} className={styles['nav-link-title']}>{x.title}</Link>
                        </div>
                    )}
                </>
            )}


            {created?.length === 0 && (
                <h3 >No sideways created by me</h3>
            )}
        </section>
    );
};