import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as sidewayService from '../../services/sidewayService';
import * as commentService from '../../services/commentService';
import * as planService from '../../services/planService';
import * as favService from '../../services/favService';
import * as visitService from '../../services/visitService';
import { AuthContext } from '../../contexts/AuthContext';

import { formatDate } from '../../utils/dateHelper';
import { CommentCreate } from '../CommentCreate';

export const SidewayDetails = ({
    onSidewayDelete,
}) => {
    const { sidewayId } = useParams();
    const { userId, isAuthenticated, token, userEmail } = useContext(AuthContext);
    const [sideway, setSideway] = useState({});

    useEffect(() => {
        Promise.all([
            sidewayService.getOne(sidewayId),
            commentService.getAll(sidewayId),
            planService.getOneForUserAndSideway(sidewayId, userId),
            favService.getOneForUserAndSideway(sidewayId, userId),
            visitService.getOneForUserAndSideway(sidewayId, userId),
        ]).then(([sidewayData, comments, plannedSideway, favSideway, visitedSideway]) => {
            setSideway({
                ...sidewayData,
                comments,
                plannedSidewayId: plannedSideway._id,
                favSidewayId: favSideway._id,
                visitedSidewayId: visitedSideway._id,
            });
            
        });
    }, [sidewayId]);

    const onCommentSubmit = async (values) => {

        const response = await commentService.create(sidewayId, values.comment, token);
        setSideway(state => ({
            ...state,
            comments: [
                ...state.comments,
                {
                    ...response,
                    author: {
                        email: userEmail
                    }
                }],
        }));
    };

    const onPlanCreate = async () => {

        const response = await planService.create(sidewayId, token);
        setSideway(state => ({
            ...state,
            plannedSidewayId: response._id,
        }));
    };

    const onPlanDelete = async () => {

        await planService.deletePlan(sideway.plannedSidewayId, token);
        setSideway(state => ({
            ...state,
            plannedSidewayId: undefined,
        }));
    };

    const onFavCreate = async () => {

        const response = await favService.create(sidewayId, token);
        setSideway(state => ({
            ...state,
            favSidewayId: response._id,
        }));
    };

    const onFavDelete = async () => {

        await favService.deleteFav(sideway.favSidewayId, token);
        setSideway(state => ({
            ...state,
            favSidewayId: undefined,
        }));
    };

    const onVisitCreate = async () => {

        const response = await visitService.create(sidewayId, token);
        setSideway(state => ({
            ...state,
            visitedSidewayId: response._id,
        }));

        await onPlanDelete();
    };

    const onVisitDelete = async () => {

        await visitService.deleteVisit(sideway.visitedSidewayId, token);
        setSideway(state => ({
            ...state,
            visitedSidewayId: undefined,
        }));
    };


    const isOwner = sideway._ownerId === userId;

    return (
        <section id="sideway-details">
            <h1>Sideway Details</h1>
            <div >

                <div >
                    <img src={sideway.imageUrl} alt={sideway.title} />
                    <h1>{sideway.title}</h1>

                    {isAuthenticated && !sideway.favSidewayId && (
                        <button type="button" onClick={onFavCreate}>Fav</button>
                    )}

                    {isAuthenticated && sideway.favSidewayId && (
                        <button type="button" onClick={onFavDelete}>Unfav</button>
                    )}

                    {isAuthenticated && !sideway.plannedSidewayId && !sideway.visitedSidewayId && (
                        <button type="button" onClick={onPlanCreate}>Plan</button>
                    )}

                    {isAuthenticated && sideway.plannedSidewayId && (
                        <button type="button" onClick={onPlanDelete}>Unplan</button>
                    )}

                    {isAuthenticated && !sideway.visitedSidewayId && (
                        <button type="button" onClick={onVisitCreate}>Visit</button>
                    )}

                    {isAuthenticated && sideway.visitedSidewayId && (
                        <button type="button" onClick={onVisitDelete}>Unvisit</button>
                    )}

                    <h4>{sideway.location}</h4>
                    <p >{sideway.category}</p>
                </div>

                <p className="text">{sideway.description}</p>
                <p>Created on:   {formatDate(sideway._createdOn)}</p>
                <p>Author: {sideway._ownerId}</p>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${sideway._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={() => onSidewayDelete(sideway._id, token)}>Delete</button>
                    </div>
                )}

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {sideway.comments && sideway.comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.author.email}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!sideway.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>
            </div>

            {isAuthenticated && <CommentCreate onCommentSubmit={onCommentSubmit} />}

        </section>
    );
};