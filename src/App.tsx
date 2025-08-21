import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Box, keyframes } from '@mui/material';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { MainLayout } from './components/Layouts/';
import { Spinner } from './shared/ui/Spinner';
import { routePath } from './routes/routePath';
import Search from './pages/Search';
import PersonItem from './pages/PersonItem';

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
`;

const generateStars = (count: number) =>
  [...Array(count)].map((_, i) => (
    <Box
      key={i}
      sx={{
        position: 'absolute',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        backgroundColor: 'white',
        borderRadius: '50%',
        opacity: Math.random() * 0.8 + 0.2,
        animation: `${twinkle} ${Math.random() * 2 + 1.5}s infinite ease-in-out`,
      }}
    />
  ));

function App() {
  return (
    <Box position="relative" sx={{ height: '100vh', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at bottom, #000 0%, #050505 100%)',
          zIndex: 0,
        }}
      >
        {generateStars(100)}
      </Box>

      <Box zIndex={1} position="relative" height="100%">
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path={routePath.search} element={<MainLayout />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<Spinner />}>
                      <Search />
                    </Suspense>
                  }
                />
                <Route path="*" element={<Navigate to={routePath.search} />} />
              </Route>
              <Route path={routePath.person} element={<MainLayout />}>
                <Route
                  path=":name"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <PersonItem />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

export default App;
