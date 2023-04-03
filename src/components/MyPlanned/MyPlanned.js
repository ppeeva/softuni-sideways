import { Link } from 'react-router-dom';

export const MyPlanned = ({
    plans,
}) => {

    return (
        <section id="plans-page">
            {plans?.length > 0 && (
                <>
                    {plans.map(x =>
                        <div key={x._id}>
                            <Link to={`/catalog/${x._id}`} >{x.sideway.title}</Link>
                        </div>
                    )}
                </>
            )}


            {plans?.length === 0 && (
                <h3 >No plans yet</h3>
            )}
        </section>
    );
};