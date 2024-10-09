import React, { useState, useRef } from 'react';
import './location.css';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const LocationPage = ({ onLocationSubmit }) => {
  const [location, setLocation] = useState('');
  const autocompleteRef = useRef(null);

  // Carrega o script do Google Maps com a API Key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Função chamada quando um lugar é selecionado no autocomplete
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setLocation(place.formatted_address);
      onLocationSubmit(place.formatted_address); // Envia a localização para o Dashboard
    }
  };

  // Lida com o envio do formulário caso o usuário submeta a localização manualmente
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onLocationSubmit(location); // Envia a localização para o Dashboard
    }
  };

  // Exibe mensagem de erro se a API falhar ao carregar
  if (loadError) return <div>Erro ao carregar o Google Maps</div>;
  
  // Exibe enquanto o script está carregando
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
