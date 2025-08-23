import { StandaloneSearchBox } from '@react-google-maps/api';
import { useState, useRef, useEffect } from 'react';

interface Search {
  searchValue: (
    name: string | null,
    coordinate: string | null,
    id: number | null
  ) => void;
  setLoading: (loading: boolean | null) => void;
  props: { isLoaded: boolean };
}

const SearchBar = ({ searchValue, setLoading, props }: Search) => {
  const [searchInput, setSearchInput] = useState('');
  const [isPlace, setIsPlace] = useState(false);
  const isPlaceRef = useRef(false);

  useEffect(() => {
    isPlaceRef.current = isPlace;
  }, [isPlace]);
  // useEffect and useRef for resolving stale closure

  const { isLoaded } = props;

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const onLoad = (ref: google.maps.places.SearchBox) =>
    (searchBoxRef.current = ref);

  const onPlacesChanged = () => {
    setLoading(true);
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      setIsPlace(true);
      const place = places[0];
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();
      const placeName = place.name || place.formatted_address;
      if (placeName) {
        setSearchInput('');
        searchValue(placeName, `${lat} ${lng}`, Date.now());
      }
      // Clear the places cache to prevent reuse
      // still dont understand google's caching
      if (searchBoxRef.current) {
        // Force clear by setting empty array (this might not work with Google's API)
        try {
          (searchBoxRef.current as any).set('places', []);
        } catch (e) {
          console.log('Could not clear places cache');
        }
      }
    } else {
      setTimeout(() => {
        const currentIsPlace = isPlaceRef.current;
        if (!currentIsPlace) {
          searchValue(null, null, null);
        }
        setSearchInput('');
        setIsPlace(false);
        setLoading(false);
      }, 500);
      // every component has its own state
      // to pass on errors, do it like this or use props
    }
  };

  const HandleManualSubmit = () => {
    if (searchInput.trim()) {
      setLoading(true);
      searchValue(searchInput, null, Date.now());
      setSearchInput('');
    }
  };

  return (
    <>
      <div>
        <label htmlFor="searchInput"></label>
      </div>
      <div className="w-full">
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="w-full relative">
              <input
                className="w-full h-[40px] rounded-[10px] border border-[#adb5bd] pl-[10px] pr-[130px]"
                type="text"
                id="searchInput"
                placeholder="search for cities, addresses, postal codes, etc."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <span className="flex flex-row justify-center items-center w-[120px] h-[40px] absolute top-0 right-0 rounded-[10px] border border-[#6c757d] font-medium italic">
                <button onClick={HandleManualSubmit}>search</button>
              </span>
            </div>
          </StandaloneSearchBox>
        )}
      </div>
    </>
  );
};

export default SearchBar;
