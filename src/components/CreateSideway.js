import { useForm } from '../hooks/useForm';

export const CreateSideway = ({
    onCreateSidewaySubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        location: '',
        category: '',
        imageUrl: '',
        description: '',
    }, onCreateSidewaySubmit);

    return (
        <section >
            <form id="create" method="post" onSubmit={onSubmit}>
                <div >
                    <h1>Create Sideway</h1>

                    <label htmlFor="title">Title:</label>
                    <input value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Enter sideway title..." />

                    <label htmlFor="location">Location:</label>
                    <textarea name="location" id="location" value={values.location} onChange={changeHandler}></textarea>

                    <label htmlFor="category">Category:</label>
                    <input value={values.category} onChange={changeHandler} type="text" id="category" name="category" placeholder="Enter sideway category..." />

                    <label htmlFor="imageUrl">Image:</label>
                    <input value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={values.description} onChange={changeHandler}></textarea>

                    <input className="btn submit" type="submit" value="Create Sideway" />
                </div>
            </form>
        </section>
    );
};
