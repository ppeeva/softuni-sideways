import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import * as sidewayService from '../../services/sidewayService';
import { validationHelper } from '../../utils/validationHelper';

export const SidewayEdit = ({
    onSidewayEdit,
}) => {
    const { sidewayId } = useParams();
    const { values, formErrors, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        location: '',
        category: '',
        imageUrl: '',
        description: '',
    }, onSidewayEdit, validationHelper.validateSideway);

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
                    {formErrors.title &&
                        <p className="form-error">
                            {formErrors.title}
                        </p>
                    }

                    <label htmlFor="location">Location:</label>
                    <textarea name="location" id="location" value={values.location} onChange={changeHandler}></textarea>
                    {formErrors.location &&
                        <p className="form-error">
                            {formErrors.location}
                        </p>
                    }

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={values.category} onChange={changeHandler} />
                    {formErrors.category &&
                        <p className="form-error">
                            {formErrors.category}
                        </p>
                    }

                    <label htmlFor="imageUrl">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={changeHandler} />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={values.description} onChange={changeHandler}></textarea>
                    {formErrors.description &&
                        <p className="form-error">
                            {formErrors.description}
                        </p>
                    }

                    <input className="btn submit" type="submit" value="Edit Sideway" />

                </div>
            </form>
        </section>
    );
};