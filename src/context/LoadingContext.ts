import { useContext, createContext } from 'react';

export const loadingContext = createContext<{
  loading: boolean | null;
  setLoading: (loading: boolean | null) => void;
} | null>(null);

export function useLoadingContext() {
  const context = useContext(loadingContext);

  if (!context) {
    throw new Error('useLoadingContext must be used with a loadingContext');
  }
  return context;
}
