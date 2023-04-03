import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
    const { onLogin } = useContext(AuthContext);
    const { values, formErrors, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onLogin);

    return (
        <section>
            <form id="login" method="POST" onSubmit={onSubmit}>
                <div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="someone@gmail.com"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                    {formErrors.submit &&
                        <p className="form-error">
                            {formErrors.submit}
                        </p>
                    }

                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have a profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};