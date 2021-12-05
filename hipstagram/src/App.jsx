import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container, LinearProgress } from '@mui/material';
import SignUp from './screens/SignUp';
import Feed from './screens/Feed';
import SignIn from './screens/SignIn';
import Header from './components/Header';
import { useAuth } from './context/authContext';
import Profile from './screens/Profile';
import FindUsers from './screens/FindUsers';
import MyProfile from './screens/MyProfile';
import PostsList from './components/PostsList';
import Settings from './screens/Settings';

const Redirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return null;
};

const App = () => {
  const { loading, token } = useAuth();
  const renderPublicRoutes = () => (
    <>
      <Route exact path="/login" element={<SignIn />} />
      <Route exact path="/sign-up" element={<SignUp />} />
    </>
  );

  const renderPrivateRoutes = () => (
    <>
      <Route exact path="/feed" element={<Feed />} />
      <Route exact path="/all-posts" element={<PostsList usersIds={[]} onLikeClick={() => { }} />} />
      <Route path="/user/:id" element={<Profile />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/find" element={<FindUsers />} />
    </>
  );

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div className="hipstagram-app">
      <Header />
      <Container maxWidth="lg" style={{ paddingTop: 32 }}>
        <Routes>
          {token ? renderPrivateRoutes() : renderPublicRoutes()}
          <Route path="*" element={token ? <Redirect to="/my-profile" /> : <Redirect to="/login" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
