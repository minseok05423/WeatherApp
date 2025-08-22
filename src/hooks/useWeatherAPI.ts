import { useState } from 'react';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
// store API keys inside .env file

const forecastDays = 14;

export const useWeatherAPI = (
  setLoading: (loading: boolean | null) => void
) => {
  const [error, setError] = useState<string | null>(null);

  const SearchWeather = async (city: string | null) => {
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${forecastDays}&aqi=no&alerts=no`
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      // maybe i could add custom error messages

      setLoading(false);

      const weatherData = await response.json();

      return weatherData;
    } catch (error) {
      setLoading(false);

      const message =
        error instanceof Error ? error.message : 'unknown error has occured';
      setError(message);
    }
  };
  return { error, setError, SearchWeather };
};

export default useWeatherAPI;
