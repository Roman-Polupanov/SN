import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './screens/SignUp';
import Feed from './screens/Feed';
import SignIn from './screens/SignIn';
import Header from './components/Header';
import './App.css';
import UserPage from './screens/UserPage';
import { Switch } from '@mui/material';

export const Redirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return null;
};

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigateToFeed = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setToken(authToken);
      navigate('feed');
    } else {
      console.log('user is not authorzied');
    }
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('login');
  };

  return (
    <div className="hipstagram-app">

      <Header onLogout={logout} />

      <Routes>
        <Switch>
          {
            token
              ? (
                <>
                  <Route exact path="/feed" element={<Feed />} />
                  <Route exact path="/profile/:login" element={<UserPage />} />
                </>
              )
              : (
                <>
                  <Route exact path="/login" element={<SignIn onSuccess={navigateToFeed} />} />
                  <Route exact path="/sign-up" element={<SignUp onSuccess={navigateToFeed} />} />
                </>
              )
          }

          <Route path="*" element={token ? <Redirect to="/feed" /> : <Redirect to="/login" />} />
        </Switch>
      </Routes>
    </div>
  );
};

export default App;
