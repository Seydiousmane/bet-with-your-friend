import React from 'react';
/* import Group_list from './components/pages/group_list'; */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/pages/header';
import Sidebar from './components/pages/sidebar';
import Main from './components/pages/main';

import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import LoginPage from './components/pages/login';
import HomePage from './components/pages/homePage';
import PrivateRoutes from './components/utils/PrivateRoutes';

function App() {
    
    return (
     
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<HomePage/>}/>
          </Route>
          
        </Routes>
      
        
        <Routes>
          
        </Routes>
        
      </AuthProvider>

    );
  
}

export default App;