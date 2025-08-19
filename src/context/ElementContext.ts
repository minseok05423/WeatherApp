import { useContext, createContext } from 'react';

export const elementContext = createContext<{
  selectedElementId: number | null;
  setSelectedElementId: (element: number) => void;
} | null>(null);

export function useElementContext() {
  const context = useContext(elementContext);

  if (!context) {
    throw new Error('useElementContext must be used with a elementContext');
  }
  return context;
}
