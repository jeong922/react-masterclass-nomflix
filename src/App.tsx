import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './Components/Header';
import { theme } from './theme';

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ThemeProvider theme={theme}>
        {pathname !== '/' && <Header />}
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
