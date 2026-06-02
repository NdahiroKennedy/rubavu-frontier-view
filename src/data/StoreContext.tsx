import { createContext, useContext, useState } from 'react';
import { StoreData, loadStore, saveStore, resetStore, DEFAULT_DATA } from './store';

interface StoreContextValue {
  data: StoreData;
  setData: (data: StoreData) => void;
  resetData: () => void;
}

const StoreContext = createContext<StoreContextValue>({
  data: DEFAULT_DATA,
  setData: () => {},
  resetData: () => {},
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<StoreData>(loadStore);

  const setData = (newData: StoreData) => {
    setDataState(newData);
    saveStore(newData);
  };

  const resetData = () => {
    setDataState(DEFAULT_DATA);
    resetStore();
  };

  return (
    <StoreContext.Provider value={{ data, setData, resetData }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
