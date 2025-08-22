import React from 'react';
import type { City } from '../App';
import HourWeatherCard from './HourlyWeatherCard';

const DayWeather = ({ selectedCity }: { selectedCity: City }) => {
  // proper destructuring to avoid type errors
  const currentHour = Number(
    selectedCity.weather.location.localtime.slice(11, 13)
  );
  const hourWeather = [];
  if (currentHour === 23) {
    for (let i = 0; i < 23; i++) {
      hourWeather.push(selectedCity.weather.forecast.forecastday[1].hour[i]);
    }
  } else {
    for (let i = currentHour + 1; i < 24; i++) {
      hourWeather.push(selectedCity.weather.forecast.forecastday[0].hour[i]);
    }
    for (let i = 0; i < currentHour + 1; i++) {
      hourWeather.push(selectedCity.weather.forecast.forecastday[1].hour[i]);
    }
  }

  return (
    <div className="flex flex-row mx-[20px] h-[140px] overflow-x-auto scrollbar2 rounded-[10px] bg-white border-t border-x border-[#adb5bd]">
      {hourWeather.map((hour, index) => (
        <React.Fragment key={index}>
          <div className="w-full h-full flex justify-end items-center">
            <div
              className={`w-full h-full ${index < 24 && index > 0 ? 'custom-border' : ''}`}
            />
          </div>
          <HourWeatherCard hourlyWeather={hour} />
        </React.Fragment>
      ))}
    </div>
  );
};
// use the full keyword for react fragments when adding in keys

export default DayWeather;
