import { SidewayListItem } from '../SidewayListItem/SidewayListItem';

export const SidewayList = ({
    sideways,
}) => {
    return (
        <section>
            <h1>All Sideways</h1>

            {sideways.map(x =>
                <SidewayListItem key={x._id} {...x} />
            )}

            {sideways.length === 0 && (
                <h3 >No sideways yet</h3>
            )}
        </section>
    );
};