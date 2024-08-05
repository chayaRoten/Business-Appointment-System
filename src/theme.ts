import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl', // For right-to-left languages like Hebrew
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default theme;
