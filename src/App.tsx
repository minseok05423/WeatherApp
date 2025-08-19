import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CityList from './components/CityList';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import MainCity from './components/MainCity';
import { useWeatherAPI } from './hooks/useWeatherAPI';
import { elementContext } from './context/ElementContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import CurrentWeather from './components/CurrentWeather';
import { GetWeatherIcon } from './utils/weatherIcon';
import Bookmark from './assets/icons/bookmark.svg?react';

export interface City {
  cityInfo: [name: string, region: string, country: string];
  id: number;
  weather: any;
  // json files contain various types, so unless specified, use any type
}

const App = () => {
  const [cityList, setCityList] = useLocalStorage<City[]>('cityList', []);
  const [searchResult, setSearchResult] = useState<City | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);

  // no need to specify the type for the set function as react does that automatically
  const { error, setError, searchWeather } = useWeatherAPI(setLoading);
  // destructuring uses keys not order, it can take more variables than it is defined in one statement

  const prevLengthRef = useRef(cityList.length);

  useEffect(() => {
    const currentLength = cityList.length;
    const prevLength = prevLengthRef.current;

    if (currentLength <= prevLength) {
      const chosenCity = cityList.find((city) => city.id === selectedElementId);
      setSelectedCity(chosenCity);
    }
    prevLengthRef.current = currentLength;
  }, [selectedElementId, cityList.length]);
  // you cannot use an array that change sizes for dependencies

  const HandleSave = () => {
    if (searchResult && !cityList.includes(searchResult)) {
      setCityList((prev) => [...prev, searchResult]);
      setSelectedElementId(searchResult.id);
    } else {
      setError('city already added');
    }
  };

  const HandleSearchValue = async (
    name: string | null,
    coordinate: string | null,
    id: number | null
  ) => {
    if (name && coordinate && id) {
      const result = await searchWeather(coordinate);
      const resultLocation: [string, string, string] = [
        name,
        result.location.region,
        result.location.country,
      ];

      setCityList((currentCityList) => {
        // very instructive point. in order to call cityList, which is outside HandleSearchValue,
        // we must use useState to see the current state
        // this is a classic javascript closure problem
        setError((currentError) => {
          if (currentError) {
            return currentError;
          } else if (
            currentCityList
              .map((city) => JSON.stringify(city.cityInfo))
              .includes(JSON.stringify(resultLocation))
          ) {
            return "The city you're looking for has already been added";
          } else {
            setSearchResult({
              cityInfo: resultLocation,
              id: id,
              weather: result,
            });
            setSelectedCity({
              cityInfo: resultLocation,
              id: id,
              weather: result,
            });
            return null;
          }
        });

        return currentCityList;
        // must put return at the end as set~() function cannot be a void function
      });
    } else {
      setError('location not found');
    }
  };

  const HandleDelete = (id: number) => {
    setCityList((prev) => prev.filter((city) => city.id !== id));
  };

  return (
    <div className="bg-white font-[lufga]">
      <div className="grid lg:grid-cols-[400px_minmax(720px,1440px)] grid-rows-[40px_minmax(984px,_1fr)]">
        <div className="col-start-1 row-start-2 bg-[#e9ecef] rounded-[20px]">
          <div className="m-[20px]">
            <div className="w-[360px] h-[360px] bg-amber-200"></div>
          </div>
          <div className="flex flex-col items-center w-[320px] h-[520px] mt-[40px] mx-[40px] bg-[#dee2e6] rounded-[20px] font-medium text-[16px] border border-[#adb5bd]">
            <div className="flex justify-center items-center w-[280px] min-h-[40px] m-[20px] bg-[#F8F9FA] border rounded-[20px]">
              Saved Cities
            </div>
            <div className="flex items-start w-[280px] max-h-[480px] overflow-y-auto scrollbar border border-[#adb5bd] rounded-[20px]">
              <elementContext.Provider
                value={{ selectedElementId, setSelectedElementId }}
              >
                <CityList cityList={cityList} HandleDelete={HandleDelete} />
              </elementContext.Provider>
            </div>
          </div>
        </div>
        <div className="col-start-2 row start-2 min-w-[1040px]">
          <div className="m-[40px] flex flex-col items-center">
            <CurrentWeather />
            <div className="w-full h-[80px] my-[40px] flex justify-center items-center font-semibold text-[64px]">
              Weathering With you
            </div>
            <div className="shrink-0 w-full flex justify-center">
              <div className="min-w-1/2 h-[40px] mx-1/5 flex justify-center items-center">
                <SearchBar
                  searchValue={HandleSearchValue}
                  setLoading={setLoading}
                />
              </div>
            </div>
            <div
              className={`w-1/2 mt-[20px] ${error ? 'font-semibold text-[#cc3300]' : 'font-light italic text-black'}`}
            >
              {error
                ? `Error: ${error}`
                : 'pro tip: you can save cities and select them from the list in the left to view them'}
            </div>
          </div>
          <div className="relative mt-[120px] mx-[40px]">
            {selectedCity && (
              <div className="absolute top-[-40px] left-0 border-t border-l border-r rounded-t-[10px] flex h-[40px] px-[40px] justify-center items-center shadow-[10px_10px_10px_0px_rgba(0,0,0,0.2)]">
                <div className="font-medium">{selectedCity.cityInfo[0]}</div>
                {!cityList.includes(selectedCity) && (
                  <button className="absolute right-[5px]" onClick={HandleSave}>
                    <Bookmark />
                  </button>
                )}
              </div>
            )}
            <div className="border border-[#adb5bd] bg-[#e9ecef] relative h-[540px] rounded-b-[20px] rounded-tr-[20px] font-medium shadow-[10px_10px_10px_0_rgba(0,0,0,0.2)]">
              {selectedCity && <MainCity selectedCity={selectedCity} />}
            </div>
          </div>
        </div>
      </div>
    </div>
    // line-height of a text could collapse the container
    // use min-h to override
    // shrink-0 + w-full to overrided the items-center shrink
    // w-fit to wrap the text perfectly

    // logic to hide spinner when loading is false
    //.find might not be able to find such object and thus, return undefined
  );
};

export default App;

// <div>
// <ErrorMessage error={error} />
// </div>
// <div>{loading && <LoadingSpinner />}</div>
