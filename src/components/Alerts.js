// src/components/Alerts.js
import React from 'react';

const Alerts = () => {
  const alerts = [
    'Risco de praga de pulgões nos próximos 7 dias',
    'Doenças fúngicas possíveis devido à alta umidade',
  ];

  return (
    <div style={styles.container}>
      <h2>Alertas</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '45%',
    backgroundColor: '#fff5f5',
    color: '#d9534f',
  },
};

export default Alerts;
