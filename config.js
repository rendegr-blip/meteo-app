// Configuration du serveur meteo
module.exports = {
  // Port du serveur Express
  PORT: process.env.PORT || 3001,
  
  // Configuration des APIs
  APIS: {
    OPEN_METEO: {
      enabled: true,
      baseUrl: 'https://api.open-meteo.com/v1',
      timeout: 5000
    },
    WTTR_IN: {
      enabled: true,
      baseUrl: 'https://wttr.in',
      timeout: 5000
    },
    WEATHER_API: {
      enabled: Boolean(process.env.WEATHER_API_KEY),
      baseUrl: 'https://api.weatherapi.com/v1',
      apiKey: process.env.WEATHER_API_KEY || '',
      timeout: 5000
    }
  },
  
  // Configuration CORS
  CORS: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  },
  
  // Paramètres de geo-codage
  GEOCODING: {
    baseUrl: 'https://geocoding-api.open-meteo.com/v1',
    timeout: 5000
  }
};
