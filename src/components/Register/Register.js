import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { validationHelper } from '../../utils/validationHelper';

import styles from '../Forms.module.css';

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
                <div className={styles['form-container']}>
                    <h1 className={styles['form-title']}>Register</h1>

                    <div className={styles['form-row']}>
                        <label htmlFor="email" className={styles['form-label']}>Email:</label>
                        <div className={styles['form-field-holder']}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="someone@email.com"
                                value={values.email}
                                onChange={changeHandler}
                            />
                            {formErrors.email &&
                                <p className={styles['form-error']}>
                                    {formErrors.email}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <label htmlFor="pass" className={styles['form-label']}>Password:</label>
                        <div className={styles['form-field-holder']}>
                            <input
                                type="password"
                                name="password"
                                id="register-password"
                                value={values.password}
                                onChange={changeHandler}
                            />
                            {formErrors.password &&
                                <p className={styles['form-error']}>
                                    {formErrors.password}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <label htmlFor="con-pass" className={styles['form-label']}>Confirm Password:</label>
                        <div className={styles['form-field-holder']}>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirm-password"
                                value={values.confirmPassword}
                                onChange={changeHandler}
                            />
                            {formErrors.confirmPassword &&
                                <p className={styles['form-error']}>
                                    {formErrors.confirmPassword}
                                </p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-row']}>
                        <input className={styles['submit-button']} type="submit" value="Register" />
                    </div>

                    <p className={styles['form-text']}>
                        <span>If you already have a profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>

    );
};