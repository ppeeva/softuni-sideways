import { Link } from 'react-router-dom';

import styles from '../MyProfile/MyProfile.module.css';

export const MyFavourites = ({
    favs
}) => {

    return (
        <section id="favs-page">
            {favs?.length > 0 && (
                <>
                    {favs.map(x =>
                        <div key={x.sidewayId}>
                            <Link to={`/catalog/${x.sidewayId}`} className={styles['my-list-item']}>{x.sideway.title}</Link>
                        </div>
                    )}
                </>
            )}


            {favs?.length === 0 && (
                <h3 >No favourites yet</h3>
            )}
        </section>
    );
};