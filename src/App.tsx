import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './Components/Header';
import { ApiProvider } from './context/ApiContext';
import { theme } from './theme';

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ThemeProvider theme={theme}>
        {pathname !== '/' && <Header />}
        <ApiProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </ApiProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
