import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useForm = (initialValues, onSubmitHandler, validateHandler) => {
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const { token } = useContext(AuthContext);

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const errors = typeof (validateHandler) === 'function' ? validateHandler(values) : {};

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else if (typeof (onSubmitHandler) === 'function') {
            onSubmitHandler(values, token)
                .then((response) => {
                    if (response) {
                        setValues(initialValues);
                    }
                })
                .catch((error) => {
                    errors.submit = error.message;
                    setFormErrors(errors);
                })
        }
    };

    const changeValues = (newValues) => {
        // validate newValues shape (like initialValues)
        const updatedValues = { ...initialValues };
        Object.keys(updatedValues).forEach(key => updatedValues[key] = newValues[key]);

        setValues(updatedValues);
    };

    return {
        values,
        formErrors,
        changeHandler,
        onSubmit,
        changeValues,
    };
};