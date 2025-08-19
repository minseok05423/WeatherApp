import { useContext, createContext } from 'react';

export const geoLoadingContext = createContext<{
  loading: boolean | null;
  setLoading: (loading: boolean | null) => void;
} | null>(null);

export function useGeoLoadingContext() {
  const context = useContext(geoLoadingContext);

  if (!context) {
    throw new Error(
      'useGeoLoadingContext must be used with a geoLoadingContext'
    );
  }
  return context;
}
