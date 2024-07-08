import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
      <Route path='/' element={<Home />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
