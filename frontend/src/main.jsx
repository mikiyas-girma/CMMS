import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'

const theme = extendTheme({
  colors: {
    brand: {
      500: "#ff6b6b", // your primary color
    },
  },
  config: {
    initialColorMode: "light", // or "dark"
    useSystemColorMode: true,
  },
  
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
)
