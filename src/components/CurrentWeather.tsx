import React from 'react';
import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useWeatherAPI } from '../hooks/useWeatherAPI';
import { useReverseGeocoding } from '../hooks/useReverseGeocoding';
import { GetWeatherIcon } from '../utils/weatherIcon';
import GeoLoadingSpinner from './GeoLoadingSpinner';

const Temp = GetWeatherIcon(0, null);
const Humidity = GetWeatherIcon(3, null);
const Wind = GetWeatherIcon(2, null);

const CurrentWeather = () => {
  const [location, setLocation] = useState();
  const [locationWeather, setLocationWeather] = useState<any>();
  // do not! do this for type safety
  // need to change this in the future
  const {
    coordinates,
    geolocationError,
    setGeolocationError,
    geoLoading,
    setGeoLoading,
  } = useGeolocation();
  const { error, SearchWeather } = useWeatherAPI(setGeoLoading);
  const { ReverseGeocoding } = useReverseGeocoding(
    setGeoLoading,
    setGeolocationError
  );

  useEffect(() => {
    setGeoLoading(true);
    if (!geolocationError && coordinates) {
      ReverseGeocoding(coordinates[0], coordinates[1]).then(
        (city) => {
          setLocation(city.results[3].formatted_address);
        }
        // cant access a promise directly
        // you must use .then
      );
      // useWeatherAPI will automatically change the loading state to false when data is fetched
      SearchWeather(`${coordinates[0]}, ${coordinates[1]}`).then((data) =>
        setLocationWeather(data)
      );
    } else {
      setGeoLoading(false);
    }
  }, [coordinates, geolocationError]);

  return (
    <div className="w-full h-[40px] border rounded-[10px] flex justify-center items-center bg-[#f8f9fa] font-medium text-[16px] border-[#ced4da] shadow-[0_4px_4px_0_rgba(0,0,0,0.2)]">
      {geoLoading && (
        <div className="flex flex-row justify-center items-center">
          <div>
            <GeoLoadingSpinner />
          </div>
          <div className="ml-[-10px]">loading location info</div>
        </div>
      )}
      {!geoLoading && (
        <div className="flex flex-row w-full justify-center items-center">
          {locationWeather && (
            <>
              <div className="mr-[5px]">{`weather in your current location(${location}) is:`}</div>
              <div className="flex flex-row items-center mx-[5px]">
                <div className="mr-[5px]">
                  {React.createElement(
                    GetWeatherIcon(
                      locationWeather.current.condition.code,
                      locationWeather.current.condition.text
                    )
                  )}
                </div>
                <div className="">{`${locationWeather.current.condition.text}`}</div>
              </div>
              <div className="flex flex-row items-center mx-[5px]">
                <Temp className="mr-[5px]" />
                <div className="">{`${locationWeather.current.temp_c}°`}</div>
              </div>
              <div className="flex flex-row items-center mx-[5px]">
                <Humidity className="mr-[5px]" />
                <div className="">{`${locationWeather.current.humidity}%`}</div>
              </div>
              <div className="flex flex-row items-center mx-[5px]">
                <Wind className="mr-[5px]" />
                <div className="">{`${locationWeather.current.wind_kph}km/h`}</div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// when using conditional rendering for multiple elements, use react fragments to nest
// since useWeatherAPI is a hook, it cannot go inside useEffect

export default CurrentWeather;
