import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

export const Logout = () => {
    const { onLogout, token } = useContext(AuthContext);

    console.log('logout token: ', token);

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return (
        <Navigate to="/" />
    );
};