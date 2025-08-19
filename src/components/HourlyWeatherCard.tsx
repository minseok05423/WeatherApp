import React from 'react';
import type { City } from '../App';
import { GetWeatherIcon } from '../utils/weatherIcon';
import { FormatTime } from './MainCity';
import Temp from '../assets/icons/celcius.svg?react';
import Humidity from '../assets/icons/liquid-drop.svg?react';
import Wind from '../assets/icons/crosswinds.svg?react';

type HourWeather =
  City['weather']['forecast']['forecastday'][number]['hour'][number];

const HourlyWeatherCard = ({
  hourlyWeather,
}: {
  hourlyWeather: HourWeather;
}) => {
  return (
    <div className="flex flex-col min-w-[120px] items-center relative my-[10px]">
      {FormatTime(hourlyWeather.time)}
      <div className="absolute top-[30px] left-[20px] flex flex-col">
        <div className="flex flex-row items-center mb-[5px]">
          <Temp className="ml-[3px] mr-[2px]" />
          <div className="">{`${hourlyWeather.temp_c}°`}</div>
        </div>
        <div className="flex flex-row items-center mb-[5px]">
          <Humidity className="mr-[5px]" />
          <div className="">{`${hourlyWeather.humidity}%`}</div>
        </div>
        <div className="flex flex-row items-center mb-[5px]">
          <Wind className="mr-[5px]" />
          <div className="">{`${hourlyWeather.wind_kph}km/h`}</div>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeatherCard;
