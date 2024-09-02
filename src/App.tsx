import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import { ApiProvider } from './context/ApiContext';
import { theme } from './theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';

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
