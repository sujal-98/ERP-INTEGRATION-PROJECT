import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PdfPreview from './pdf/PdfPreview';
import React from 'react';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/pdf-preview" element={<PdfPreview />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
