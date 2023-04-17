import React from 'react';
import './App.css';
import { Login } from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { MainRoutes } from './routes/MainRoutes';


function App() {
  return (
    <div className="App">
      <MainRoutes/>
    </div>
  );
}

export default App;
