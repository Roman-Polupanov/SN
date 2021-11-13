import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './screens/SignIn';
import Feed from './screens/Feed';

const Redirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return null;
};

const App = () => {
  const hasToken = Boolean(localStorage.getItem('authToken'));
  return (
    <div className="hipstagram-app">
      <Routes>
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/feed" element={<Feed />} />
        <Route path="/" element={hasToken ? <Redirect to="/feed" /> : <Redirect to="/sign-in" />} />
      </Routes>
    </div>
  );
};

export default App;
