import React from 'react';

const Dashboard = ({ location }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dados Climáticos para {location}</h1>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#4CAF50',
  },
};

export default Dashboard;
