import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AuthContext } from './contexts/AuthContext';
import { authServiceFactory } from './services/authService';
import { sidewayServiceFactory } from './services/sidewayService';

import { Header } from './components/Header';
import { Home } from './components/Home';
import { SidewaysList } from './components/SidewaysList';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Register } from './components/Register';
import { CreateSideway } from './components/CreateSideway';
import { SidewayDetails } from './components/SidewayDetails';
import { EditSideway } from './components/EditSideway';

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [sideways, setSideways] = useState([]);

  const authService = authServiceFactory(auth.accessToken);
  const sidewayService = sidewayServiceFactory(auth.accessToken);

  useEffect(() => {
    sidewayService.getAll()
      .then(result => {
        setSideways(result);
      });
  }, []);

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);
      console.log('login result:', result);

      setAuth(result);
      console.log('auth after login', auth);

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
      console.log('There is a problem');
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
