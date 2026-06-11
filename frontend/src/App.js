import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import PredictionCard from './components/PredictionCard';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/patients" component={PatientList} />
          <Route path="/add-patient" component={PatientForm} />
          <Route path="/predictions/:id" component={PredictionCard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

