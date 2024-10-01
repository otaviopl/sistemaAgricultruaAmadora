// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Sistema de Monitoramento para plantio amador</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#4CAF50',
    padding: '10px',
    textAlign: 'center',
    color: 'white',
    fontSize: '24px'
  }
};

export default Header;
