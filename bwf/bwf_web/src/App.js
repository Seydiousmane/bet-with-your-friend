import React from 'react';
/* import Group_list from './components/pages/group_list'; */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/pages/Header';


import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import LoginPage from './components/pages/Login';
import HomePage from './components/pages/HomePage';
import PrivateRoutes from './components/utils/PrivateRoutes';
import GroupDetail from './components/pages/GroupDetail';

function App() {
    
    return (
     
      <AuthProvider>
        <Header/>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<HomePage/>}/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/details/:id' element={<GroupDetail />} />
          
        </Routes>
      
        
        <Routes>
          
        </Routes>
        
      </AuthProvider>

    );
  
}

export default App;