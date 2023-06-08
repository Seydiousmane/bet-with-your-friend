import React from 'react';
import Group_list from './components/group_list';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Main from './components/main';



function App() {
    
    return (
      <div className='App'>
          <Header />
          <div className='main-content'>
            <Sidebar />
            <Main />
          </div>
      </div>
      
    );
  
}

export default App;