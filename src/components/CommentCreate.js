import { useForm } from "../hooks/useForm";
import { validationHelper } from "../utils/validationHelper";

export const CommentCreate = ({
    onCommentSubmit,
}) => {
    const { values, formErrors, changeHandler, onSubmit } = useForm({
        comment: ''
    }, onCommentSubmit, validationHelper.validateComment);

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" method="post" onSubmit={onSubmit}>
                <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={changeHandler}></textarea>
                {formErrors.comment &&
                    <p className="form-error">
                        {formErrors.comment}
                    </p>
                }
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    );
};