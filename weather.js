const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '';

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function formatRainTime(value) {
  return new Date(value).toLocaleString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function buildRainForecast(hourly) {
  if (!hourly?.time?.length) {
    return {
      will_rain: false,
      next_rain: null,
      message: 'Previsions de pluie indisponibles',
      hourly: []
    };
  }

  const now = Date.now();
  const hourlyForecast = hourly.time
    .map((time, index) => {
      const probability = toNumber(hourly.precipitation_probability?.[index]);
      const precipitation = toNumber(hourly.precipitation?.[index]);

      return {
        time,
        label: formatRainTime(time),
        precipitation_probability: probability,
        precipitation,
        will_rain: precipitation > 0 || probability >= 50
      };
    })
    .filter((item) => new Date(item.time).getTime() >= now)
    .slice(0, 48);

  const nextRain = hourlyForecast.find((item) => item.will_rain);

  return {
    will_rain: Boolean(nextRain),
    next_rain: nextRain || null,
    message: nextRain
      ? `Pluie probable ${nextRain.label} (${nextRain.precipitation_probability}%, ${nextRain.precipitation} mm)`
      : 'Pas de pluie prevue dans les prochaines 48 heures',
    hourly: hourlyForecast.slice(0, 12)
  };
}

function buildHourlyForecast(hourly) {
  if (!hourly?.time?.length) {
    return [];
  }

  const now = Date.now();
  return hourly.time
    .map((time, index) => ({
      time,
      label: formatRainTime(time),
      temperature: toNumber(hourly.temperature_2m?.[index]),
      humidity: toNumber(hourly.relative_humidity_2m?.[index]),
      wind_speed: toNumber(hourly.wind_speed_10m?.[index]),
      precipitation_probability: toNumber(hourly.precipitation_probability?.[index]),
      precipitation: toNumber(hourly.precipitation?.[index]),
      rain: toNumber(hourly.rain?.[index])
    }))
    .filter((item) => new Date(item.time).getTime() >= now)
    .slice(0, 72);
}

function buildDailyForecast(daily) {
  if (!daily?.time?.length) {
    return [];
  }

  return daily.time.map((time, index) => ({
    date: time,
    label: new Date(`${time}T12:00:00`).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit'
    }),
    temperature_min: toNumber(daily.temperature_2m_min?.[index]),
    temperature_max: toNumber(daily.temperature_2m_max?.[index]),
    precipitation_probability_max: toNumber(daily.precipitation_probability_max?.[index]),
    precipitation_sum: toNumber(daily.precipitation_sum?.[index]),
    wind_speed_max: toNumber(daily.wind_speed_10m_max?.[index])
  }));
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Requete echouee (${response.status})`);
  }

  return response.json();
}

async function getCoordinates(city) {
  const data = await fetchJson(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`
  );

  if (!data.results || data.results.length === 0) {
    throw new Error('Ville non trouvee');
  }

  const result = data.results[0];
  return { lat: result.latitude, lon: result.longitude, name: result.name };
}

async function getWeatherFromOpenMeteo(lat, lon) {
  const data = await fetchJson(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,rain&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max&forecast_days=3&timezone=auto&temperature_unit=celsius`
  );
  const current = data.current;

  return {
    temperature: toNumber(current.temperature_2m),
    humidity: toNumber(current.relative_humidity_2m),
    wind_speed: toNumber(current.wind_speed_10m),
    precipitation: toNumber(current.precipitation),
    rain: toNumber(current.rain),
    rain_forecast: buildRainForecast(data.hourly),
    hourly_forecast: buildHourlyForecast(data.hourly),
    daily_forecast: buildDailyForecast(data.daily),
    source: 'Open-Meteo'
  };
}

async function getWeatherFromWttr(city) {
  const data = await fetchJson(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
  const current = data.current_condition?.[0];

  if (!current) {
    throw new Error('Donnees wttr.in indisponibles');
  }

  return {
    temperature: toNumber(current.temp_C),
    humidity: toNumber(current.humidity),
    wind_speed: toNumber(current.windspeedKmph),
    source: 'wttr.in'
  };
}

async function getWeatherFromWeatherAPI(lat, lon) {
  if (!WEATHER_API_KEY) {
    return null;
  }

  try {
    const data = await fetchJson(
      `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(WEATHER_API_KEY)}&q=${lat},${lon}&aqi=no`
    );

    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      temperature: toNumber(data.current.temp_c),
      humidity: toNumber(data.current.humidity),
      wind_speed: toNumber(data.current.wind_kph),
      source: 'WeatherAPI'
    };
  } catch (error) {
    return null;
  }
}

exports.handler = async (event) => {
  try {
    const city = decodeURIComponent(event.queryStringParameters?.city || '').trim();

    if (!city) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ville obligatoire' })
      };
    }

    const coords = await getCoordinates(city);
    const weatherData = [];

    try {
      weatherData.push(await getWeatherFromOpenMeteo(coords.lat, coords.lon));
    } catch (error) {
      console.log('Erreur Open-Meteo:', error.message);
    }

    try {
      weatherData.push(await getWeatherFromWttr(city));
    } catch (error) {
      console.log('Erreur wttr.in:', error.message);
    }

    const wapiData = await getWeatherFromWeatherAPI(coords.lat, coords.lon);
    if (wapiData) {
      weatherData.push(wapiData);
    }

    if (weatherData.length === 0) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Impossible de recuperer les donnees meteo' })
      };
    }

    const avgTemp = weatherData.reduce((sum, w) => sum + w.temperature, 0) / weatherData.length;
    const avgHumidity = weatherData.reduce((sum, w) => sum + w.humidity, 0) / weatherData.length;
    const avgWindSpeed = weatherData.reduce((sum, w) => sum + w.wind_speed, 0) / weatherData.length;
    const rainSource = weatherData.find((w) => w.rain_forecast);
    const forecastSource = weatherData.find((w) => w.hourly_forecast || w.daily_forecast);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_version: 3,
        city: coords.name,
        temperature: Math.round(avgTemp * 10) / 10,
        humidity: Math.round(avgHumidity),
        wind_speed: Math.round(avgWindSpeed * 10) / 10,
        rain_now: rainSource ? Math.round((rainSource.rain + rainSource.precipitation) * 10) / 10 : 0,
        rain_summary: rainSource?.rain_forecast || null,
        daily_forecast: forecastSource?.daily_forecast || [],
        hourly_forecast: forecastSource?.hourly_forecast || rainSource?.rain_forecast?.hourly || [],
        sources: weatherData.map((w) => w.source),
        detailed_data: weatherData
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
