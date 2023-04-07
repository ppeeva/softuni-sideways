import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import styles from '../Forms.module.css'

export const Login = () => {
    const { onLogin } = useContext(AuthContext);
    const { values, formErrors, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onLogin);

    return (
        <section>
            <form id="login" method="POST" onSubmit={onSubmit}>
                <div className={styles['form-container']}>
                    <h1 className={styles['form-title']}>Login</h1>

                    <div className={styles['form-row']}>
                        <label htmlFor="email" className={styles['form-label']}>Email:</label>
                        <div className={styles['form-field-holder']}>
                            <input
                                type="email"
                                id="email"
                                placeholder="someone@gmail.com"
                                name="email"
                                value={values.email}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <label htmlFor="login-pass" className={styles['form-label']}>Password:</label>
                        <div className={styles['form-field-holder']}>
                            <input
                                type="password"
                                id="login-password"
                                name="password"
                                value={values.password}
                                onChange={changeHandler}
                            />
                            {formErrors.submit &&
                                <p className={styles['form-error']}>
                                    {formErrors.submit}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <input type="submit" className={styles['submit-button']} value="Login" />
                    </div>

                    <p className={styles['form-text']}>
                        <span>If you don't have a profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};