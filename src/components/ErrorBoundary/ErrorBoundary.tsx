import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{
              color: 'error.main',
              fontWeight: 600,
              px: 2,
            }}
          >
            <Typography variant="h5">Sorry... there was an error</Typography>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
