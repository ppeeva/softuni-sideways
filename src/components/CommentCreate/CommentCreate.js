import { useForm } from "../../hooks/useForm";
import { validationHelper } from "../../utils/validationHelper";

import styles from './CommentCreate.module.css';

export const CommentCreate = ({
    onCommentSubmit,
}) => {
    const { values, formErrors, changeHandler, onSubmit } = useForm({
        comment: ''
    }, onCommentSubmit, validationHelper.validateComment);

    return (
        <article className={styles['create-comment']}>
            <div className={styles['create-comment-row']}>
                <label className={styles['create-comment-label']}>Add new comment:</label>
                <div className={styles['form-field-holder']}>
                    <form className="form" method="post" onSubmit={onSubmit}>
                        <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={changeHandler} className={styles['create-comment-text']}></textarea>
                        {formErrors.comment &&
                            <p className={styles['form-error']}>
                                {formErrors.comment}
                            </p>
                        }
                        <input type="submit" value="Add Comment" className={styles['submit-button']}/>
                    </form>
                </div>
            </div>
        </article>
    );
};