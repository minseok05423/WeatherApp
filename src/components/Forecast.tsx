import React from 'react';
import type { City } from '../App';
import ForecastCard from './ForecastCard';

export type Forecast = City['weather']['forecast']['forecastday'];

const Forecast = ({ selectedCity }: { selectedCity: City }) => {
  // dont! forget proper destructuring
  return (
    <div className="h-[240px] m-[20px] flex flex-row gap-[20px] overflow-x-auto rounded-[10px] bg-[#f8f9fa]">
      {selectedCity.weather.forecast.forecastday.map(
        (forecastday: Forecast, index: number) => (
          <ForecastCard key={index} forecast={forecastday} />
        )
      )}
    </div>
  );
};

export default Forecast;
