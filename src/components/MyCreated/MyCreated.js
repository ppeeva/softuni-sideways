import { Link } from 'react-router-dom';

import styles from '../MyProfile/MyProfile.module.css';

export const MyCreated = ({
    created,
}) => {

    return (
        <section id="my-created-page">
            {created?.length > 0 && (
                <>
                    {created.map(x =>
                        <div key={x._id}>
                            <Link to={`/catalog/${x._id}`} className={styles['my-list-item']}>{x.title}</Link>
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