import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AuthProvider } from './contexts/AuthContext';

import { authServiceFactory } from './services/authService';
import * as sidewayService from './services/sidewayService';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { SidewayList } from './components/SidewayList/SidewayList';
import { SidewayCreate } from './components/SidewayCreate/SidewayCreate';
import { SidewayDetails } from './components/SidewayDetails/SidewayDetails';
import { SidewayEdit } from './components/SidewayEdit/SidewayEdit';
import { MyProfile } from './components/MyProfile/MyProfile';
import { NotFound } from './components/NotFound/NotFound';

import { initialCatalog } from './initialData';


function App() {
    const navigate = useNavigate();
    const [sideways, setSideways] = useState([]);

    useEffect(() => {
        populateData()
            .then(() => {
                return sidewayService.getAll();
            })
            .then(result => {
                setSideways(result);
            });
    }, []);


    const populateData = async () => {
        try {
            const loginData = {
                email: 'peter@abv.bg',
                password: '123456'
            };

            let token = '';
            const authService = authServiceFactory();
            const loginResult = await authService.login(loginData);

            token = loginResult.accessToken;
            const count = await sidewayService.getCount(token);

            if (count === 0) {
                for (let data of initialCatalog) {
                    await sidewayService.create(data, token);
                }
            }

            // TODO: error on logout??
            //await authService.logout();
        }
        catch (error) {
            console.log(error);
        };
    };


    const onSidewayCreate = async (data, token) => {
        const newSideway = await sidewayService.create(data, token);

        setSideways(state => [newSideway, ...state]);

        navigate('/catalog');
    };

    const onSidewayEdit = async (values, token) => {
        const result = await sidewayService.edit(values._id, values, token);

        setSideways(state => state.map(x => x._id === values._id ? result : x));

        navigate(`/catalog/${values._id}`);
    };

    const onSidewayDelete = async (sidewayId, token) => {
        if(window.confirm('Are you sure you want to delete this sideway?')){
            await sidewayService.deleteSideway(sidewayId, token);
    
            setSideways(state => state.filter(x => x._id !== sidewayId));
    
            navigate('/catalog');
        }
    };

    return (
        <AuthProvider>
            <div className="App">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/catalog' element={<SidewayList sideways={sideways} />} />
                        <Route path='/create' element={<SidewayCreate onSidewayCreate={onSidewayCreate} />} />
                        <Route path='/catalog/:sidewayId' element={<SidewayDetails onSidewayDelete={onSidewayDelete} />} />
                        <Route path='/catalog/:sidewayId/edit' element={<SidewayEdit onSidewayEdit={onSidewayEdit} />} />
                        {/* <Route path='/profile/*' element={ contextValues.isAuthenticated ? <MyProfile /> : <NotFound />} /> */}
                        <Route path='/profile/*' element={ <MyProfile /> } />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
