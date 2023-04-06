import { Link } from 'react-router-dom';

export const MyFavourites = ({
    favs
}) => {

    return (
        <section id="favs-page">
            {favs?.length > 0 && (
                <>
                    {favs.map(x =>
                        <div key={x.sidewayId}>
                            <Link to={`/catalog/${x.sidewayId}`} >{x.sideway.title}</Link>
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