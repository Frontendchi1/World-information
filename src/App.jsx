import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import CountryDetails from './components/Home/CountryDetails/CountryDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
