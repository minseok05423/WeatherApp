import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import SearchBar from './components/SearchBar';
import CityList from './components/CityList';
import LoadingSpinner from './components/LoadingSpinner';
import MainCity from './components/MainCity';
import { useWeatherAPI } from './hooks/useWeatherAPI';
import { elementContext } from './context/ElementContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import CurrentWeather from './components/CurrentWeather';
import Bookmark from './assets/icons/bookmark.svg?react';
import Map from './components/Map';
import { useReverseGeocoding } from './hooks/useReverseGeocoding';

export interface City {
  cityInfo: [name: string, region: string, country: string, coordinate: string];
  id: number;
  weather: any;
  // JSON APIs can return various structures, but your specific API returns predictable data.
  //  Define interfaces that match your API response structure for better type safety.
}

const libraries: 'places'[] = ['places'];
// Static array prevents "LoadScript reloaded unintentionally" performance warnings
// o.w. it would load the libraries every re-render
// Literal type 'places'[] restricts to valid Google Maps libraries vs generic string[]

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: libraries,
  });
  // if i were to make a hook, i would have had to make a function, not just export a variable

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
  const [geoLoaded, setGeoLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // no need to specify the type for the set function as react does that automatically
  const { error, setError, SearchWeather } = useWeatherAPI(setLoading);
  // Destructuring extracts properties by name, not position

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
      if (cityList.length !== 0) {
        setRefresh(true);
        const newList = await Promise.all(
          cityList.map((city) => RefreshWeather(city))
        );
        setCityList(newList);
      }
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
    if (name && id) {
      let result;
      // define it outside the if statements to use in the outer scope
      if (coordinate) {
        result = await SearchWeather(coordinate);
      } else {
        result = await SearchWeather(name);
        coordinate = `${result.location.lat} ${result.location.lon}`;
      }
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

  useEffect(() => {
    const timer = setTimeout(() => setGeoLoaded(true), 2000);
    return clearTimeout(timer);
  }, []);

  const { ReverseGeocoding } = useReverseGeocoding(setError);

  useEffect(() => {
    if (selectedLocation) {
      setLoading(true);
      (async () => {
        const lat = Number(selectedLocation?.split(' ')[0]);
        const lng = Number(selectedLocation?.split(' ')[1]);
        const location = await ReverseGeocoding(lat, lng);
        const locationName =
          location.results?.[3]?.formatted_address ??
          location.results?.[4]?.formatted_address ??
          location.results?.[5]?.formatted_address ??
          'Unknown location';
        HandleSearchValue(locationName, selectedLocation, Date.now());
      })();
    }
  }, [selectedLocation]);

  return (
    <div className="bg-white font-[lufga]">
      <div className="grid lg:grid-cols-[400px_minmax(720px,1440px)] grid-rows-[40px_minmax(984px,_1fr)]">
        <div className="col-start-1 row-start-2 bg-[#f8f9fa] rounded-[20px] shadow-[10px_10px_10px_0_rgba(0,0,0,0.2)]">
          <div className="m-[20px] border border-[#adb5bd] rounded-[20px] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.2)]">
            {geoLoaded && ( 
              <Map
                props={isLoaded}
                position={
                  selectedCity ? selectedCity.cityInfo[3] : currentLocation
                }
                selectedLocation={(coordinate) =>
                  setSelectedLocation(coordinate)
                }
              />
            )}
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
            <CurrentWeather
              onGeoComplete={(formattedCoordinates) => {
                setGeoLoaded(true);
                setCurrentLocation(formattedCoordinates);
              }}
            />
            <div className="w-full h-[80px] my-[40px] flex justify-center items-center font-semibold text-[64px]">
              Weathering With you
            </div>
            <div className="shrink-0 w-full flex justify-center">
              <div className="min-w-1/2 h-[40px] mx-1/5 flex justify-center items-center">
                <SearchBar
                  searchValue={HandleSearchValue}
                  setLoading={setLoading}
                  props={{ isLoaded }}
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
                  className={`min-w-1/2 mt-[20px] ${loadingMessage ? 'font-semibold text-[#7ADAA5]' : 'font-light italic text-black'}`}
                >
                  {loadingMessage ? (
                    <div className="flex flex-row items-center">
                      <span>
                        <LoadingSpinner />
                      </span>
                      <span className="ml-[10px]">{loadingMessage}</span>
                    </div>
                  ) : (
                    <>
                      pro tip:
                      <span className="font-medium"> ctrl + scroll</span> to
                      zoom in and out of the map and
                      <span className="font-medium"> click</span> to select the
                      location in the map
                    </>
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

    // min-h prevents text line-height from collapsing container height
    // Text with small line-height can make containers shorter than expected
    // min-h ensures containers maintain minimum visual height

    // shrink-0 + w-full combination overrides flex item shrinking
    // flex items shrink by default when space is limited
    // shrink-0 prevents unwanted compression of important elements

    // w-fit creates tight-fitting containers around content
    // Container width matches content width exactly
    // Prevents unnecessary whitespace around text/elements
    // Useful for buttons, tags, and dynamic content sizing

    // logic to hide spinner when loading is false
    //.find might not be able to find such object and thus, return undefined
  );
};

export default App;
