import { Link } from 'react-router-dom';

export const SidewayListItem = ({
    _id,
    title,
    imageUrl,
    category,
}) => {
    return (
        <div >
            <div >
                <img src={imageUrl} alt={title}/>
                <h6>{category}</h6>
                <h2>{title}</h2>
                <Link to={`/catalog/${_id}`} >Details</Link>
            </div>
        </div>
    );
};