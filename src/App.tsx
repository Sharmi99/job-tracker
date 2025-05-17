import React from 'react';
import './App.css';
import JobForm from './components/JobForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h2>Job Tracker</h2>
       <JobForm/>
      </header>
    </div>
  );
}

export default App;
