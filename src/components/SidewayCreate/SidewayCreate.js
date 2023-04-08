import { useForm } from '../../hooks/useForm';
import { validationHelper } from '../../utils/validationHelper';

import styles from '../Forms.module.css';

export const SidewayCreate = ({
    onSidewayCreate,
}) => {
    const { values, formErrors, changeHandler, onSubmit } = useForm({
        title: '',
        location: '',
        category: '',
        imageUrl: '',
        description: '',
    }, onSidewayCreate, validationHelper.validateSideway);

    return (
        <section id="create-page" >
            <form id="create" method="post" onSubmit={onSubmit}>
                <div className={styles['form-container']}>
                    <h1 className={styles['form-title']}>Create Sideway</h1>

                    <div className={styles['form-row']}>
                        <label htmlFor="title" className={styles['form-label']}>Title:</label>
                        <div className={styles['form-field-holder']}>
                            <input value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Enter sideway title..." />
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
                            <input value={values.category} onChange={changeHandler} type="text" id="category" name="category" placeholder="Enter sideway category..." />
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
                            <input value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />
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
                        <input type="submit" value="Create Sideway" className={styles['submit-button']}/>
                    </div>
                </div>
            </form>
        </section >
    );
};
