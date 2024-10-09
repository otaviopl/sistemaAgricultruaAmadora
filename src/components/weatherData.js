import React, { useState, useEffect } from 'react';

const WeatherInfo = ({ coordinates }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestedPlants, setSuggestedPlants] = useState([]);

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    if (coordinates) {
      const fetchWeatherData = async () => {
        try {
          const { lat, lng } = coordinates;

          // Chamada para a API do OpenWeatherMap para dados atuais
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
          );

          if (!weatherResponse.ok) {
            throw new Error('Erro ao obter os dados climáticos.');
          }

          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData);

          // Chamada para a API do OpenWeatherMap para previsão de 5 dias
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
          );

          if (!forecastResponse.ok) {
            throw new Error('Erro ao obter a previsão.');
          }

          const forecastData = await forecastResponse.json();
          setForecastData(forecastData);

          // Sugerir plantas com base em temperatura, umidade e vento
          suggestPlants(weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed, lat, lng);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchWeatherData();
    }
  }, [coordinates, apiKey]);

  const suggestPlants = (temperature, humidity, windSpeed, lat, lng) => {
    let plants = [];

    // Zonas de clima básico com base na latitude (pode ser melhorado)
    if (lat >= -30 && lat <= 30) {
      // Clima tropical
      if (temperature >= 25 && humidity >= 60 && windSpeed <= 5) {
        plants = ['Banana', 'Cana-de-açúcar', 'Café']; // Preferem calor e alta umidade
      } else if (temperature >= 20 && temperature < 25) {
        plants = ['Tomate', 'Pepino', 'Abóbora']; // Clima quente, mas menos úmido
      } else if (temperature < 20 && humidity >= 50) {
        plants = ['Alface', 'Espinafre', 'Couve']; // Preferem clima mais frio e úmido
      }
    } else if (lat > 30 && lat <= 60) {
      // Clima temperado
      if (temperature >= 20 && humidity >= 50 && windSpeed <= 10) {
        plants = ['Trigo', 'Cevada', 'Aveia']; // Preferem clima moderado e úmido
      } else if (temperature < 20) {
        plants = ['Batata', 'Cenoura', 'Beterraba']; // Preferem clima temperado frio
      }
    } else if (lat < -30) {
      // Clima subtropical e temperado do hemisfério sul
      if (temperature >= 20 && humidity >= 50) {
        plants = ['Milho', 'Soja', 'Feijão']; // Plantas típicas do sul
      } else if (temperature < 20 && humidity >= 60) {
        plants = ['Chá', 'Ervilha', 'Repolho']; // Clima mais frio e úmido
      }
    }

    setSuggestedPlants(plants);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData || !forecastData) {
    return <div>Carregando dados climáticos...</div>;
  }

  return (
    <div>
      <h2>Clima Atual para {weatherData.name}</h2>
      <p>Temperatura: {weatherData.main.temp} °C</p>
      <p>Condição: {weatherData.weather[0].description}</p>
      <p>Humidade: {weatherData.main.humidity}%</p>
      <p>Velocidade do vento: {weatherData.wind.speed} m/s</p>

      <h3>Previsão para os próximos 5 dias:</h3>
      <div>
        {forecastData.list.slice(0, 5).map((forecast, index) => (
          <div key={index}>
            <p>{new Date(forecast.dt * 1000).toLocaleDateString()}: {forecast.main.temp} °C, {forecast.weather[0].description}</p>
          </div>
        ))}
      </div>

      <h3>Plantas Sugeridas para o Clima Atual:</h3>
      <ul>
        {suggestedPlants.length > 0 ? (
          suggestedPlants.map((plant, index) => (
            <li key={index}>{plant}</li>
          ))
        ) : (
          <li>Não há sugestões para o clima atual.</li>
        )}
      </ul>
    </div>
  );
};

export default WeatherInfo;
