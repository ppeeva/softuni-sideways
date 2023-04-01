import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, validateHandler) => {
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const errors = typeof (validateHandler) === 'function' ? validateHandler(values) : {};
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            onSubmitHandler(values);
        }
    };

    const changeValues = (newValues) => {
        // TODO: Validate newValues shape (like initialValues)

        setValues(newValues);
    };

    return {
        values,
        formErrors,
        changeHandler,
        onSubmit,
        changeValues,
    };
};