import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as sidewayService from '../../services/sidewayService';
import { AuthContext } from '../../contexts/AuthContext';

import { formatDate } from '../../utils/dateHelper';

export const SidewayDetails = ({
    onSidewayDelete
}) => {
    const { userId } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const { sidewayId } = useParams();
    const [sideway, setSideway] = useState({});
    const {token} = useContext(AuthContext);

    useEffect(() => {
        sidewayService.getOne(sidewayId)
            .then(result => {
                setSideway(result);
            });
    }, [sidewayId]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        // const result = await commentService.create(sidewayId, {
        //     username,
        //     comment,
        // });

        // // setSideway(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));
        // setUsername('');
        // setComment('');
    };

    const isOwner = sideway._ownerId === userId;

    return (
        <section id="sideway-details">
            <h1>Sideway Details</h1>
            <div >

                <div >
                    <img src={sideway.imageUrl} alt={sideway.title}/>
                    <h1>{sideway.title}</h1>
                    <h4>{sideway.location}</h4>
                    <p >{sideway.category}</p>
                </div>

                <p className="text">{sideway.description}</p>
                <p>Created on: {formatDate(sideway._createdOn)}</p>
                <p>Author: {sideway._ownerId}</p> 

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {sideway.comments && Object.values(sideway.comments).map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {sideway.comments && !Object.values(sideway.comments).length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${sideway._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={() => onSidewayDelete(sideway._id, token)}>Delete</button>
                    </div>
                )}
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type="text" name="username" placeholder='Пешо' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};