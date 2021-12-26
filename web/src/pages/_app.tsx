import { createTheme, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/styles'
import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    background: {
      default: "#FAE7C6",
      paper: '#FFD68B',
    },
    text: {
      primary: '#DD2B24',
      secondary: '#80100E',
    },
    action: {
      active: '#FB7351',
    },
    primary: {
      main: "#DD2B24"
    },
    secondary: {
      main: "#DD2B24"
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
