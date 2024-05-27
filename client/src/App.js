// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataDisplay from './components/DataDisplay';
import Upload from './components/Upload';
import SubscriptionCalculator from './components/SubscriptionCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <a href="/upload">Upload CSV</a>
            </li>
            <li>
              <a href="/data">View Data</a>
            </li>
            <li>
              <a href="/calculator">Subscription Calculator</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/data" element={<DataDisplay />} />
          <Route path="/calculator" element={<SubscriptionCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
