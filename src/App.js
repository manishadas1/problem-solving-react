import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stock from './components/stock';
import Quotes from './components/Quotes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quotes/:symbol" element={<Quotes />} />
        <Route path="/" element={<Stock />} />
      </Routes>
    </Router>
  );
}

export default App;
