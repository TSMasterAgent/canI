import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

describe('App', () => {
  it('renders the dashboard title', () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
    expect(screen.getByText(/canI Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Project/i)).toBeInTheDocument();
  });
});
