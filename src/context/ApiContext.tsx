import { useContext } from 'react';
import { createContext } from 'react';
import { ContentsApi } from '../api/api';

const ApiContext = createContext<any>(undefined);

const contentsApi = new ContentsApi();

export function ApiProvider({ children }: any) {
  return (
    <ApiContext.Provider value={{ contentsApi }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useContentsApi() {
  return useContext(ApiContext);
}
