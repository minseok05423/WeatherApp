import React from 'react';
import type { Forecast } from './Forecast';
import Temp from '../assets/icons/celcius.svg?react';
import Humidity from '../assets/icons/liquid-drop.svg?react';
import RainProb from '../assets/icons/raining.svg?react';
import Sunrise from '../assets/icons/sunrise-arrow-up.svg?react';
import Sunset from '../assets/icons/sunset-arrow-down.svg?react';
import { GetWeatherIcon } from '../utils/weatherIcon';

const ForecastCard = ({ forecast }: { forecast: Forecast }) => {
  const date = forecast.date;

  return (
    <div className="border border-[#adb5bd] px-[20px] w-[160px] h-[270px] flex flex-col items-center relative rounded-[10px] bg-white shadow-[5px_5px_5px_5px_rgba(0,0,0,0.1)]">
      <div className="w-full h-[40px] flex justify-center items-center border-b border-[#ced4da]">
        {date}
      </div>
      <div className="my-[6px] flex flex-col">
        <div className="flex flex-row items-center mb-[5px]">
          {React.createElement(
            GetWeatherIcon(
              forecast.day.condition.code,
              forecast.day.condition.text
            ),
            { className: 'mr-[5px]' }
          )}
          <div className="">{`${forecast.day.condition.text}`}</div>
        </div>
        <div className="flex flex-row items-center mb-[5px]">
          <Temp className="ml-[3px] mr-[2px]" />
          <div className="">{`${forecast.day.mintemp_c}° ~ ${forecast.day.maxtemp_c}°`}</div>
        </div>
        <div className="flex flex-row items-center mb-[5px]">
          <RainProb className="mr-[5px]" />
          <div className="">{`${forecast.day.daily_chance_of_rain}%`}</div>
        </div>
        <div className="flex flex-row items-center mb-[5px]">
          <Humidity className="mr-[5px]" />
          <div className="">{`${forecast.day.avghumidity}%`}</div>
        </div>
        <div className="flex flex-row items-center mb-[5px]">
          <Sunrise className="mr-[5px]" />
          <div className="">{`${forecast.astro.sunrise}`}</div>
        </div>
        <div className="flex flex-row items-center mb-[5px]">
          <Sunset className="mr-[5px]" />
          <div className="">{`${forecast.astro.sunset}`}</div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
