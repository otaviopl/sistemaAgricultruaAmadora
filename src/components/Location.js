// src/components/LocationPage.js
import React, { useState } from 'react';
import './location.css';

const LocationPage = ({ onLocationSubmit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onLocationSubmit(location); // Envia a localização para o componente pai
    }
  };

  return (
    <div className="location-container">
      <h2 className="location-title">Informe sua Localização</h2>
      <form onSubmit={handleSubmit} className="location-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Digite sua cidade ou coordenadas"
          className="location-input"
        />
        <button type="submit" className="location-button">Buscar Dados Climáticos</button>
      </form>
    </div>
  );
};

export default LocationPage;
