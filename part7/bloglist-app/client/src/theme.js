import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3F4E4F',
    },
    secondary: {
      main: '#A27B5C',
    },
    text: {
      primary: '#2C3639',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: 'Inter',
  },
})
