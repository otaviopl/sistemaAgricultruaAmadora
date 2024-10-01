// src/components/Recommendations.js
import React from 'react';

const Recommendations = () => {
  // Dados mockados
  const data = {
    plantio: 'Melhor período: Outubro - Novembro',
    irrigacao: 'Irrigação ideal: Manhãs e fins de tarde',
    colheita: 'Colheita: Janeiro - Fevereiro',
  };

  return (
    <div style={styles.container}>
      <h2>Recomendações</h2>
      <p><strong>Plantio:</strong> {data.plantio}</p>
      <p><strong>Irrigação:</strong> {data.irrigacao}</p>
      <p><strong>Colheita:</strong> {data.colheita}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '45%',
    backgroundColor: '#f9f9f9',
  },
};

export default Recommendations;
