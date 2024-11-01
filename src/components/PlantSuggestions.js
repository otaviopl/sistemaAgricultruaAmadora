const PlantSuggestions = {
    getSuggestions: (temperature, humidity, windSpeed, lat) => {
      if (lat >= -30 && lat <= 30) {
        if (temperature >= 25 && humidity >= 60 && windSpeed <= 5) {
          return ['Banana', 'Cana-de-açúcar', 'Café', 'Manga', 'Mamão'];
        }
        if (temperature >= 20 && temperature < 25) {
          return ['Tomate', 'Pepino', 'Abóbora', 'Pimentão', 'Berinjela'];
        }
        if (temperature < 20 && humidity >= 50) {
          return ['Alface', 'Espinafre', 'Couve', 'Brócolis', 'Rúcula'];
        }
      } else if (lat > 30 && lat <= 60) {
        if (temperature >= 20 && humidity >= 50 && windSpeed <= 10) {
          return ['Trigo', 'Cevada', 'Aveia', 'Milho', 'Soja'];
        }
        if (temperature < 20) {
          return ['Batata', 'Cenoura', 'Beterraba', 'Alho', 'Cebola'];
        }
      } else if (lat < -30) {
        if (temperature >= 20 && humidity >= 50) {
          return ['Milho', 'Soja', 'Feijão', 'Girassol', 'Amendoim'];
        }
        if (temperature < 20 && humidity >= 60) {
          return ['Chá', 'Ervilha', 'Repolho', 'Couve-flor', 'Mostarda'];
        }
      }
      return [];
    },
  };
  
  export default PlantSuggestions;
  