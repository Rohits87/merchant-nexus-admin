'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from "react";

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0d6efd',
    },
    secondary: {
      main: '#6c757d',
    },
    success: {
      main: '#198754',
    },
    error: {
      main: '#dc3545',
    },
    warning: {
      main: '#ffc107',
    },
    info: {
      main: '#0dcaf0',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.375rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.375rem',
          },
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Import Bootstrap JS only on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}