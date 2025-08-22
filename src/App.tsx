import { useRef } from 'react';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CityList from './components/CityList';
import LoadingSpinner from './components/LoadingSpinner';
import MainCity from './components/MainCity';
import { useWeatherAPI } from './hooks/useWeatherAPI';
import { elementContext } from './context/ElementContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import CurrentWeather from './components/CurrentWeather';
import Bookmark from './assets/icons/bookmark.svg?react';

export interface City {
  cityInfo: [name: string, region: string, country: string, coordinate: string];
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
  const [hour, setHour] = useState(-1);
  const [refresh, setRefresh] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  // no need to specify the type for the set function as react does that automatically
  const { error, setError, SearchWeather } = useWeatherAPI(setLoading);
  // destructuring uses keys not order, it can take more variables than it is defined in one statement

  const { error: refreshError, SearchWeather: RefreshSearchWeather } =
    useWeatherAPI(setRefresh);

  useEffect(() => {
    const interval = setInterval(() => {
      const hours = new Date().getHours();
      if (hours !== hour) {
        setHour(hours);
      }
    }, 60000);

    return clearInterval(interval);
  }, []);
  // even when setInterval is assigned to a const, it still runs
  // use return in useEffect to clear intervals when component unmounts

  useEffect(() => {
    const UpdateWeather = async () => {
      setRefresh(true);
      const newList = await Promise.all(
        cityList.map((city) => RefreshWeather(city))
      );
      setCityList(newList);
    };
    UpdateWeather();
  }, [hour]);
  // Promise.all to await for all promise is the array to complete
  // also, when using async functions, you need to call them...somewhere
  // need to use await to wait for SearchWeather to complete

  async function RefreshWeather(city: City) {
    if (city.cityInfo[3]) {
      const newWeather = await RefreshSearchWeather(city.cityInfo[3]);
      city.weather = newWeather;
    } else {
      const newWeather = await RefreshSearchWeather(city.cityInfo[0]);
      city.weather = newWeather;
    }
    return city;
  }

  const prevLengthRef = useRef(cityList.length);

  useEffect(() => {
    const currentLength = cityList.length;
    const prevLength = prevLengthRef.current;

    if (currentLength <= prevLength) {
      const chosenCity = cityList.find((city) => city.id === selectedElementId);
      setSelectedCity(chosenCity);
    }
    prevLengthRef.current = currentLength;

    const element = document.getElementById(`${selectedElementId}`);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [selectedElementId, cityList.length]);
  // you cannot use an array that change sizes for dependencies

  const HandleSave = () => {
    if (cityList.length >= 10) {
      setError('You cannot have more than 10 cities in your list');
    } else if (searchResult && !cityList.includes(searchResult)) {
      setCityList((prev) => [...prev, searchResult]);
      setSelectedElementId(searchResult.id);
      setSavedMessage(true);
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
      const result = await SearchWeather(coordinate);
      const resultLocation: [string, string, string, string] = [
        name,
        result.location.region,
        result.location.country,
        coordinate,
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

  useEffect(() => {
    if (error) {
      setErrorMessage(`Error: ${error}`);
    } else if (refreshError) {
      setErrorMessage(`Error while refreshing: ${error}`);
    } else {
      setErrorMessage(null);
    }
  }, [error, refreshError]);

  useEffect(() => {
    if (loading) {
      setLoadingMessage('Loading');
    } else if (refresh) {
      setLoadingMessage('Refreshing');
    } else {
      setLoadingMessage(null);
    }
  }, [loading, refresh]);

  useEffect(() => setSavedMessage(false), [loading, selectedCity]);

  return (
    <div className="bg-white font-[lufga]">
      <div className="grid lg:grid-cols-[400px_minmax(720px,1440px)] grid-rows-[40px_minmax(984px,_1fr)]">
        <div className="col-start-1 row-start-2 bg-[#f8f9fa] rounded-[20px] shadow-[10px_10px_10px_0_rgba(0,0,0,0.2)]">
          <div className="m-[20px]">
            <div className="w-[360px] h-[360px] bg-amber-200"></div>
          </div>
          <div className="flex flex-col items-center w-[320px] h-[520px] mt-[40px] mx-[40px] bg-[#F4F5F7] rounded-[20px] font-medium text-[16px] border border-[#adb5bd] shadow-[inset_2px_2px_5px_0_rgba(0,0,0,0.2)]">
            <div className="flex justify-center items-center w-[280px] min-h-[40px] m-[20px] bg-[#F8F9FA] border border-[#adb5bd] rounded-[20px] font-semibold shadow-[2px_2px_10px_0_rgba(0,0,0,0.2)]">
              Saved Cities
            </div>
            {cityList.length !== 0 && (
              <div className="flex items-start w-[280px] max-h-[480px] overflow-y-auto scrollbar1 border border-[#adb5bd] rounded-[20px]">
                <elementContext.Provider
                  value={{ selectedElementId, setSelectedElementId }}
                >
                  <CityList cityList={cityList} HandleDelete={HandleDelete} />
                </elementContext.Provider>
              </div>
            )}
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
            {errorMessage && (
              <div className={'w-1/2 mt-[20px] font-semibold text-[#cc3300]'}>
                {errorMessage}
              </div>
            )}
            {!errorMessage && (
              <>
                <div
                  className={`w-1/2 mt-[20px] ${loadingMessage ? 'font-semibold text-[#7ADAA5]' : 'font-light italic text-black'}`}
                >
                  {loadingMessage ? (
                    <div className="flex flex-row items-center">
                      <span>
                        <LoadingSpinner />
                      </span>
                      <span className="ml-[10px]">{loadingMessage}</span>
                    </div>
                  ) : (
                    'pro tip: you can save cities and select them from the list in the left to view them'
                  )}
                </div>
              </>
            )}
          </div>
          <div className="relative mt-[120px] mx-[40px]">
            {selectedCity && (
              <div className="absolute top-[-40px] left-0 border-t border-l border-r rounded-t-[10px] border-[#adb5bd] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.2)]">
                <div className="w-full h-[40px] relative flex px-[40px] justify-center items-center">
                  {savedMessage && (
                    <div className="absolute top-[-30px] w-fit mx-auto text-amber-500 font-semibold">
                      Saved!
                    </div>
                  )}
                  <div className="font-medium">{selectedCity.cityInfo[0]}</div>
                  {!cityList.includes(selectedCity) && (
                    <button className="ml-[5px]" onClick={HandleSave}>
                      <Bookmark
                        className={`stroke-[#495057] hover:stroke-amber-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-120 ${savedMessage ? 'stroke-amber-500 fill-amber-500' : ''}`}
                      />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="border border-[#adb5bd] bg-[#f8f9fa] relative h-[580px] rounded-b-[20px] rounded-tr-[20px] font-medium shadow-[10px_10px_10px_0_rgba(0,0,0,0.2)]">
              {selectedCity && <MainCity selectedCity={selectedCity} />}
            </div>
          </div>
        </div>
      </div>
    </div>
    // SVG attributes override CSS properties - remove stroke="currentColor" from SVG to let
    // Tailwind stroke-* classes work

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
