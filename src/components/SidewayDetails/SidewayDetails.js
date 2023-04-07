import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as sidewayService from '../../services/sidewayService';
import * as commentService from '../../services/commentService';
import * as planService from '../../services/planService';
import * as favService from '../../services/favService';
import * as visitService from '../../services/visitService';
import { AuthContext } from '../../contexts/AuthContext';

import { formatDate } from '../../utils/dateHelper';
import { CommentCreate } from '../CommentCreate/CommentCreate';

import styles from './SidewayDetails.module.css';

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

        if (sideway.plannedSidewayId) {
            await planService.deletePlan(sideway.plannedSidewayId, token);
            setSideway(state => ({
                ...state,
                plannedSidewayId: undefined,
            }));
        }
    };

    const onFavCreate = async () => {

        const response = await favService.create(sidewayId, token);
        setSideway(state => ({
            ...state,
            favSidewayId: response._id,
        }));
    };

    const onFavDelete = async () => {

        if (sideway.favSidewayId) {
            await favService.deleteFav(sideway.favSidewayId, token);
            setSideway(state => ({
                ...state,
                favSidewayId: undefined,
            }));
        }
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

        if (sideway.visitedSidewayId) {
            await visitService.deleteVisit(sideway.visitedSidewayId, token);
            setSideway(state => ({
                ...state,
                visitedSidewayId: undefined,
            }));
        }
    };


    const isOwner = sideway._ownerId === userId;

    return (
        <section id="sideway-details" className={styles['sideway-details']}>
            <div >
                <div >
                    <h1 className={styles['sideway-details-title']}>{sideway.title}</h1>
                    <h5 className={styles['sideway-details-subtitle']}>{sideway.category}</h5>

                    <div className={styles['action-buttons']}>
                        {isAuthenticated && !sideway.favSidewayId && (
                            <button type="button" onClick={onFavCreate} className={styles['action']}>Fav</button>
                        )}

                        {isAuthenticated && sideway.favSidewayId && (
                            <button type="button" onClick={onFavDelete} className={styles['action']}>Unfav</button>
                        )}

                        {isAuthenticated && !sideway.plannedSidewayId && !sideway.visitedSidewayId && (
                            <button type="button" onClick={onPlanCreate} className={styles['action']}>Plan</button>
                        )}

                        {isAuthenticated && sideway.plannedSidewayId && (
                            <button type="button" onClick={onPlanDelete} className={styles['action']}>Unplan</button>
                        )}

                        {isAuthenticated && !sideway.visitedSidewayId && (
                            <button type="button" onClick={onVisitCreate} className={styles['action']}>Visit</button>
                        )}

                        {isAuthenticated && sideway.visitedSidewayId && (
                            <button type="button" onClick={onVisitDelete} className={styles['action']}>Unvisit</button>
                        )}
                    </div>

                    <img src={sideway.imageUrl || '/images/highway-small.jpg'} alt={sideway.title} className={styles['sideway-details-img']} />

                    <h4 className={styles['sideway-details-location']}>{sideway.location}</h4>
                </div>

                <p className={styles['sideway-details-text']}>{sideway.description}</p>

                <p className={styles['sideway-details-author']}>Created on: {formatDate(sideway._createdOn)}</p>
                <p className={styles['sideway-details-author']}>Author: {sideway.owner?.email}</p>

                {isOwner && (
                    <div className={styles['action-buttons']}>
                        <Link to={`/catalog/${sideway._id}/edit`} className={styles['action']}>Edit</Link>
                        <button onClick={() => onSidewayDelete(sideway._id, token)} className={styles['action']}>Delete</button>
                    </div>
                )}

                <div >
                    {!sideway.comments?.length && (
                        <p className={styles['no-comment']}>No comments yet.</p>
                    )}

                    {sideway.comments?.length > 0 &&
                        <div className={styles['details-comments']}>
                            <h2>Comments:</h2>
                            <ul>
                                {sideway.comments && sideway.comments.map(x => (
                                    <li key={x._id}>
                                        <p>{x.author.email}: {x.comment}</p>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    }

                    {isAuthenticated && <CommentCreate onCommentSubmit={onCommentSubmit} />}
                </div>

                

            </div>


        </section >
    );
};