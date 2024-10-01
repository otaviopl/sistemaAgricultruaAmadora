// src/components/LocationPage.js
import React, { useState, useRef } from 'react';
import './location.css'
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places']; // Carregar a biblioteca de 'places'

const LocationPage = ({ onLocationSubmit }) => {
  const [location, setLocation] = useState('');
  const autocompleteRef = useRef(null);

  // Carregar o script do Google Maps Places
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Certifique-se de que essa chave seja configurada em um arquivo .env
    libraries,
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setLocation(place.formatted_address);
      onLocationSubmit(place.formatted_address);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onLocationSubmit(location);
    }
  };

  if (!isLoaded) return <div>Carregando...</div>;

  return (
    <div className="location-container">
      <h2 className="location-title">Informe sua Localização</h2>
      <form onSubmit={handleSubmit} className="location-form">
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Digite sua cidade ou coordenadas"
            className="location-input"
          />
        </Autocomplete>
        <button type="submit" className="location-button">Buscar Dados Climáticos</button>
      </form>
    </div>
  );
};

export default LocationPage;
