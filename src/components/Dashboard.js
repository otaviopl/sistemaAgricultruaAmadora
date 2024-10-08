import React, { useState, useEffect } from 'react';

const Dashboard = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestedPlants, setSuggestedPlants] = useState([]);

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          // Chamada para a API de geocodificação do Google para obter lat e lng
          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          );
          
          if (!geocodeResponse.ok) {
            throw new Error('Erro ao obter as coordenadas da localização.');
          }
          
          const geocodeData = await geocodeResponse.json();
          const { lat, lng } = geocodeData.results[0].geometry.location;

          // Chamada para a API do OpenWeatherMap para dados climáticos atuais
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

          // Sugerir plantas com base na temperatura, umidade e vento
          suggestPlants(weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed, lat, lng);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchWeatherData();
    }
  }, [location, apiKey]);

  // Função para sugerir plantas com base em temperatura, umidade e velocidade do vento
  const suggestPlants = (temperature, humidity, windSpeed, lat, lng) => {
    let plants = [];

    // Zonas climáticas simples baseadas em latitude e condições
    if (lat >= -30 && lat <= 30) {
      if (temperature >= 25 && humidity >= 60 && windSpeed <= 5) {
        plants = ['Banana', 'Cana-de-açúcar', 'Café'];
      } else if (temperature >= 20 && temperature < 25) {
        plants = ['Tomate', 'Pepino', 'Abóbora'];
      } else if (temperature < 20 && humidity >= 50) {
        plants = ['Alface', 'Espinafre', 'Couve'];
      }
    } else if (lat > 30 && lat <= 60) {
      if (temperature >= 20 && humidity >= 50 && windSpeed <= 10) {
        plants = ['Trigo', 'Cevada', 'Aveia'];
      } else if (temperature < 20) {
        plants = ['Batata', 'Cenoura', 'Beterraba'];
      }
    } else if (lat < -30) {
      if (temperature >= 20 && humidity >= 50) {
        plants = ['Milho', 'Soja', 'Feijão'];
      } else if (temperature < 20 && humidity >= 60) {
        plants = ['Chá', 'Ervilha', 'Repolho'];
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
    <div style={styles.container}>
      <h1 style={styles.title}>Dados Climáticos para {location}</h1>

      <div style={styles.card}>
        <p>Temperatura: {weatherData.main.temp} °C</p>
        <p>Condição: {weatherData.weather[0].description}</p>
        <p>Humidade: {weatherData.main.humidity}%</p>
        <p>Velocidade do vento: {weatherData.wind.speed} m/s</p>
      </div>

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

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#4CAF50',
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default Dashboard;
