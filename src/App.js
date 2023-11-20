import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stock from './components/Stock';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Stock />} />
      </Routes>
    </Router>
  );
}

export default App;