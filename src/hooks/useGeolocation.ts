import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<
    [lat: number, long: number] | null
  >(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState<boolean | null>(false);

  const options = {
    maximumAge: 10000,
    timeout: 5000,
    enableHighAccuracy: true,
  };

  function HandleSuccess(pos: GeolocationPosition) {
    setCoordinates([pos.coords.latitude, pos.coords.longitude]);
    setGeolocationError(null);
    setGeoLoading(false);
  }

  function HandleError(err: GeolocationPositionError) {
    const errorMessage =
      err instanceof Error ? err.message : 'unknown error has occured';
    setGeolocationError(errorMessage);
  }

  useEffect(() => {
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      HandleSuccess,
      HandleError,
      options
    );
    setInterval(() => {
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(
        HandleSuccess,
        HandleError,
        options
      );
    }, 600000);
  }, []);

  return {
    coordinates,
    geolocationError,
    setGeolocationError,
    geoLoading,
    setGeoLoading,
  };
}
