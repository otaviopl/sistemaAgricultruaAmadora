import React, { useState, useEffect } from 'react';
import { FaTemperatureHigh, FaCloudSun, FaWater, FaWind } from 'react-icons/fa';
import PlantSuggestions from './PlantSuggestions';
import PlantDetails from './PlantDetails'; // Novo componente de detalhes da planta
import './Dashboard.css';

const Dashboard = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestedPlants, setSuggestedPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null); // Nova planta selecionada
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    if (location) fetchWeatherAndForecast(location);
  }, [location]);

  const fetchWeatherAndForecast = async (location) => {
    try {
      const { lat, lng } = await fetchCoordinates(location);
      const weather = await fetchWeatherData(lat, lng);
      const forecast = await fetchForecastData(lat, lng);
      setWeatherData(weather);
      setForecastData(forecast);
      setSuggestedPlants(PlantSuggestions.getSuggestions(weather.main.temp, weather.main.humidity, weather.wind.speed, lat));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCoordinates = async (location) => {
    const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    if (!geocodeResponse.ok) throw new Error('Erro ao obter as coordenadas da localização.');
    const geocodeData = await geocodeResponse.json();
    return geocodeData.results[0].geometry.location;
  };

  const fetchWeatherData = async (lat, lng) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Erro ao obter os dados climáticos.');
    return response.json();
  };

  const fetchForecastData = async (lat, lng) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Erro ao obter a previsão.');
    return response.json();
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
  };

  if (error) return <div>{error}</div>;

  if (!weatherData || !forecastData) return <div className="loading">Carregando dados climáticos...</div>;

  return (
    <div className="container">
      <h1 className="title">Clima para Agricultores - {location}</h1>

      <div className="weather-card">
        <div className="icon-container">
          <FaTemperatureHigh size={40} className="icon" />
        </div>
        <p className="data-text">Temperatura: {weatherData.main.temp} °C</p>
        
        <div className="icon-container">
          <FaCloudSun size={40} className="icon" />
        </div>
        <p className="data-text">Condição: {weatherData.weather[0].description}</p>

        <div className="icon-container">
          <FaWater size={40} className="icon" />
        </div>
        <p className="data-text">Humidade: {weatherData.main.humidity}%</p>

        <div className="icon-container">
          <FaWind size={40} className="icon" />
        </div>
        <p className="data-text">Vento: {weatherData.wind.speed} m/s</p>
      </div>

      <h3 className="section-title">Previsão para os próximos 5 dias:</h3>
      <div className="forecast-container">
        {forecastData.list.slice(0, 5).map((forecast, index) => (
          <div key={index} className="forecast-card">
            <p className="date">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <p className="forecast-text">{forecast.main.temp} °C, {forecast.weather[0].description}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Plantas Sugeridas:</h3>
      <ul className="plants-list">
        {suggestedPlants.length > 0 ? (
          suggestedPlants.map((plant, index) => (
            <li key={index} className="plant-item" onClick={() => handlePlantClick(plant)}>{plant}</li>
          ))
        ) : (
          <li className="no-plants">Nenhuma sugestão disponível para o clima atual.</li>
        )}
      </ul>

      {selectedPlant && (
        <PlantDetails
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
