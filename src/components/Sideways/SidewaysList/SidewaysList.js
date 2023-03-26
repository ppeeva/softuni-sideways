import { SidewaysListItem } from '../SidewaysListItem/SidewaysListItem';

export const SidewaysList = ({
    sideways,
}) => {
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