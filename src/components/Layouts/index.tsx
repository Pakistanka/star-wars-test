import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, keyframes } from '@mui/material';

import { Header } from './../Header';

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

export const MainLayout: FC = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" position="relative" overflow="hidden">
      <CssBaseline />

      <Box component="header">
        <Header />
      </Box>

      <Box component="main" flexGrow={1} overflow="auto">
        <Outlet />
      </Box>
    </Box>
  );
};
