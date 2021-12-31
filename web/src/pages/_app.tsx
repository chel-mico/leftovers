import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    background: {
      default: "#FCE9D9",
      paper: '#FADEC6',
    },
    text: {
      primary: '#FC8460',
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
  },
  zIndex: {
    drawer: 0
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: "include",
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
