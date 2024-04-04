import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './Login';
import Registration from './Registration';
import Main from './Main';
import CreateService from './CreateService';
import ServicesList from './ServicesList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/main" element={<Main />}/>
        <Route path="/create-service" element={<CreateService />}/>
        <Route path='/services-list' element={<ServicesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;