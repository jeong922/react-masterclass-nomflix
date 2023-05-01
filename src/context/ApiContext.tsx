import { useContext } from 'react';
import { createContext } from 'react';
import { ContentsApi } from '../api/api';

// 타입을 잘 모르겠음..
const ApiContext = createContext<any>(null);

const contentsApi = new ContentsApi();

export function ApiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApiContext.Provider value={{ contentsApi }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useContentsApi() {
  return useContext(ApiContext);
}
