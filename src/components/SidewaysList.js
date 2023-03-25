import { SidewaysListItem } from './SidewaysListItem';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export const SidewaysList = ({
    sideways,
}) => {
    const { token } = useContext(AuthContext);

    console.log('catalog token: ', token);

    return (
        <section>
            <h1>All Sideways</h1>

            {sideways.map(x =>
                <SidewaysListItem key={x._id} {...x} />
            )}

            {sideways.length === 0 && (
                <h3 >No sideways yet</h3>
            )}
        </section>
    );
};