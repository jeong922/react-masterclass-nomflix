import { useContext } from 'react';
import { createContext } from 'react';
import { ContentsApi } from '../api/api';

export const ApiContext = createContext<any>(null);

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
