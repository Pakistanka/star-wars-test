import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import { Header } from './../Header';

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
