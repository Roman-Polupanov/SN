import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';

const App = (props) => {



  return (

    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Route exact path='/profile'>
          <Profile
          // store={props.store}
          />
        </Route>
        <Route exact path='/dialogs'>
          <DialogsContainer
          // store={props.store}
          />
        </Route>
        <Route exact path='/news'>
          <News />
        </Route>
        <Route exact path='/music'>
          <Music />
        </Route>
        <Route exact path='/settings'>
          <Settings />
        </Route>

        <Route exact path='/users'>
          <UsersContainer />
        </Route>
      </div>
    </div>


  );
}

export default App;
