import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';

import { authServiceFactory } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();


export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService = authServiceFactory(auth.accessToken);
    
    const onLogin = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate('/catalog');
        } catch (error) {
            console.log('Error on login', error);
        }
    };

    const onRegister = async (values) => {
        // TODO move validation
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        }

        try {
            const result = await authService.register(registerData);

            setAuth(result);

            navigate('/catalog');
        } catch (error) {
            console.log('Error on register', error);
        }
    };

    const onLogout = async () => {
        try {
            console.log('try logout token', auth.accessToken);
            await authService.logout(auth.accessToken);

            setAuth({});
        }
        catch (error) {
            console.log('Error on logout', error);
        }
    };


    const contextValues = {
        onLogin,
        onRegister,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
