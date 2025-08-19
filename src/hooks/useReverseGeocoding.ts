const MAPS_API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY;

export function useReverseGeocoding(
  setLoading: (loading: boolean | null) => void,
  setError: (error: string | null) => void
) {
  const ReverseGeocoding = async (lat: number, lng: number) => {
    setError(null);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      // maybe i could add custom error messages

      const place = await response.json();

      return place;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'unknown error has occured';
      setError(message);
    }
  };
  return { ReverseGeocoding };
}
