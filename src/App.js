import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AuthContext } from './contexts/AuthContext';

import { authServiceFactory } from './services/authService';
import { sidewayServiceFactory } from './services/sidewayService';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { SidewayList } from './components/SidewayList/SidewayList';
import { SidewayCreate } from './components/SidewayCreate/SidewayCreate';
import { SidewayDetails } from './components/SidewayDetails/SidewayDetails';
import { SidewayEdit } from './components/SidewayEdit/SidewayEdit';

import { initialCatalog } from './initialData';


function App() {
    // console.log('render App');

    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [sideways, setSideways] = useState([]);

    const authService = authServiceFactory(auth.accessToken);
    const sidewayService = sidewayServiceFactory(auth.accessToken);


    useEffect(() => {
        populateData()
            .then(() => {
                sidewayService.getAll()
                    .then(result => {
                        setSideways(result);
                    });
            });
    }, []);


    const populateData = async () => {
        try {
            // console.log('populateData ');

            const loginData = {
                email: 'peter@abv.bg',
                password: '123456'
            };

            let token = '';

            const loginResult = await authService.login(loginData);
            // console.log('login result:', loginResult);

            token = loginResult.accessToken;
            const sidewayService = sidewayServiceFactory(token);

            const count = await sidewayService.getCount();
            // console.log('count:', count);

            if (count === 0) {
                // console.log('add initial data');
                for (let data of initialCatalog) {
                    const createResult = await sidewayService.create(data);
                    // console.log('create result', createResult);
                }
            }

            // TODO: error on logout??
            //await authService.logout();
        }
        catch (error) {
            console.log(error);
        };
    };


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
            await authService.logout();

            setAuth({});
        }
        catch (error) {
            console.log('Error on logout', error);
        }
    };


    const onSidewayCreate = async (data) => {
        const newSideway = await sidewayService.create(data);

        setSideways(state => [newSideway, ...state]);

        navigate('/catalog');
    };

    const onSidewayEdit = async (values) => {
        const result = await sidewayService.edit(values._id, values);

        setSideways(state => state.map(x => x._id === values._id ? result : x));

        navigate(`/catalog/${values._id}`);
    };

    const onSidewayDelete = async (sidewayId) => {
        if(window.confirm('Are you sure you want to delete this sideway?')){
            await sidewayService.delete(sidewayId);
    
            setSideways(state => state.filter(x => x._id !== sidewayId));
    
            navigate('/catalog');
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
        <AuthContext.Provider value={contextValues}>
            <div className="App">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/catalog' element={<SidewayList sideways={sideways} />} />
                        <Route path='/catalog/create' element={<SidewayCreate onSidewayCreate={onSidewayCreate} />} />
                        <Route path='/catalog/:sidewayId' element={<SidewayDetails onSidewayDelete={onSidewayDelete} />} />
                        <Route path='/catalog/:sidewayId/edit' element={<SidewayEdit onSidewayEdit={onSidewayEdit} />} />
                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
