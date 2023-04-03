import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { validationHelper } from '../../utils/validationHelper';

export const Register = () => {
    const { onRegister } = useContext(AuthContext);
    const { values, formErrors, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        confirmPassword: '',
    }, onRegister, validationHelper.validateRegister);

    return (
        <section >
            <form id="register" method="post" onSubmit={onSubmit}>
                <div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="someone@email.com"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    {formErrors.email &&
                        <p className="form-error">
                            {formErrors.email}
                        </p>
                    }

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                    {formErrors.password &&
                        <p className="form-error">
                            {formErrors.password}
                        </p>
                    }

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        value={values.confirmPassword}
                        onChange={changeHandler}
                    />
                    
                    {formErrors.confirmPassword &&
                        <p className="form-error">
                            {formErrors.confirmPassword}
                        </p>
                    }

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have a profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>

    );
};