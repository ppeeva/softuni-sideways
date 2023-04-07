import { Link } from 'react-router-dom';
import styles from './SidewayListItem.module.css';

export const SidewayListItem = ({
    _id,
    title,
    imageUrl,
    category,
}) => {
    return (
        <div className={styles['sideway-card']}>
            <div className={styles['sideway-card-info']}>
                <img src={imageUrl || '/images/highway-small.jpg'} alt={title} />
                <div className={styles['card-text']}>
                    <h2>{title}</h2>
                    <h5>{category}</h5>
                    <Link to={`/catalog/${_id}`} className={styles['card-button']}>View more</Link>
                </div>
            </div>
        </div>
    );
};