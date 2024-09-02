import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApiProvider } from './context/ApiContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { theme } from './theme';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {pathname !== '/' && <Header />}
        <ApiProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </ApiProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
