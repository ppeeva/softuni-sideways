import { useForm } from '../../hooks/useForm';
import { validationHelper } from '../../utils/validationHelper';
import styles from './SidewayCreate.module.css'

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
        <section id="create-page" className={styles['create-page']}>
            <form id="create" method="post" onSubmit={onSubmit}>
                <div >
                    <h1>Create Sideway</h1>

                    <label htmlFor="title">Title:</label>
                    <input value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Enter sideway title..." />
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
                    <input value={values.category} onChange={changeHandler} type="text" id="category" name="category" placeholder="Enter sideway category..." />
                    {formErrors.category &&
                        <p className="form-error">
                            {formErrors.category}
                        </p>
                    }
                    
                    <label htmlFor="imageUrl">Image:</label>
                    <input value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={values.description} onChange={changeHandler}></textarea>
                    {formErrors.description &&
                        <p className="form-error">
                            {formErrors.description}
                        </p>
                    }

                    <input className="btn submit" type="submit" value="Create Sideway" />
                </div>
            </form>
        </section>
    );
};
