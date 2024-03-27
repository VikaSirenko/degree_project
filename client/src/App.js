import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './Login';
import Registration from './Registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
