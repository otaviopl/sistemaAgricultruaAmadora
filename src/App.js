// src/App.js
import React, { useState } from 'react';
import LocationPage from './components/Location';
import Dashboard from './components/Dashboard';

function App() {
  const [location, setLocation] = useState('');
  const [isDashboardVisible, setDashboardVisible] = useState(false);

  const handleLocationSubmit = (loc) => {
    setLocation(loc);
    setDashboardVisible(true); // Exibe a dashboard após a localização ser enviada
  };

  return (
    <div>
      {isDashboardVisible ? (
        <Dashboard location={location} />
      ) : (
        <LocationPage onLocationSubmit={handleLocationSubmit} />
      )}
    </div>
  );
}

export default App;
