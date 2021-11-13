import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './screens/SignIn';

const Redirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return null;
};

const App = () => (
  <div className="hipstagram-app">
    <Routes>
      <Route exact path="/sign-in" element={<SignIn />} />
      <Route path="/" element={<Redirect to="/sign-in" />} />
    </Routes>
  </div>
);

export default App;
