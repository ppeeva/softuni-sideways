import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useService } from '../../hooks/useService';
import { sidewayServiceFactory } from '../../services/sidewayService';

export const SidewayEdit = ({
    onSidewayEdit,
}) => {
    const { sidewayId } = useParams();
    const sidewayService = useService(sidewayServiceFactory);
    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        location: '',
        category: '',
        imageUrl: '',
        description: '',
    }, onSidewayEdit);

    useEffect(() => {
        sidewayService.getOne(sidewayId)
            .then(result => {
                changeValues(result);
            });
    }, [sidewayId]);

    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="post" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit Sideway</h1>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={values.title} onChange={changeHandler} />

                    <label htmlFor="location">Location:</label>
                    <textarea name="location" id="location" value={values.location} onChange={changeHandler}></textarea>

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={values.category} onChange={changeHandler} />

                    <label htmlFor="imageUrl">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={changeHandler} />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={values.description} onChange={changeHandler}></textarea>

                    <input className="btn submit" type="submit" value="Edit Sideway" />

                </div>
            </form>
        </section>
    );
};