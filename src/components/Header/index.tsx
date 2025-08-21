import { FC } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export const Header: FC = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        height: 40,
        backgroundColor: '#fff',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        fontFamily: 'var(--font-star-wars)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '40px !important',
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-start" flexGrow={1}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: 'inherit',
            }}
          >
            Star Wars People's Explorer
          </Typography>
        </Box>
        <Box />
      </Toolbar>
    </AppBar>
  );
};
