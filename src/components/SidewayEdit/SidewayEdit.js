import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import * as sidewayService from '../../services/sidewayService';
import { validationHelper } from '../../utils/validationHelper';
import styles from '../Forms.module.css'

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
                <div className={styles['form-container']}>

                    <h1 className={styles['form-title']}>Edit Sideway</h1>

                    <div className={styles['form-row']}>
                        <label htmlFor="title" className={styles['form-label']}>Title:</label>
                        <div className={styles['form-field-holder']}>
                            <input type="text" id="title" name="title" value={values.title} onChange={changeHandler} />
                            {formErrors.title &&
                                <p className={styles['form-error']}>
                                    {formErrors.title}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <label htmlFor="location" className={styles['form-label']}>Location:</label>
                        <div className={styles['form-field-holder']}>
                            <textarea name="location" id="location" value={values.location} onChange={changeHandler}></textarea>
                            {formErrors.location &&
                                <p className={styles['form-error']}>
                                    {formErrors.location}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <label htmlFor="category" className={styles['form-label']}>Category:</label>
                        <div className={styles['form-field-holder']}>
                            <input type="text" id="category" name="category" value={values.category} onChange={changeHandler} />
                            {formErrors.category &&
                                <p className={styles['form-error']}>
                                    {formErrors.category}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <label htmlFor="imageUrl" className={styles['form-label']}>Image:</label>
                        <div className={styles['form-field-holder']}>
                            <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={changeHandler} />
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <label htmlFor="description" className={styles['form-label']}>Description:</label>
                        <div className={styles['form-field-holder']}>
                            <textarea name="description" id="description" value={values.description} onChange={changeHandler}></textarea>
                            {formErrors.description &&
                                <p className={styles['form-error']}>
                                    {formErrors.description}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <input className={styles['submit-button']} type="submit" value="Edit Sideway" />
                    </div>

                </div>
            </form>
        </section>
    );
};