import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    background: {
      default: "#FCE9D9",
      paper: '#FADEC6',
    },
    text: {
      primary: '#FFB48C',
      secondary: '#FC8460',
    },
    primary: {
      main: "#F46352",
      dark: "#E83835"
    },
    secondary: {
      main: "#C21D28",
      dark: "#AA1924"
    },
    info: {
      main: "#FAE7C6"
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
