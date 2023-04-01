import { Link } from 'react-router-dom';
import styles from './SidewayListItem.module.css';

export const SidewayListItem = ({
    _id,
    title,
    imageUrl,
    category,
}) => {
    return (
        <div className={styles['allSideways']}>
            <div className={styles['allSideways-info']}>
                <img src={imageUrl} alt={title}/>
                <h6 className={styles['allSideways-info']}>{category}</h6>
                <h2 className={styles['allSideways-info']}>{title}</h2>
                <Link to={`/catalog/${_id}`} className={styles['details-button']}>Details</Link>
            </div>
        </div>
    );
};