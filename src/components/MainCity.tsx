import { type City } from '../App';
import React from 'react';
import { GetWeatherIcon } from '../utils/weatherIcon';
import Temp from '../assets/icons/celcius.svg?react';
import Humidity from '../assets/icons/liquid-drop.svg?react';
import Wind from '../assets/icons/crosswinds.svg?react';
import DayWeather from './DayWeather';
import Forecast from './Forecast';

export const FormatTime = (time: string) => {
  const hourMin = time.split(' ')[1];
  const hour = Number(hourMin.slice(0, 2));
  if (hour > 12) {
    return `${hour % 12}PM`;
  }
  return `${hour}AM`;
};

const MainCity = ({ selectedCity }: { selectedCity: City }) => {
  // dont forget proper prop types
  if (!selectedCity) {
    return <div>No city selected</div>;
    // redundant code maybe remove it later
  }

  return (
    <>
      <div className="flex flex-row items-end">
        <div className="w-fit m-[20px] px-[40px] h-[80px] flex justify-center items-center rounded-[20px] bg-white">
          <div className="flex flex-row items-center">
            <div className="font-semibold text-[32px]">
              {FormatTime(selectedCity.weather.location.localtime)}
            </div>
            <div className="font-semibold text-[32px] mx-[10px]">
              {selectedCity.weather.current.condition.text}
            </div>
            <div>
              {React.createElement(
                GetWeatherIcon(
                  selectedCity.weather.current.condition.code,
                  selectedCity.weather.current.condition.text
                ),
                { className: 'w-[40px] h-[40px]' }
              )}
            </div>
          </div>
        </div>
        <div className="w-fit my-[20px] px-[15px] h-[40px] flex justify-center items-center bg-white rounded-[20px] font-medium text-[16px]">
          <div className="flex flex-row items-center mx-[5px]">
            <Temp className="mr-[5px]" />
            <div className="">{`${selectedCity.weather.current.temp_c}°`}</div>
          </div>
          <div className="flex flex-row items-center mx-[5px]">
            <Humidity className="mr-[5px]" />
            <div className="">{`${selectedCity.weather.current.humidity}%`}</div>
          </div>
          <div className="flex flex-row items-center mx-[5px]">
            <Wind className="mr-[5px]" />
            <div className="">{`${selectedCity.weather.current.wind_kph}km/h`}</div>
          </div>
        </div>
      </div>
      <DayWeather selectedCity={selectedCity} />
      <Forecast selectedCity={selectedCity} />
    </>
  );
};

export default MainCity;
