import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AuthContext } from './contexts/AuthContext';
import { authServiceFactory } from './services/authService';
import { sidewayServiceFactory } from './services/sidewayService';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { SidewaysList } from './components/Sideways/SidewaysList/SidewaysList';
import { Login } from './components/Auth/Login/Login';
import { Logout } from './components/Auth/Logout/Logout';
import { Register } from './components/Auth/Register/Register';
import { CreateSideway } from './components/Sideways/CreateSideway/CreateSideway';
import { SidewayDetails } from './components/Sideways/SidewayDetails/SidewayDetails';
import { EditSideway } from './components/Sideways/EditSideway/EditSideway';

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


  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);

      setAuth(result);

      navigate('/catalog');
    } catch (error) {
      console.log('Error on login');
    }
  };

  const onRegisterSubmit = async (values) => {
    const { confirmPassword, ...registerData } = values;
    if (confirmPassword !== registerData.password) {
      return;
    }

    try {
      const result = await authService.register(registerData);

      setAuth(result);

      navigate('/catalog');
    } catch (error) {
      console.log('Error on register');
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});
  };


  const onCreateSidewaySubmit = async (data) => {
    const newSideway = await sidewayService.create(data);

    setSideways(state => [...state, newSideway]);

    navigate('/catalog');
  };

  const onSidewayEditSubmit = async (values) => {
    const result = await sidewayService.edit(values._id, values);

    setSideways(state => state.map(x => x._id === values._id ? result : x));

    navigate(`/catalog/${values._id}`);
  };


  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
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
            <Route path='/catalog' element={<SidewaysList sideways={sideways} />} />
            <Route path='/catalog/create' element={<CreateSideway onCreateSidewaySubmit={onCreateSidewaySubmit} />} />
            <Route path='/catalog/:sidewayId' element={<SidewayDetails />} />
            <Route path='/catalog/:sidewayId/edit' element={<EditSideway onSidewayEditSubmit={onSidewayEditSubmit} />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
