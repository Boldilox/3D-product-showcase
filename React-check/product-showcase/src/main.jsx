import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CanPage from './pages/CanPage';
import AdminPage from './pages/AdminPage';
import BottlePage from './pages/Bottle';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/can" element={<CanPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/bottle" element={<BottlePage />} />
    </Routes>
  </BrowserRouter>
);
