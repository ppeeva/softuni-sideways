import { SidewayListItem } from '../SidewayListItem/SidewayListItem';

import styles from './SidewayList.module.css';

export const SidewayList = ({
    sideways,
}) => {
    return (
        <section id="catalog-page" className={styles['catalog-page']}>
            {sideways.length === 0 && (
                <h3 >No sideways yet</h3>
            )}

            {sideways.map(x =>
                <SidewayListItem key={x._id} {...x} />
            )}
        </section>
    );
};